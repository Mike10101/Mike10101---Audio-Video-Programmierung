
//Alle Prtcussion Samples
let clap = new Audio('samples/clap04.wav');
let hihat = new Audio('samples/hihat_closed05.wav');
let kick = new Audio('samples/kick2.wav');
let snap = new Audio('samples/snaph01.wav');
let snare = new Audio('samples/snare_muffled01.wav');
let tom = new Audio('samples/tom03.wav');
let synth = new Audio('samples/synth.wav');
let shaker = new Audio("samples/shaker.wav");
let rim = new Audio("samples/rim.wav");


//Counter für das klicken
let countClap = 0;
let countHihat = 0;
let countKick = 0;
let countSnap = 0;
let countSnare = 0;
let countTom = 0;
let countSynth = 0;
let countShaker = 0;
let countRim = 0;
// die Bool Variablen für die Schlagzeug loops
let percussion1 = false;
let percussion2 = false;
let percussion3 = false;
let percussion4 = false;
let percussion5 = false;
let percussion6 = false;
let percussion7 = false;
let percussion8 = false;
let percussion9 = false;

// Zeit Noten an Bpm 119 angepasst
let sechzehntel = 126;
let achtel = 252;
let viertel = 504;

//Ausführen von Percussion bei Mausclick in Videofeldern
function sendMousePosition(position,ctr){
    ctr = ctr;
    if(position ==0) {
        if (percussion1){
            percussion1 = false;       
            silenceClap();
            indicatorClap.innerHTML = "deactivated";
        } 
        else{
            percussion1 = true;
            clap1();
            indicatorClap.innerHTML = "activateed";
        }
    }
    else if(position==1){
        if (percussion2){
            percussion2 = false;
            silenceTom();
            indicatorTom.innerHTML ="deactivated";
    
        } 
        else{
            percussion2 = true;
            tom1();
            indicatorTom.innerHTML = "activated";
        }
        //console.log(percussion2);
    }
    else if(position==2){
        if (percussion3){
            percussion3 = false;
            silenceSnap();
            indicatorSnap.innerHTML = "deactivated";
        } 
        else{
            percussion3 = true;
            snap1();
            indicatorSnap.innerHTML = "activated";
        }
        //console.log(percussion3);
    }
    else if(position==3){
        if (percussion4){
            percussion4 = false;
            silenceSnare();
            indicatorSnare.innerHTML ="deactivated";
        } 
        else{
            percussion4 = true;
            snare1();
            indicatorSnare.innerHTML = "activated";
        }
        //console.log(percussion4);
    }
    else if(position==4){
        if (percussion5){
            percussion5 = false;
            silenceKick();
            indicatorKick.innerHTML = "deactivated";
        } 
        else{
            percussion5 = true;
            kick1();
            indicatorKick.innerHTML = "activated";
        }
       // console.log(percussion5);
    }
    else if(position==5){
        if (percussion6){
            percussion6 = false;
            silenceSynth();
            indicatorSynth.innerHTML = "deactivated";
        } 
        else{
            percussion6 = true;
            synth1();
            indicatorSynth.innerHTML = "activated";
        }
       // console.log(percussion6);
    }
    else if(position==6){
        if (percussion7){
            percussion7 = false;
            silenceHihat();
            indicatorHihat.innerHTML = "deactivated";
        } 
        else{
            percussion7 = true;
            hihat1();
            indicatorHihat.innerHTML = "activated"; 
        }
       // console.log(percussion7);
    }
    else if(position==7){
        if (percussion8){
            percussion8 = false;
            silenceShaker();
            indicatorShaker.innerHTML = "deactivated";
        } 
        else{
            percussion8 = true;
            shaker1();
            indicatorShaker.innerHTML = "activated";
        }
       // console.log(percussion8);
    }
    else if(position ==8){
        if (percussion9){
            percussion9 = false;
            silenceRim();
            indicatorRim.innerHTML = "deactivated";
        } 
        else{
            percussion9 = true;
            rim1();
            indicatorRim.innerHTML = "activated";
        }
        //console.log(percussion9); 
    }
}

  
  function clap1() {
    clap.volume = 1;
    if (countClap ==0) {
        countClap ++;
        for (bar = 0; bar<30;bar ++){
            setTimeout(function(){  clap.play() }, bar*1000 + achtel);
            setTimeout(function(){  clap.play() }, bar*1000 + viertel);
        }
    }
  }


  function silenceClap(){
        clap.volume = 0;
    }

  function hihat1(){
    hihat.volume = 1;
    if (countHihat ==0) {
        countHihat ++;
        for (bar = 0; bar<30;bar ++){
            setTimeout(function(){  hihat.play() }, bar*1000 +achtel *3);
            setTimeout(function(){  hihat.play() }, bar*1000 +1764);
        }
    }

  }
  function silenceHihat(){
    hihat.volume = 0;
}
  function kick1(){
    console.log("kick 1");
    kick.volume = 0.8;
    if (countKick ==0) {
        countKick ++;
        for (bar = 0; bar<30;bar ++){
            setTimeout(function(){  kick.play() }, bar*1000 +achtel);
            setTimeout(function(){  kick.play() }, bar*1000 +1764);
        }
    }
  }

  function silenceKick(){
    kick.volume = 0;
}

  function snap1(){  
    console.log("snap 1");
    snap.volume = 0.8; 
        if(countSnap ==0){
            countSnap++;
            for (bar = 0; bar<30;bar ++){
                setTimeout(function(){  snap.play() }, bar*1000 +0);
                setTimeout(function(){  snap.play() }, bar*1000 +achtel);
                setTimeout(function(){  snap.play() }, bar*1000 +viertel*2);
                setTimeout(function(){  snap.play() }, bar*1000 +viertel*3);
            }
        }   
}
  
