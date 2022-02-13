/* javascript of main.html */
/* Page loading */
window.onload = function () {
    mainTutorialElement.classList.add('animate__animated', 'animate__fadeIn', 'animate__slower');
    document.all.mainTutorial.style.visibility = "visible";
    document.all.backGround.style.visibility = "visible";
    document.all.loadingioBackground.style.visibility = "hidden";
};


/* Tutorial */
var tryNum = 0;  // Number of attempts
const mainTutorialElement = document.querySelector('#mainTutorial');
const recordTutorialElement = document.querySelector('#recordTutorial');

function openMainTutorial() {
    console.log("open main tutorial");
    mainTutorialElement.classList.replace('animate__fadeOut', 'animate__fadeIn');
    document.all.mainTutorial.style.visibility = "visible";
    document.all.backGround.style.visibility = "visible";
}
function mainTutorialDel() {
    console.log("close main tutorial");
    mainTutorialElement.classList.replace('animate__fadeIn', 'animate__fadeOut');
    setTimeout(function () {
        document.all.mainTutorial.style.visibility = "hidden";
        document.all.backGround.style.visibility = "hidden";
    }, 400);
}
function openRecordTutorial() {
    console.log("open record tutorial");
    document.all.timer.style.visibility = "hidden";
    recordTutorialElement.classList.replace('animate__fadeOut', 'animate__fadeIn');
    document.all.recordTutorial.style.visibility = "visible";
    document.all.backGround.style.visibility = "visible";
}
function recordTutorialDel() {
    console.log("close record tutorial");
    recordTutorialElement.classList.replace('animate__fadeIn', 'animate__fadeOut');
    setTimeout(function () {
        document.all.timer.style.visibility = "visible";
        document.all.recordTutorial.style.visibility = "hidden";
        document.all.backGround.style.visibility = "hidden";
    }, 400);
}

/* Popup and Animation effect */
const popUpFileElement = document.querySelector('.popUpFile');
const popUpUploadElement = document.querySelector('.popUpUpload');
const popUpDeleteElement = document.querySelector('.popUpDelete');
const popDownElement = document.querySelector('.popDown');

function showFilebox() {
    popUpFileElement.classList.add('animate__animated', 'animate__zoomIn');
    document.all.backGround.style.visibility = "visible";
    document.all.filebox.style.visibility = "visible";
}
function closeFilebox() {
    popUpFileElement.classList.replace('animate__zoomIn', 'animate__zoomOut');
    setTimeout(function () {
        popUpFileElement.classList.remove('animate__animated', 'animate__zoomOut');
        document.all.backGround.style.visibility = "hidden";
        document.all.filebox.style.visibility = "hidden";
        document.all.uploadFilebtn.style.visibility = "hidden";
        document.getElementById("tempUploadForm").reset();
    }, 200);
}
function openUploadCheckPop() {
    popUpUploadElement.classList.add('animate__animated', 'animate__zoomIn');
    document.all.backGround.style.visibility = "visible";
    document.all.uploadCheckPop.style.visibility = "visible";
}
function closeUploadCheckPop() {
    popUpUploadElement.classList.replace('animate__zoomIn', 'animate__zoomOut');
    setTimeout(function () {
        popUpUploadElement.classList.remove('animate__animated', 'animate__zoomOut');
        document.all.backGround.style.visibility = "hidden";
        document.all.uploadCheckPop.style.visibility = "hidden";
    }, 200);
}
function openDeletePop() {
    popUpDeleteElement.classList.add('animate__animated', 'animate__zoomIn');
    document.all.backGround.style.visibility = "visible";
    document.all.deletePop.style.visibility = "visible";
}
function closeDeletePop() {
    popUpDeleteElement.classList.replace('animate__zoomIn', 'animate__zoomOut');
    setTimeout(function () {
        popUpDeleteElement.classList.remove('animate__animated', 'animate__zoomOut');
        document.all.backGround.style.visibility = "hidden";
        document.all.deletePop.style.visibility = "hidden";
    }, 200);
}


