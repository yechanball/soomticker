window.onload = function() {
    document.all.loadingioBackground.style.visibility="hidden";
    console.log('Complete page load!');
};

// 오디오 기능
const sliderContainer = document.getElementById('slider-container');
const audio = document.getElementById('record-audio');
const durationContainer = document.getElementById('duration');
const currentTimeContainer = document.getElementById('current-time');
const seekSlider = document.getElementById('seek-slider');
const playbtnElement = document.querySelector('#playbutton');
const stopbtnElement = document.querySelector('#stopbutton');
var link = document.querySelector('.downloadLink');
let raf = null;

audio.controls = false;
// 자연의 소리가 들어갈 부분
const audioURL = "https://yechan-nfc.github.io/homepage/src/audio/sound02.wav";
audio.src = audioURL;
link.href = audioURL;
link.download = "SOOM_Voice.mp3";

// Play
playbutton.onclick = function (e) {
    playbtnElement.classList.add('animate__animated', 'animate__pulse', 'animate__faster');

    setTimeout(function () {
        playbtnElement.classList.remove('animate__animated', 'animate__pulse', 'animate__faster');
        //audio.currentTime = 0;
        audio.play();
        requestAnimationFrame(whilePlaying);

        document.all.playbutton.style.visibility="hidden";
        document.all.stopbutton.style.visibility="visible";
    }, 500);
}

// Pause
stopbutton.onclick = function (e) {
    audio.pause();
    cancelAnimationFrame(raf);

    stopbtnElement.classList.add('animate__animated', 'animate__pulse', 'animate__faster');

    setTimeout(function () {
        stopbtnElement.classList.remove('animate__animated', 'animate__pulse', 'animate__faster');
        document.all.playbutton.style.visibility="visible";
        document.all.stopbutton.style.visibility="hidden";
    }, 500);
}

audio.addEventListener('durationchange', function(e){
    console.log("audio duration change");
});

audio.addEventListener('canplay', function(e){
    console.log("audio can play");
});

audio.addEventListener('ended', function() { 
    console.log("audio ended");
    
    stopbtnElement.classList.add('animate__animated', 'animate__fadeOut', 'animate__faster');
    setTimeout(function () {
        stopbtnElement.classList.remove('animate__animated', 'animate__fadeOut', 'animate__faster');
        document.all.playbutton.style.visibility="visible";
        document.all.stopbutton.style.visibility="hidden";
    }, 300);
}, false);

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    
    if(minutes<10) return `0${minutes}:${returnedSeconds}`;
    else return `${minutes}:${returnedSeconds}`;
}

const displayDuration = () => {
    durationContainer.textContent = calculateTime(audio.duration);
}

const showRangeProgress = (rangeInput) => {
    if(rangeInput === seekSlider) sliderContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
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
    if(!audio.paused) {
        cancelAnimationFrame(raf);
    }
});

seekSlider.addEventListener('change', () => {
    audio.currentTime = seekSlider.value;
    if(!audio.paused) {
        requestAnimationFrame(whilePlaying);
    }
});