function silenceSnap(){
    snap.volume = 0;
}
  function snare1(){
    snare.volume = 0.8
    if(countSnare ==0){
        countSnare ++;
        for (bar = 0; bar<30;bar ++){
            setTimeout(function(){  snare.play() }, bar*1000 +0);
            setTimeout(function(){  snare.play() }, bar*1000 +sechzehntel);
            setTimeout(function(){  snare.play() }, bar*1000 +5*sechzehntel);
        }
    }   
 }
 function silenceSnare(){
    snare.volume = 0;
}

  function tom1(){
    tom.volume = 0.8;
    if (countTom ==0) {
        countTom ++;
        for (bar = 0; bar<30;bar ++){
            setTimeout(function(){  tom.play() }, bar*1000 +sechzehntel);
            setTimeout(function(){  tom.play() }, bar*1000 +viertel+achtel);
        }
    }
  }

  function silenceTom(){
    tom.volume = 0;
}

function synth1(){
    synth.volume = 0.8;
    if (countSynth ==0) {
        countSynth ++;
        for (bar = 0; bar<30;bar ++){
            setTimeout(function(){  synth.play() }, bar*1000 +0);
            setTimeout(function(){  synth.play() }, bar*1000 +viertel *2);
        }
    }
  }

  function silenceSynth(){
    synth.volume = 0;
}
function shaker1(){
    shaker.volume = 0.8;
    if (countShaker ==0) {
        countShaker++;
        for (bar = 0; bar<30;bar ++){
            setTimeout(function(){  shaker.play() }, bar*1000 +achtel);
            setTimeout(function(){  shaker.play() }, bar*1000 +achtel *3);
            setTimeout(function(){  shaker.play() }, bar*1000 +achtel*5);
            setTimeout(function(){  shaker.play() }, bar*1000 +achtel*7);
        }
    }
  }

function silenceShaker(){
    shaker.volume = 0;
}

function rim1(){
    rim.volume = 0.8;
    if (countRim ==0) {
        countRim++;
        for (bar = 0; bar<30;bar ++){
            if(bar %2 ==0){
                 setTimeout(function(){  rim.play() }, bar*1000 +viertel*2);
            }
           
        }
    }
  }

function silenceRim(){
    rim.volume = 0;
}
