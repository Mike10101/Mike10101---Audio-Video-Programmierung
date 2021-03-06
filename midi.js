if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({sysex: false}).then(function (midiAccess) {
        midi = midiAccess;
        var inputs = midi.inputs.values();
        // loop through all inputs
        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            // listen for midi messages
            input.value.onmidimessage = onMIDIMessage;
        }
    });
} else {
    alert("No MIDI support in your browser.");
}

function onMIDIMessage(event) {
    //event.data is an array
   // event.data[0] = on (144) / off (128) / controlChange (176)  / pitchBend (224) / ...
   // event.data[1] = midi note
    //event.data[2] = velocity
   //console.log("Event data number " + event.data[0]);
    switch (event.data[0]) {
 
    case 144:
        // your function startNote(note, velocity)
        startNote(event.data[1], event.data[2]);
        break;
    case 128:
        // your function stopNote(note, velocity)
        stopNote(event.data[1], event.data[2]);
        break;
    case 176:
        // your function controlChange(controllerNr, value)
        // controlChange(event.data[1])
        sendValue_Max(event.data[1])
        //console.log(event.data[1]);
        //console.log(event.data[2]);
        break;
    case 177:
        sendMousePosition(event.data[1],event.data[2]); 
    case 178:
        sendValue_Min(event.data[1]);
    case 179:
        sendFaceDetection(event.data[1]);
    case 224:
        // your function pitchBend(LSB, HSB)
        
        //pitchBend(event.data[1], event.data[2]);
        break;
    }
}
