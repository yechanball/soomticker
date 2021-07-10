window.onload = function() {
    document.all.mainTutorial1.style.visibility="visible";
    document.all.loadingioBackground.style.visibility="hidden";
    console.log('Complete page load!');
};

// 튜토리얼
var tryNum = 0;

function mainTutorial1Del(){
    document.all.mainTutorial1.style.visibility="hidden";
    document.all.mainTutorial2.style.visibility="visible";
}
function mainTutorial2Del(){
    document.all.mainTutorial2.style.visibility="hidden";
    document.all.mainTutorial3.style.visibility="visible";
}
function mainTutorial3Del(){
    document.all.mainTutorial3.style.visibility="hidden";
    document.all.mainTutorial4.style.visibility="visible";
}
function mainTutorial4Del(){
    document.all.mainTutorial4.style.visibility="hidden";
}

function recordTutorial1Del(){
    document.all.recordTutorial1.style.visibility="hidden";
    document.all.recordTutorial2.style.visibility="visible";
}
function recordTutorial2Del(){
    document.all.recordTutorial2.style.visibility="hidden";
    document.all.recordTutorial3.style.visibility="visible";
}
function recordTutorial3Del(){
    document.all.recordTutorial3.style.visibility="hidden";
    document.all.recordTutorial4.style.visibility="visible";
}
function recordTutorial4Del(){
    document.all.recordTutorial4.style.visibility="hidden";
}

// 팝업 & 애니메이션
const popUpFileElement = document.querySelector('.popUpFile');
const popUpUploadElement = document.querySelector('.popUpUpload');
const popUpDeleteElement = document.querySelector('.popUpDelete');
const popDownElement = document.querySelector('.popDown');

function showFilebox(){
    popUpFileElement.classList.add('animate__animated', 'animate__zoomIn');
    document.all.backGround.style.visibility="visible";
    document.all.filebox.style.visibility="visible";
}
function closeFilebox(){
    popUpFileElement.classList.remove('animate__animated', 'animate__zoomIn');
    document.all.backGround.style.visibility="hidden";
    document.all.filebox.style.visibility="hidden";
}
function openUploadCheckPop(){
    popUpUploadElement.classList.add('animate__animated', 'animate__zoomIn');
    document.all.backGround.style.visibility="visible";
    document.all.uploadCheckPop.style.visibility="visible";
}
function closeUploadCheckPop(){
    popUpUploadElement.classList.remove('animate__animated', 'animate__zoomIn');
    document.all.backGround.style.visibility="hidden";
    document.all.uploadCheckPop.style.visibility="hidden";
}
function openDeletePop(){
    popUpDeleteElement.classList.add('animate__animated', 'animate__zoomIn');
    document.all.backGround.style.visibility="visible";
    document.all.deletePop.style.visibility="visible";
}
function closeDeletePop(){
    popUpDeleteElement.classList.remove('animate__animated', 'animate__zoomIn');
    document.all.backGround.style.visibility="hidden";
    document.all.deletePop.style.visibility="hidden";
}

// 드래그 영역 생성
const swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    loop: false,
    allowSlideNext: false,
    initialSlide: 1,
});

swiper.on('progress', function(){
    if(swiper.activeIndex == 1){
        if(swiper.progress==1){
            document.all.timer.style.opacity = 1;
            document.all.dragdirection.style.opacity = "1";
        }
        else if(swiper.progress<0.4){
            //stop swiper
        }
        else{
            document.all.timer.style.opacity = 0;
            document.all.dragdirection.style.opacity = "0";
        }
        var varNum = -(swiper.progress*100);
        document.all.dragup.style.bottom = varNum+"%";
    }
});

swiper.on('slideChange', function(){
    if(swiper.activeIndex == 0){
        document.all.dragup.style.bottom = "-50%";
        document.all.timer.style.opacity = 0;
        document.all.dragwaterdrop.style.visibility = "visible";
        document.all.playbutton.style.visibility = "hidden";
        document.all.dragdirection.style.visibility = "hidden";
        document.all.dragposition.style.visibility = "hidden";

        document.all.recordfinishpop.style.visibility = "visible";
        popDownElement.classList.add('animate__animated', 'animate__fadeInDown');
    }
});

// upload file type 확인
function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}
function isAudio(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'mp3':
        case 'wav':
        case 'm4a':
        case 'aac':
        case 'ogg'://etc
        return true;
    }return false;
}

