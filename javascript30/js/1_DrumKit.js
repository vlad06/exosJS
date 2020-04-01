document.getElementsByTagName("body")[0].addEventListener("keydown", playMusic);
document.getElementsByTagName("body")[0].addEventListener("keyup", removeClass);

function playMusic(event) {
    var audio = new Audio();
    switch(event.key) {
        case "q" :
            audio.src = "sound/clap.wav";
            break;
        case "s" :
            audio.src = "sound/hihat.wav";
            break;
        case "d" :
            audio.src = "sound/kick.wav";
            break;
        case "f" :
            audio.src = "sound/openhat.wav";
            break;
        case "g" :
            audio.src = "sound/boom.wav";
            break;
        case "h" :
            audio.src = "sound/ride.wav";
            break;
        case "j" :
            audio.src = "sound/snare.wav";
            break;
        case "k" :
            audio.src = "sound/tom.wav";
            break;
        case "l" :
            audio.src = "sound/tink.wav";
            break;
    }
    if(audio.src) {
        var keyList = document.querySelectorAll(".key");
        for(var i = 0; i < keyList.length; i++) {
            if(keyList[i].getAttribute("data-key") == event.key) {
                keyList[i].classList.add("playing");
            }
        }
        audio.currentTime = 0; // rewind to the start
        audio.play();
    }
}

function removeClass(event) {
    var keyList = event.target.firstElementChild.getElementsByTagName("div");
    for(var i = 0; i < keyList.length; i++) {
        if(keyList[i].getAttribute("data-key") == event.key) {
            keyList[i].classList.remove("playing");
        }
    }
}