//Hauptdatei mit Audio Erzeugung

//Alle Frequenzen in tonart D dur
var allFrequencies = [
    8.6619572180,       9.1770239974,
   10.3008611535,    
11.5623257097,      12.2498573744,     
13.7500000000,          15.4338531643,
17.323914436054505, 18.354047994837977,
20.601722307054366, 
23.12465141947715,  24.499714748859326, 
27.5,                 30.86770632850775,
34.64782887210901,  36.70809598967594,
41.20344461410875,  
46.2493028389543,   48.999429497718666, 51.91308719749314,
55,                  61.7354126570155,
 69.29565774421802,  73.41619197935188,
82.4068892282175,  
92.4986056779086,   97.99885899543733,  
110,                , 123.47082531403103,
138.59131548843604, 146.8323839587038,
164.81377845643496,
184.9972113558172,  195.99771799087463, 
220,                 246.94165062806206,
277.1826309768721,  293.6647679174076,
329.6275569128699,  
369.9944227116344,  391.99543598174927, 
440,                 493.8833012561241,
  554.3652619537442,  587.3295358348151,

739.9888454232688,  783.9908719634985,  
880,                 987.7666025122483,
1108.7305239074883, 1174.6590716696303,
1318.5102276514797, 
1479.9776908465376, 1567.981743926997, 
1760,                1975.533205024496,
2217.4610478149766, 2349.31814333926,
2637.02045530296,  
2959.955381693075,  3135.9634878539946, 
3520,                3951.066410048992,
 4434.922095629953,  4698.63628667852,
5274.04091060592,  
5919.91076338615,   6271.926975707989, 
7040,                7902.132820097988,
8372.018089619156,  9397.272573357044,
 10548.081821211836, 
11839.8215267723,   12543.853951415975];

//Get html Elemente
let button = document.getElementsByClassName("button");
let indicatorClap = document.getElementById("clapIndicator");
let indicatorKick = document.getElementById("kickIndicator");
let indicatorTom = document.getElementById("tomIndicator");
let indicatorShaker = document.getElementById("shakerIndicator");
let indicatorSnap= document.getElementById("snapIndicator");
let indicatorSnare= document.getElementById("snareIndicator");
let indicatorRim = document.getElementById("rimIndicator");
let indicatorHihat = document.getElementById("hihatIndicator");
let indicatorSynth = document.getElementById("synthIndicator");

//Audios für Face Detection
let keyboard1 = new Audio("randomChords/keyboardG.wav");
let keyboard2 = new Audio("randomChords/keyboardF.wav");
let keyboard3 = new Audio("randomChords/keyboardD.wav");
let trumpet1 = new Audio("randomChords/Trumpet1.wav");
let trumpet2 = new Audio("randomChords/Trumpet3.wav");
let trumpet3 = new Audio("randomChords/Trumpet3.wav");
let flute1 = new Audio("randomChords/Flute1.wav");
let flute2 = new Audio("randomChords/Flute2.wav");
let flute3 = new Audio("randomChords/Flute3.wav");

//Audio Effekts und Oscillator
let context = new AudioContext();
let masterGain = context.createGain();
let lfo = context.createOscillator();
let lfoGain = context.createGain();
let convolver = context.createConvolver();
let filter = context.createBiquadFilter();
let distortion = context.createWaveShaper();
console.log("Length Frequenzies" + allFrequencies.length)
let oscillators = [[], [],[]];
let velocityVolumes = [[], []];
let osctypes = ["sine","sawtooth"];
for (let i = 0; i < 2; i++){
    oscillators[i][0] = context.createOscillator();
    
}
let attack = 0.1;
let release = 0.1
let octaveShifter = 30;
lfo.frequency.value = 6;
lfoGain.gain.value = 0.05;
lfo.start(context.currentTime);
lfo.connect(lfoGain);
masterGain.gain.value = 0.2;


//Listener für mausklick
for (let i = 0; i < 2; i++) {
 
    button[i].addEventListener("mousedown", function() {startNote(i + octaveShifter, 76)});
    button[i].addEventListener("mouseup", function() {stopNote(i + octaveShifter, 0)});
}



for (let i = 0; i < 76; i++) {
    for (let j = 0; j < 2; j++) {
        //erstellen der Lautstärken
        velocityVolumes[j][i] = context.createGain();
        velocityVolumes[j][i].connect(distortion);
    }
}


function startNote(note, velocity) {
    for (let i = 0; i < 2; i++) {
        
        // für die Noten Oscillatoren erstellen
        oscillators[i][note] = context.createOscillator();
        oscillators[i][note].type = osctypes[i];
        oscillators[i][note].frequency.value = allFrequencies[note];
        if (i === 1) { oscillators[i][note].detune.value = 2;}
        velocityVolumes[i][note].gain.cancelScheduledValues(0);
        velocityVolumes[i][note].gain.setValueAtTime(0, context.currentTime);
        //Verbinden der Effekt Kette
        distortion.connect(filter);
        filter.connect(convolver);
        convolver.connect(masterGain);
        lfoGain.connect(velocityVolumes[0][note].gain);
        //Lautstärke verbinden
        oscillators[i][note].connect(velocityVolumes[i][note]);
        oscillators[i][note].connect(masterGain);
        masterGain.connect(context.destination);
          oscillators[i][note].start();
        //attack
        velocityVolumes[i][note].gain.linearRampToValueAtTime(0.05 + (0.33 * (velocity/127)), context.currentTime + attack);
    }
}