/* Swiper for Drag */
const swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    loop: false,
    allowSlideNext: false,
    initialSlide: 1,
});
swiper.on('progress', function () {
    if (swiper.activeIndex == 1) {
        if (swiper.progress == 1) {
            document.all.timer.style.opacity = 1;
            document.all.dragdirection.style.opacity = "1";
        }
        else if (swiper.progress < 0.4) {
            /* stop swiping */
        }
        else {
            document.all.timer.style.opacity = 0;
            document.all.dragdirection.style.opacity = "0";
        }
        var varNum = -(swiper.progress * 100);
        document.all.dragup.style.bottom = varNum + "%";
    }
});
swiper.on('slideChange', function () {
    if (swiper.activeIndex == 0) {
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

/* Upload form function */
$(document).ready(function () {
    var fileTarget = $('.fileboxInner .upload-hidden');

    fileTarget.on('change', function () {
        if (window.FileReader) {
            var filename = $(this)[0].files[0].name;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }
        $(this).siblings('.upload-name').val(filename);
        document.all.uploadFilebtn.style.visibility = "visible";
    });
}); 

/* Check upload file type */
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


/* Manipulation of Audio */
function audioManipulation(audioURL, uploadMode, recordTime) {
    const audio = document.querySelector('.record-audio');
    const sliderContainer = document.getElementById('slider-container');
    const durationContainer = document.getElementById('duration');
    const currentTimeContainer = document.getElementById('current-time');
    const seekSlider = document.getElementById('seek-slider');
    const playbtnElement = document.querySelector('#playbutton');
    const pausebtnElement = document.querySelector('#pausebutton');
    let raf = null;

    audio.controls = false;
    audio.src = audioURL;

    // Play
    playbutton.onclick = function (e) {
        playbtnElement.classList.add('animate__animated', 'animate__pulse', 'animate__slower');

        setTimeout(function () {
            playbtnElement.classList.remove('animate__animated', 'animate__pulse', 'animate__slower');
            
            audio.play();
            requestAnimationFrame(whilePlaying);
            sliderContainer.style.visibility = "visible";

            document.all.timer.style.visibility = "hidden";
            document.all.dragdirection.style.visibility = "hidden";
            document.all.dragposition.style.visibility = "hidden";
            document.all.deletebuttonIcon.style.visibility = "hidden";
            document.all.recordhelpbutton.style.visibility = "hidden";

            document.all.playbutton.style.visibility = "hidden";
            document.all.swiperDiv.style.visibility = "hidden";
            document.all.pausebutton.style.visibility = "visible";
        }, 600);
    }

    // Pause
    pausebutton.onclick = function (e) {
        audio.pause();
        cancelAnimationFrame(raf);

        pausebtnElement.classList.add('animate__animated', 'animate__pulse', 'animate__slower');

        setTimeout(function () {
            pausebtnElement.classList.remove('animate__animated', 'animate__pulse', 'animate__slower');
            
            sliderContainer.style.visibility = "hidden";

            document.all.timer.style.visibility = "visible";
            document.all.dragdirection.style.visibility = "visible";
            document.all.dragposition.style.visibility = "visible";
            document.all.deletebuttonIcon.style.visibility = "visible";
            document.all.recordhelpbutton.style.visibility = "visible";

            document.all.playbutton.style.visibility = "visible";
            document.all.swiperDiv.style.visibility = "visible";
            document.all.pausebutton.style.visibility = "hidden";
        }, 600);
    }

    audio.addEventListener('durationchange', function (e) {
        console.log("audio duration change");

        if (uploadMode == true) {
            var audioDuration = audio.duration;
            var audioMin = parseInt(audioDuration / 60);
            var audioSec = parseInt(audioDuration % 60);

            ($("#timer")).html(parseInt(audioMin / 10) + "" + parseInt(audioMin % 10) + ":" + parseInt(audioSec / 10) + "" + parseInt(audioSec % 10));
        }
    });

    audio.addEventListener('canplay', function (e) {
        console.log("audio can play");

        var audioTime;
        if (uploadMode == true) {
            audioTime = audio.duration;
        } else {
            audioTime = recordTime;
        }
    });

    audio.addEventListener('ended', function () {
        console.log("audio ended");

        pausebtnElement.classList.add('animate__animated', 'animate__fadeOut', 'animate__slower');
        setTimeout(function () {
            pausebtnElement.classList.remove('animate__animated', 'animate__fadeOut', 'animate__slower');
            
            sliderContainer.style.visibility = "hidden";

            document.all.timer.style.visibility = "visible";
            document.all.dragdirection.style.visibility = "visible";
            document.all.dragposition.style.visibility = "visible";
            document.all.deletebuttonIcon.style.visibility = "visible";
            document.all.recordhelpbutton.style.visibility = "visible";

            document.all.playbutton.style.visibility = "visible";
            document.all.pausebutton.style.visibility = "hidden";
        }, 300); 
    }, false);

    // audio control
    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        if (minutes < 10) return `0${minutes}:${returnedSeconds}`;
        else return `${minutes}:${returnedSeconds}`;
    }

    const displayDuration = () => {
        durationContainer.textContent = calculateTime(audio.duration);
    }

    const showRangeProgress = (rangeInput) => {
        if (rangeInput === seekSlider) sliderContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
        else sliderContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
    }

    seekSlider.addEventListener('input', (e) => {
        showRangeProgress(e.target);
    });

    const setSliderMax = () => {
        seekSlider.max = Math.floor(audio.duration);
    }

    const displayBufferedAmount = () => {
        const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
        sliderContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
    }

    const whilePlaying = () => {
        seekSlider.value = Math.floor(audio.currentTime);
        currentTimeContainer.textContent = calculateTime(seekSlider.value);
        sliderContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
        raf = requestAnimationFrame(whilePlaying);
    }

    if (audio.readyState > 0) {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
    } else {
        audio.addEventListener('loadedmetadata', () => {
            displayDuration();
            setSliderMax();
            displayBufferedAmount();
        });
    }

    audio.addEventListener('progress', displayBufferedAmount);

    seekSlider.addEventListener('input', () => {
        currentTimeContainer.textContent = calculateTime(seekSlider.value);
        if (!audio.paused) {
            cancelAnimationFrame(raf);
        }
    });

    seekSlider.addEventListener('change', () => {
        audio.currentTime = seekSlider.value;
        if (!audio.paused) {
            requestAnimationFrame(whilePlaying);
        }
    });

    // Upload 
    finalUploadButton.onclick = function (e) {
        document.all.recordhelpbutton.style.visibility = "hidden";
        document.all.uploadCheckPop.style.visibility = "hidden";
        document.all.uploading.style.visibility = "visible";

        /////////////////////////////////////////////
        /* Sever side */
        /* Upload to DB */
        var upProgress = 0;
        var UploadProgress = setInterval(function () {
            ($("#uploadProgress")).html(upProgress + "%");
            upProgress++;
        }, 17);

        setTimeout(function () {
            clearInterval(UploadProgress);
            setTimeout(function () {
                console.log("upload done");
                location.replace("./uploadDone.html");
            }, 100);
        }, 1700);
        //////////////////////////////////////////////
    }

    // Delete
    deletebutton.onclick = function (e) {
        audio.src = "none";
        tryNum++;
        recordTime = 0;
        ($("#timer")).html("00:00");

        popUpFileElement.classList.remove('animate__animated', 'animate__zoomIn');
        popUpUploadElement.classList.remove('animate__animated', 'animate__zoomIn');
        popUpDeleteElement.classList.remove('animate__animated', 'animate__zoomIn');
        popDownElement.classList.remove('animate__animated', 'animate__fadeInDown');

        document.all.playbutton.style.visibility = "hidden";
        document.all.pausebutton.style.visibility = "hidden";
        document.all.deletePop.style.visibility = "hidden";
        document.all.backGround.style.visibility = "hidden";
        document.all.deletebuttonIcon.style.visibility = "hidden";
        document.all.dragdirection.style.visibility = "hidden";
        document.all.dragposition.style.visibility = "hidden";
        document.all.recordhelpbutton.style.visibility = "hidden";
        document.all.waterdrop.style.visibility = "visible";
        document.all.uploadbutton.style.visibility = "visible";
        document.all.recordbutton.style.visibility = "visible";
        document.all.mainhelpbutton.style.visibility = "visible";
        document.all.stopbutton.style.visibility = "hidden";
        document.all.timer.style.visibility = "hidden";
        document.all.swiperDiv.style.visibility = "hidden";
        document.all.dragup.style.bottom = "-100%";
        document.all.dragwaterdrop.style.visibility = "hidden";
        document.all.recordfinishpop.style.visibility = "hidden";
        document.all.timer.style.opacity = 1;

        swiper.activeIndex = 1;
        swiper.slideReset();
    }
}


/* Switching pages */
function switchingPage() {
    document.all.waterdropIng.style.visibility = "hidden";
    document.all.waterdrop.src = "./img/record_end.gif";
    document.all.waterdrop.style.visibility = "visible";
    document.all.stopbutton.style.visibility = "hidden";

    setTimeout(function () {
        document.all.waterdrop.style.visibility = "hidden";
        document.all.waterdrop.src = "./img/waterdrop_blank.png";
        document.all.recordhelpbutton.style.visibility = "visible";
        document.all.timer.style.visibility = "visible"
        document.all.deletebuttonIcon.style.visibility = "visible";
        document.all.swiperDiv.style.visibility = "visible";
        document.all.playbutton.style.visibility = "visible";
        document.all.dragdirection.style.visibility = "visible";
        document.all.dragposition.style.visibility = "visible";
        if (tryNum == 0) {
            document.all.timer.style.visibility = "hidden";
            recordTutorialElement.classList.add('animate__animated', 'animate__fadeIn', 'animate__slower');
            document.all.recordTutorial.style.visibility = "visible";
            document.all.backGround.style.visibility = "visible";
        }
    }, 1700);
}


/* File Upload */
function tempUpload() {
    popUpFileElement.classList.remove('animate__animated', 'animate__zoomIn');
    document.all.backGround.style.visibility = "hidden";
    document.all.filebox.style.visibility = "hidden";
    document.all.uploadFilebtn.style.visibility = "hidden";
    document.all.mainhelpbutton.style.visibility = "hidden";
    document.all.uploadbutton.style.visibility = "hidden";
    document.all.recordbutton.style.visibility = "hidden";

    switchingPage();

    var audioFile = document.getElementById('audio_file').files[0];

    if (isAudio(audioFile.name)) {
        console.log("collect Audio File input!");
    } else {
        console.log("It is not Audio File! Page reload!");
        alert("잘못된 파일 형식입니다.");
        location.reload();
    }

    const audioURL = window.URL.createObjectURL(audioFile);
    document.getElementById("tempUploadForm").reset();
    audioManipulation(audioURL, true, 0);
}


/* Record */
// webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;
var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext; //audio context to help us record

var recordTimer = 0;
var recordTime;

var recordButton = document.getElementById("recordbutton");
var stopButton = document.getElementById("stopbutton");

recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);

function startRecording() {
    console.log("recordButton clicked");
    document.all.mainhelpbutton.style.visibility = "hidden";
    ($("#timer")).html("00:00");

    //var constraints = { audio: true, video: false };
    var constraints = {  "audio": { "mandatory": {
                        "googEchoCancellation": "true",
                        "googAutoGainControl": "true",
                        "googNoiseSuppression": "true",
                        "googHighpassFilter": "true"}, "optional": []}};

    recordButton.disabled = true;
    stopButton.disabled = false;

    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        audioContext = new AudioContext();
        gumStream = stream;
        input = audioContext.createMediaStreamSource(stream);
        rec = new Recorder(input, { numChannels: 1 });
        rec.record();

        console.log("recorder started");
        recordTime = 1;

        document.all.waterdrop.src = "./img/record_start.gif";
        document.all.uploadbutton.style.visibility = "hidden";
        document.all.recordbutton.style.visibility = "hidden";
        document.all.timer.style.visibility = "visible";

        recordTimer = setInterval(function () {
            // When record time is over than 10 min
            if (recordTime > 600) {
                alert("녹음 시간이 10분을 초과하였습니다! 녹음이 중지됩니다.");
                recordTime = 599;
                stopRecording();
            }

            var min = parseInt(recordTime / 60);
            var sec = recordTime % 60;

            ($("#timer")).html(parseInt(min / 10) + "" + parseInt(min % 10) + ":" + parseInt(sec / 10) + "" + parseInt(sec % 10));
            recordTime++;
        }, 1000);

        setTimeout(function () {
            document.all.stopbutton.style.visibility = "visible";
            document.all.waterdrop.style.visibility = "hidden";
            document.all.waterdropIng.style.visibility = "visible";
        }, 1310);
    }).catch(function (err) {
        console.log("enable the record button if getUserMedia() fails");
        alert("ERROR! getUserMedia() fails");
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

    switchingPage();
}

function createLink(blob) {
    var audioURL = URL.createObjectURL(blob);
    audioManipulation(audioURL, false, recordTime);
}