// 파일 업로드시 재생 및 입히기 기능
function tempUpload(){
    // 화면 전환
    popUpFileElement.classList.remove('animate__animated', 'animate__zoomIn');
    document.all.backGround.style.visibility="hidden";
    document.all.filebox.style.visibility="hidden";
    document.all.uploadbutton.style.visibility="hidden";
    document.all.recordbutton.style.visibility="hidden";
    document.all.waterdrop.style.visibility="hidden";
    document.all.timer.style.visibility="visible";
    document.all.playbutton.style.visibility="visible";
    document.all.deletebuttonIcon.style.visibility="visible";
    document.all.swiperDiv.style.visibility="visible";
    document.all.dragdirection.style.visibility="visible";
    document.all.dragposition.style.visibility="visible";
    if(tryNum==0){
        document.all.recordTutorial1.style.visibility="visible";
    }
    
    // 오디오 기능
    var audioFile = document.getElementById('audio_file').files[0];
    console.log(audioFile.name);

    if(isAudio(audioFile.name)){
        console.log("collect Audio File input!");
    }else{
        console.log("It is not Audio File! Page reload!");
        alert("잘못된 파일 형식입니다.");
        location.reload();
    }

    const audioURL = window.URL.createObjectURL(audioFile);            
    const audio = document.querySelector('.record-audio'); 

    audio.controls = false;
    audio.src = audioURL;
    console.log("Temporary upload done! Audio activate!");

    playbutton.onclick = function (e) {
        audio.currentTime = 0;
        audio.play();

        document.all.playbutton.style.visibility="hidden";
        document.all.swiperDiv.style.visibility="hidden";
        document.all.pausebutton.style.visibility="visible";
    }

    pausebutton.onclick = function (e) {
        audio.pause();

        document.all.playbutton.style.visibility="visible";
        document.all.swiperDiv.style.visibility="visible";
        document.all.pausebutton.style.visibility="hidden";
    }

    audio.addEventListener('loadedmetadata', function(e){
        audio.currentTime = 24*60*60;
    });

    audio.addEventListener('canplay', function(e){
        var audioTime = audio.duration;
        min = parseInt(audioTime/60);
        sec = parseInt(audioTime%60);

        ($("#timer")).html(parseInt(min/10)+""+parseInt(min%10)+":"+parseInt(sec/10)+""+parseInt(sec%10));
    });

    audio.addEventListener('timeupdate', function(e){
        var playtime = Math.floor(audio.duration-audio.currentTime);
        var playtimeSec = parseInt(playtime%60);
        var playtimeMin = parseInt(playtime/60);
    
        ($("#timer")).html(parseInt(playtimeMin/10)+""+parseInt(playtimeMin%10)+":"+parseInt(playtimeSec/10)+""+parseInt(playtimeSec%10));
    }, false);

    audio.addEventListener('ended', function() { 
        var audioTime = audio.duration;
        min = parseInt(audioTime/60);
        sec = parseInt(audioTime%60);

        ($("#timer")).html(parseInt(min/10)+""+parseInt(min%10)+":"+parseInt(sec/10)+""+parseInt(sec%10));
        document.all.playbutton.style.visibility="visible";
        document.all.pausebutton.style.visibility="hidden";
    }, false);

    finalUploadButton.onclick = function (e) {
        document.all.uploadCheckPop.style.visibility="hidden";
        document.all.uploading.style.visibility = "visible";

        /////////////////////////////////////////////
        // 서버에 업로드해야 하는 구역
        // audio.src 값이 오디오 소스값
        /////////////////////////////////////////////
        console.log("record file upload start");

        ////////////////////////////////////////////
        // 업로드 진행도는 실제 서버 작업할 때 수정하기
        var upProgress = 0;
        var UploadProgress = setInterval(function(){
            ($("#uploadProgress")).html(upProgress+"%");
            upProgress++;
        }, 17);

        setTimeout(function() {
            clearInterval(UploadProgress);
            setTimeout(function() {
                console.log("record file upload done");
                location.replace("./uploadDone.html");
            }, 100);
        }, 1700);
        //////////////////////////////////////////////
    }

    deletebutton.onclick = function (e) {
        audio.src = "none";
        tryNum++;
        ($("#timer")).html("00:00");
        
        // 삭제 팝업 애니메이션 제거
        popUpFileElement.classList.remove('animate__animated', 'animate__zoomIn');
        popUpUploadElement.classList.remove('animate__animated', 'animate__zoomIn');
        popUpDeleteElement.classList.remove('animate__animated', 'animate__zoomIn');
        popDownElement.classList.remove('animate__animated', 'animate__fadeInDown');

        document.all.playbutton.style.visibility="hidden";
        document.all.pausebutton.style.visibility="hidden";
        document.all.deletePop.style.visibility="hidden";
        document.all.backGround.style.visibility="hidden";
        document.all.deletebuttonIcon.style.visibility="hidden";
        document.all.dragdirection.style.visibility="hidden";
        document.all.dragposition.style.visibility="hidden";
        document.all.waterdrop.style.visibility="visible";
        document.all.uploadbutton.style.visibility="visible";
        document.all.recordbutton.style.visibility="visible";
        //document.all.recordpausebutton.style.visibility="hidden";
        document.all.stopbutton.style.visibility="hidden";
        document.all.timer.style.visibility="hidden";
        
        // 입히기 삭제 내용
        document.all.swiperDiv.style.visibility="hidden";
        document.all.dragup.style.bottom = "-100%";
        document.all.dragwaterdrop.style.visibility = "hidden";
        document.all.recordfinishpop.style.visibility = "hidden";
        document.all.timer.style.opacity = 1;

        swiper.activeIndex = 1;
        swiper.slideReset();

        console.log("record file deleted");
    }
}

