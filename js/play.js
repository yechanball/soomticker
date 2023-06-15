window.onload = function() {
    document.all.loadingioBackground.style.visibility="hidden";
    console.log('Complete page load!');
};

// 오디오 기능
const audio = document.getElementById('record-audio'); 
var link = document.querySelector('.downloadLink');

audio.controls = false;
// 오디오 파일 소스 불러오기
//const audioURL = 서버의 오디오 파일 URL;
const audioURL = "./img/bakamitai_template.mp3"; //임시로 설정한 오디오 파일
audio.src = audioURL;
link.href = audioURL;
link.download = "SOOM_Voice.mp3";

// Play
playbutton.onclick = function (e) {
    audio.currentTime = 0;
    audio.play();

    document.all.playbutton.style.visibility="hidden";
    document.all.stopbutton.style.visibility="visible";
}

// Pause
stopbutton.onclick = function (e) {
    audio.pause();

    document.all.playbutton.style.visibility="visible";
    document.all.stopbutton.style.visibility="hidden";
}

audio.addEventListener('durationchange', function(e){
    console.log("audio duration change");
  
    var audioDuration = audio.duration;
    var audioMin = parseInt(audioDuration/60);
    var audioSec = parseInt(audioDuration%60);

    ($("#timer")).html(parseInt(audioMin/10)+""+parseInt(audioMin%10)+":"+parseInt(audioSec/10)+""+parseInt(audioSec%10));
});

audio.addEventListener('canplay', function(e){
    console.log("audio can play");

    var audioTime = audio.duration;
    var min = parseInt(audioTime/60);
    var sec = parseInt(audioTime%60);

    ($("#timer")).html(parseInt(min/10)+""+parseInt(min%10)+":"+parseInt(sec/10)+""+parseInt(sec%10));
});

audio.addEventListener('timeupdate', function(e){
    var playtime = Math.floor(audio.duration-audio.currentTime);
    var playtimeSec = parseInt(playtime%60);
    var playtimeMin = parseInt(playtime/60);

    ($("#timer")).html(parseInt(playtimeMin/10)+""+parseInt(playtimeMin%10)+":"+parseInt(playtimeSec/10)+""+parseInt(playtimeSec%10));
}, false);

audio.addEventListener('ended', function() { 
    console.log("audio ended");

    var audioTime = audio.duration;
    var min = parseInt(audioTime/60);
    var sec = parseInt(audioTime%60);

    ($("#timer")).html(parseInt(min/10)+""+parseInt(min%10)+":"+parseInt(sec/10)+""+parseInt(sec%10));
    document.all.playbutton.style.visibility="visible";
    document.all.stopbutton.style.visibility="hidden";
}, false);