function stopNote(note, velocity) {
    for (let i = 0; i < 2; i++) {
        //release
        velocityVolumes[i][note].gain.cancelScheduledValues(0);
        velocityVolumes[i][note].gain.linearRampToValueAtTime(0, context.currentTime + attack + release);
        oscillators[i][note].stop(context.currentTime + attack + release + 0.1);
    }
}

//Funktion die die Wellenform ändert
function sendValue_Max(valueMax){
    if(valueMax ==0) {
        osctypes = ["sine","sine"]
    }
    else if(valueMax==1){
        osctypes = ["sine","sawtooth"]
    }
    else if(valueMax==2){
        osctypes =[ "sine","triangle"]
    }
    else if(valueMax==3){
        osctypes = ["sine", "square"]
    }
    else if(valueMax==4){
        osctypes = ["sawtooth","triangle"]
    }
    else if(valueMax==5){
        osctypes = ["sawtooth", "square"]
    }
    else if(valueMax==6){
        osctypes = ["sawtooth","sine"]
    }
    else if(valueMax==7){
        osctypes =["triangle", "square"]
    }
    else if(valueMax ==8){
        osctypes = ["triangle","triangle"]
    }
}

//Funktion die die Filter modifiziert
function sendValue_Min(val){
    if(val == 0) {

        attack = 0.3;
        release = 0.3;
        //console.log("val 0")
        filter.detune.value = 15;
        filter.frequency.value = 10;
        lfo.frequency.value = 10;
        distortion.curve = makeDistortionCurve(20);
        loadImpulseResponse("hall");
        filter.type = 'bandpass';
        }
        
    else if(val == 1) {
            attack = 0.1;
            release = 0.5;
            filter.detune.value = 10;
            lfo.frequency.value = 0;
            distortion.curve = makeDistortionCurve(20);
            filter.type = 'lowpass';
         }
        
    else if(val == 2) {
        //console.log("val 2")
        attack = 0.3;
        release = 0.5;
        filter.detune.value = 10;
        lfo.frequency.value = 20;
        distortion.curve = makeDistortionCurve(25);
        loadImpulseResponse("cave");
        filter.type = 'highpass';
        }
        
    else if(val == 3) {
        //console.log("val 3")
        attack = 0.1;
        release = 0.5;
        filter.detune.value = 15;
        lfo.frequency.value = 0;
        distortion.curve = makeDistortionCurve(10);
        loadImpulseResponse("room");
        filter.type = 'allpass';
     }
        
    else if(val == 4) {
        //console.log("val 4")
        attack = 0.3;
        release = 0.3;
        filter.frequency.value = 10;
        filter.detune.value = 15;
        lfo.frequency.value = 0;
        distortion.curve = makeDistortionCurve(10);
        loadImpulseResponse("room");
        filter.type = 'bandpass';
    }
        
    else if(val == 5) {
        //console.log("val 5")
        attack = 0.5;
        release = 0.4;
        filter.detune.value = 15;
        lfo.frequency.value = 15;
        distortion.curve = makeDistortionCurve(10);
        loadImpulseResponse("room");
        filter.type = 'allpass';
    }
        
    else if(val == 6) {
        //console.log("val 6")
        attack = 0.5;
        release = 0.3;
        filter.detune.value = 0;
        lfo.frequency.value = 10;
        filter.frequency.value = 50;
        distortion.curve = makeDistortionCurve(5);
        loadImpulseResponse("cave");
         filter.type = 'bandpass';
        
    }
        
    else if(val == 7) {
        //console.log("val 7")
        attack = 0.1;
        release = 0.3;
        filter.detune.value = 10;
        lfo.frequency.value = 0;
        distortion.curve = makeDistortionCurve(5);
        loadImpulseResponse("garage");
        filter.type = 'lowshelf';
         }
        
     else if(val == 8) {
        //console.log("val 8")
        attack = 0.1;
        release = 0.6;
        filter.detune.value = 10;
        lfo.frequency.value = 0;
        distortion.curve = makeDistortionCurve(20);  
        loadImpulseResponse("hall");
        filter.type = 'lowshelf';   
     }
}

//Funktion die samples auslöst nachdem Face Detection erfolgt ist
function sendFaceDetection(number){
    random = Math.floor(Math.random() * 3)
    if (number ==1){
        if (random ==0){
            keyboard1.volume = 1;
             keyboard1.play();
        }
        else if(random ==1){
            keyboard2.volume = 1;
            keyboard2.play();
        }
        else if(random ==2){
            keyboard3.volume = 1; 
            keyboard3.play();
        }

    }
    if( number ==2){
        if (random ==0){
            flute1.volume = 1;
            flute1.play();
        }
        else if(random ==1){
            flute2.volume = 1;
            flute2.play();
        }
        else if(random ==2){
            flute3.volume = 1;
            flute3.play();
        }
    }
    if ( number ==3){
        if (random ==0){
            trumpet1.volume = 1;
            trumpet1.play();
        }
        else if(random ==1){
            trumpet2.volume = 1;
            trumpet2.play();
        }
        else if(random ==2){
            trumpet3.volume = 1;
            trumpet3.play();
        }
    }
}