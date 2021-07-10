const popUpElement = document.querySelector('.popUp');

setTimeout(function() {
    popUpElement.classList.add('animate__animated', 'animate__zoomIn');
    document.all.backGround.style.visibility="visible";
    document.all.surveyPop.style.visibility="visible";
}, 2000);

function closeSurveyPop(){
    document.all.backGround.style.visibility="hidden";
    document.all.surveyPop.style.visibility="hidden";
}

// Open Survey form 
function gotoSurveyForm(){
    window.open('https://docs.google.com/forms/d/1vI7L9oBunwgMZ7hV3-kZpViDd4l1Lx2xB8ZwsbRQMks/edit?usp=drive_web', '_blank'); 
    //location.replace("https://docs.google.com/forms/d/1vI7L9oBunwgMZ7hV3-kZpViDd4l1Lx2xB8ZwsbRQMks/edit?usp=drive_web");
}

// Close function don't work in Chrome 
function closeWeb(){
    window.open('', '_self', '');
    window.close();
    return false;
}