// 녹음 기능
//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext; //audio context to help us record

var recordTimer = 0;
var recordTime;
var min = "";
var sec = "";

var recordButton = document.getElementById("recordbutton");
var stopButton = document.getElementById("stopbutton");

recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);

function startRecording() {
    console.log("recordButton clicked");

    var constraints = { audio: true, video:false };

    recordButton.disabled = true;
    stopButton.disabled = false;

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        audioContext = new AudioContext();
        gumStream = stream;
        input = audioContext.createMediaStreamSource(stream);
        rec = new Recorder(input,{numChannels:1});
        rec.record();

        recordTime = 1;
        min = "";
        sec = "";

        console.log("recorder started");
        
        document.all.waterdrop.src="./img/record_start.gif";
        document.all.uploadbutton.style.visibility="hidden";
        document.all.recordbutton.style.visibility="hidden";
        document.all.timer.style.visibility="visible";

        recordTimer = setInterval(function(){
            if(recordTime > 601) {
                alert("녹음 시간이 10분을 초과하였습니다! 녹음이 중지됩니다.");
            }
            
            min = parseInt(recordTime/60);
            sec = recordTime%60;

            ($("#timer")).html(parseInt(min/10)+""+parseInt(min%10)+":"+parseInt(sec/10)+""+parseInt(sec%10));
            recordTime++;
        }, 1000);

        setTimeout(function() {
            //document.all.recordpausebutton.style.visibility="visible";
            document.all.stopbutton.style.visibility="visible";
            document.all.waterdrop.style.visibility = "hidden";
            document.all.waterdropIng.style.visibility = "visible";
            //document.all.waterdrop.src="./img/record_ing.gif";
        }, 1310);
    }).catch(function(err) {
        console.log("enable the record button if getUserMedia() fails");
        //enable the record button if getUserMedia() fails
        recordButton.disabled = false;
        stopButton.disabled = true;
    });
}

function stopRecording() {
    stopButton.disabled = true;
    recordButton.disabled = false;

    rec.stop();
    gumStream.getAudioTracks()[0].stop();
    clearInterval(recordTimer);
    rec.exportWAV(createLink);

    console.log("recorder stopped");

    document.all.waterdropIng.style.visibility = "hidden";
    document.all.waterdrop.src="./img/record_end.gif";
    document.all.waterdrop.style.visibility = "visible";

    //document.all.recordpausebutton.style.visibility="hidden";
    //document.all.recordresumebutton.style.visibility="hidden";
    document.all.stopbutton.style.visibility="hidden";

    setTimeout(function() {
        document.all.waterdrop.style.visibility="hidden";
        document.all.waterdrop.src="./img/waterdrop_blank.png";
        document.all.playbutton.style.visibility="visible";
        document.all.deletebuttonIcon.style.visibility="visible";
        document.all.swiperDiv.style.visibility="visible";
        document.all.dragdirection.style.visibility="visible";
        document.all.dragposition.style.visibility="visible";
        if(tryNum==0){
            document.all.recordTutorial1.style.visibility="visible";
        }
    }, 1800);
}

