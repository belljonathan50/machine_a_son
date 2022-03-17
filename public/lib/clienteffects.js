
var gSlider = null;     // the video div
var gPart = null;       // the part name
var gReady = false;
var gDelay = 0;
var gInstr = null;

//var gTimeOffset = 0;
// gTime.on('change', function (offset) { gTimeOffset = offset; console.log ("Time offset:", offset)});

function connectclient (part) {
    connect();
    window.addEventListener('unload', function(event) { 
        console.log ("send bye", part)
        wsSend ('BYE ' + part); 
        gInstr = part;
        // localStorage.setItem('delay', gDelay); 
    });
    // gSlider = document.getElementById('delay');
    // gSlider.addEventListener('change', () => { console.log("delay", gDelay = gSlider.value);})
    gPart = part;
    // let delay = localStorage.getItem('delay');
    // if (delay) gSlider.value = gDelay = delay;
}

wsclient = function (data) {
    const parts = data.split(' ');
    switch (parts[0]) {
        case 'PLAY': 
            console.log ("client receive", data);
            setTimeout( function(){ isend("PLAY"); }, getDelay(parts[1]));
            break;
        case 'PAUSE': 
            console.log ("client receive", data);
            setTimeout( function(){ isend("PAUSE"); }, getDelay(parts[1]));
            break;
        case 'STOP': 
            console.log ("client receive", data);
            isend("STOP");
            break;
        case 'READY':               // sent by the conductor on startup
            console.log ("client receive", data);
            wsSend('PART ' + gInstr);
            break;
        case 'GOTO':
            console.log ("client receive", data);
            setTimeout( function(){ setdate(parts[1]); }, getDelay(parts[2]));
            break;
        case 'GOTOF':
            console.log ("client receive", data);
            setdate(parts[1]);
            // setTimeout( function(){ setdate(parts[1]); }, getDelay(parts[2]));
            break;
        case 'TEMPO':
            console.log ("client receive", data);
            setTimeout( function(){ tempo(parts[1]); }, getDelay(parts[2]));
            break;
        case 'INSCORE':
            let script = atob (parts[1]);
            console.log ("client receive", data, script);
            inscore.loadInscore (script, false);
            break;
        default:
            isend (parts[0]);
            break;
        }
}

function ready(div) {
    div.remove();
    gReady = true;
    wsSend('PART ' + gPart);
}

function getDelay(date) {
    let n = date - gTime.now() - gDelay;
// console.log("Delay to", date, "->", n );
    if (n < 0) console.log("late event detected: delay", n)
    return (n > 0) ? n : 0;
}

function isend (event) {
    inscore.postMessageStrStr ("/ITL/scene", "event", event);
}

function setdate (date) {
    let audio = document.getElementById ("scene/audio-all")
    if (!audio) audio = document.getElementById ("scene/audio-gr1-flute")
    let delay = audio.currentTime/4 - date;
    if (Math.abs(delay) < 0.17) return;
    console.log ("Adjust date: current delay is", delay)
    let msg = inscore.newMessageM("event");
    inscore.msgAddStr(msg, "GOTOF");
    inscore.msgAddF(msg, parseFloat(date));
    inscore.postMessage ("/ITL/scene", msg);
}

function tempo (val) {
    let rate = val / 60;
    if (rate > 4) {
        console.log ("tempo: rate error:", rate);
        return;
    }
    let t = val / 1;
    inscore.postMessageStrF ("/ITL/scene/tempo", "tempo", t);
    inscore.postMessageStrF ("/ITL/scene/tempo", "angle", rate);
    if (gPlaying)
        inscore.postMessageStrStr ("/ITL/scene", "event", "PLAY");
}

var gPlaying = 0;
function play (val) { gPlaying = val; }

function ready(div, part) {
    div.remove();
    wsSend('PART ' + part);
}
