window.onload = function() {
    document.all.loadingioBackground.style.visibility="hidden";
    console.log('Complete page load!');
};

const swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: false,

    pagination: {
        el: '.swiper-pagination',
        clickable: 'true',
    },

    navigation: {
        nextEl: '.swiper-button-next',
    },
});

function nextSlide(){
    swiper.slideNext();
}

swiper.on('slideChange', function(){
    if(swiper.activeIndex == 3){
        document.all.nextbutton.style.visibility="hidden";
        document.all.nextbutton2.style.visibility="visible";
    }
    else{
        document.all.nextbutton.style.visibility="visible";
        document.all.nextbutton2.style.visibility="hidden";
    }
});