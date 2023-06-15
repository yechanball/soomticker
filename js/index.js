window.onload = function() {
    setTimeout(function() {
        const element = document.querySelector('.animation-element');
        document.all.logoArea.style.visibility="visible";
        element.classList.add('animate__animated', 'animate__fadeIn', 'animate__slow');

        element.addEventListener('animationend', () => {
            //////////////////////////////////////////
            // 쿼리 확인해서 재생 or 튜토리얼로 전환
            /*
            if(쿼리 == true){
                location.replace("./play.html");
            }else if(쿼리 == false){
                location.replace("./tutorial.html");
            }else{
                // 잘못된 접근
                location.replace("./contact.html");
            }
            */
            /////////////////////////////////////////
            location.replace("./tutorial.html");
        });
    }, 1000);
};