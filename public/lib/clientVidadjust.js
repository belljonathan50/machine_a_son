
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
            console.log ("client first receive", data);
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
        // case 'READY':               // sent by the conductor on startup
        //     console.log ("client receive", data);
        //     wsSend('PART ' + gInstr);
        //     break;
        // case 'GOTO':
        //     console.log ("client receive", data);
        //     setTimeout( function(){ setdate(parts[1]); }, getDelay(parts[2]));
        //     break;
        case 'GOTOF':
            console.log ("client receive", data);
            setdate(parts[1]);
            // setTimeout( function(){ setdate(parts[1]); }, getDelay(parts[2]));
            break;
        case 'TEMPO':
            console.log ("client receive", data);
            setTimeout( function(){ tempo(parts[1]); }, getDelay(parts[2]));
            break;
        // case 'INSCORE':
        //     let script = atob (parts[1]);
        //     console.log ("client receive", data, script);
        //     inscore.loadInscore (script, false);
        //     break;
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
    switch (event) {
        case 'PLAY': 
            console.log ("client receive really", event);
            vid.play();
            
            break;
        case 'PAUSE': 
            console.log ("client receive", event);
            vid.pause();
            break;
        case 'STOP': 
            console.log ("client receive", event);
            vid.pause();
            vid.currentTime=0;
            break;
        case 'READY':               // sent by the conductor on startup
            console.log ("client receive", event);
            wsSend('PART ' + gInstr);
            break;
        case 'GOTO':
            console.log ("client receive", event);
            setTimeout( function(){ setdate(parts[1]); }, getDelay(parts[2]));
            break;
        case 'GOTOF':
            console.log ("client receive", event);
            setdate(parts[1]);
            // setTimeout( function(){ setdate(parts[1]); }, getDelay(parts[2]));
            break;
        case 'TEMPO':
            console.log ("client receive", event);
            setTimeout( function(){ tempo(parts[1]); }, getDelay(parts[2]));
            break;
        // case 'INSCORE':
        //     let script = atob (parts[1]);
        //     console.log ("client receive", data, script);
        //     inscore.loadInscore (script, false);
        //     break;
        default:
            // isend (parts[0]);
            console.log("default")
            break;
        }
}

function setdate (date) {



        let delay = vid.currentTime/4 - date;
        console.log("la difififififiifif " + delay)

        if(Math.abs(delay)> 4)
           {console.log(" - - - - - - - - -grande diff - - - - - - -  "+ delay);
           vid.currentTime= date*4;    
           }

        else if ( Math.abs(delay)>= 2   && Math.abs(delay)<4   )
        {
          console.log(" - - - - - - - - -medium diff - - - - - - -  "+ delay);

          if(delay>0) {vid.playbackRate = 0.6*vid.playbackRate;
                        console.log("slow down")
                       }
          else if (delay<0) {vid.playbackRate = 1.4*vid.playbackRate;
                        console.log("speed up")
                       }
        }

        else if ( Math.abs(delay)>= 0.5   && Math.abs(delay)< 2   )
        {
          console.log(" - - - - - - - - -PETITE diff - - - - - - -  "+ delay);

          if(delay>0) {vid.playbackRate = 0.8*vid.playbackRate;
                        console.log("slow down a bit")
                       }
          else if (delay<0) {vid.playbackRate = 1.2*vid.playbackRate;
                        console.log("speed up a bit")
                       }
        }

        else if ( Math.abs(delay)>= 0.15   && Math.abs(delay)< 0.5   )
        {
          console.log(" - - - - - - - - -PETITE diff - - - - - - -  "+ delay);

          if(delay>0) {vid.playbackRate = 0.9*vid.playbackRate;
                        console.log("slow down JUST A TINY a bit")
                       }
          else if (delay<0) {vid.playbackRate = 1.1*vid.playbackRate;
                        console.log("speed up JUST A TINY  bit")
                       }
        }

        else if ( Math.abs(delay)>= 0.05   && Math.abs(delay)< 0.15   )
        {
          console.log(" - - - - - - - - -MINI diff - - - - - - -  "+ delay);

          if(delay>0) {vid.playbackRate = 0.95;
            console.log("slow down JUST A TINYTINYTINYTINY a bit")
                       }
          else if (delay<0) {vid.playbackRate = 1.05;
                        console.log("speed up JUST A TINYTINYTINYTINY  bit")
                       }
        }


        else if ( Math.abs(delay)>= 0   && Math.abs(delay) < 0.05   )
        {
          console.log(" - - - - - - - - -on time - - - - - - -  "+ delay);

        }
 

                         }

function tempo (val) {
    let rate = val / 60;
    if (rate > 4) {
        console.log ("tempo: rate error:", rate);
        return;
    }
    let t = val / 1;
    vid.playbackRate = rate;
    console.log(rate);
    // inscore.postMessageStrF ("/ITL/scene/tempo", "tempo", t);
    // inscore.postMessageStrF ("/ITL/scene/tempo", "angle", rate);

    if (gPlaying)
        vid.play()
}

var gPlaying = 0;
function play (val) { gPlaying = val; }

function ready(div, part) {
    div.remove();
    wsSend('PART ' + part);
}