function createLink(blob) {
    var audioURL = URL.createObjectURL(blob);
    var filename = new Date().toISOString();

    const audio = document.querySelector('.record-audio'); 

    audio.controls = false;
    audio.src = audioURL;
    console.log("recording audio can play");

    playbutton.onclick = function (e) {
        this.currentTime = 0;
        audio.play();

        document.all.playbutton.style.visibility="hidden";
        document.all.swiperDiv.style.visibility="hidden";
        document.all.pausebutton.style.visibility="visible";
    }

    pausebutton.onclick = function (e) {
        audio.pause();

        document.all.playbutton.style.visibility="visible";
        document.all.swiperDiv.style.visibility="visible";
        document.all.pausebutton.style.visibility="hidden";
    }

    audio.addEventListener('canplay', function(e){
        min = parseInt(recordTime/60);
        sec = parseInt(recordTime%60);

        ($("#timer")).html(parseInt(min/10)+""+parseInt(min%10)+":"+parseInt(sec/10)+""+parseInt(sec%10));
    });

    audio.addEventListener('timeupdate', function(e){
        var playtime = Math.floor(recordTime-audio.currentTime);
        var playtimeSec = parseInt(playtime%60);
        var playtimeMin = parseInt(playtime/60);
    
        ($("#timer")).html(parseInt(playtimeMin/10)+""+parseInt(playtimeMin%10)+":"+parseInt(playtimeSec/10)+""+parseInt(playtimeSec%10));
    }, false);

    audio.addEventListener('ended', function() { 
        min = parseInt(recordTime/60);
        sec = parseInt(recordTime%60);

        ($("#timer")).html(parseInt(min/10)+""+parseInt(min%10)+":"+parseInt(sec/10)+""+parseInt(sec%10));

        document.all.playbutton.style.visibility="visible";
        document.all.pausebutton.style.visibility="hidden";
    }, false);

    finalUploadButton.onclick = function (e) {
        document.all.uploadCheckPop.style.visibility="hidden";
        document.all.uploading.style.visibility = "visible";

        /////////////////////////////////////////////
        // 서버에 업로드해야 하는 구역
        // audio.src 값이 오디오 소스값
        /////////////////////////////////////////////
        console.log("record file upload start");

        ////////////////////////////////////////////
        // 업로드 진행도는 실제 서버 작업할 때 수정하기
        var upProgress = 0;
        var UploadProgress = setInterval(function(){
            $("#uploadProgress").html(upProgress+"%");
            upProgress++;
        }, 17);

        setTimeout(function() {
            clearInterval(UploadProgress);
            setTimeout(function() {
                console.log("record file upload done");
                location.replace("./uploadDone.html");
            }, 100);
        }, 1700);
        //////////////////////////////////////////////
    }

    deletebutton.onclick = function (e) {
        audio.src = "none";
        tryNum++;
        recordTime = 0;
        ($("#timer")).html("00:00");
        
        // 삭제 팝업 애니메이션 제거
        popUpFileElement.classList.remove('animate__animated', 'animate__zoomIn');
        popUpUploadElement.classList.remove('animate__animated', 'animate__zoomIn');
        popUpDeleteElement.classList.remove('animate__animated', 'animate__zoomIn');
        popDownElement.classList.remove('animate__animated', 'animate__fadeInDown');

        document.all.playbutton.style.visibility="hidden";
        document.all.pausebutton.style.visibility="hidden";
        document.all.deletePop.style.visibility="hidden";
        document.all.backGround.style.visibility="hidden";
        document.all.deletebuttonIcon.style.visibility="hidden";
        document.all.dragdirection.style.visibility="hidden";
        document.all.dragposition.style.visibility="hidden";
        document.all.waterdrop.style.visibility="visible";
        document.all.uploadbutton.style.visibility="visible";
        document.all.recordbutton.style.visibility="visible";
        //document.all.recordpausebutton.style.visibility="hidden";
        document.all.stopbutton.style.visibility="hidden";
        document.all.timer.style.visibility="hidden";
        
        // 입히기 삭제 내용
        document.all.swiperDiv.style.visibility="hidden";
        document.all.dragup.style.bottom = "-100%";
        document.all.dragwaterdrop.style.visibility = "hidden";
        document.all.recordfinishpop.style.visibility = "hidden";
        document.all.timer.style.opacity = 1;

        swiper.activeIndex = 1;
        swiper.slideReset();

        console.log("record file deleted");
    }
}