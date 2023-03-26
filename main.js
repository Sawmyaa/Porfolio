let menu = document.querySelector('.menu-icon');

menu.onclick = () => {
    menu.classList.toggle("move");
}
//Header Background Change On Scroll
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("header-active", window.scrollY > 0);
});

//Scroll Top
let scrollTop = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
    scrollTop.classList.toggle("scroll-active", window.scrollY >= 400);
});


const carousal = document.querySelector(".carousal"),
firstImg = carousal.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, prevPageX, prevScrollLeft;
let firstImgWidth = firstImg.clientWidth + 14; //getting first img width and adding 14 margin value
let scrollWidth = carousal.scrollWidth - carousal.clientWidth; //getting max scrollable width

const showHideIcons = () => {
    //showing and hiding prev/next icon according to carousal scroll left value
    let scrollWidth = carousal.scrollWidth - carousal.clientWidth;
    arrowIcons[0].style.display = carousal.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousal.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        carousal.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    });
});

const dragStart = (e) => {
    //updating global variables value on mouse doen event
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = carousal.scrollLeft;
}

const dragging = (e) => {
    //scrolling images/carousal to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    carousal.classList.add("dragging");
    let positionDiff = e.pageX - prevPageX;
    carousal.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousal.classList.remove("dragging");
}

carousal.addEventListener("mousedown", dragStart);
carousal.addEventListener("mousemove", dragging);
carousal.addEventListener("mouseup", dragStop);

const numbers = document.querySelectorAll('.number');
const svgE1 = document.querySelectorAll('svg circle');
const counters = Array(numbers.length);
const intervals = Array(counters.length);
counters.fill(0);

numbers.forEach((numbers, index) =>{
    intervals[index] = setIntervals(() =>{
        if(counters[index] === parseInt(number.dataset.num)){
            clearInterval(counters[index]);
        }else{
            counters[index] += 1;
            number.innerHTML = counters[index] + "%";
            svgE1[index].getElementsByClassName.strokeDashoffset = Math.floor(472 - 440 * parseFloat(number.dataset.num / 100));
        }   
    }, 20);
});

//Email JS
function validate(){
    let name =  document.querySelector(".name");
    let email =  document.querySelector(".email");
    let msg =  document.querySelector(".message");
    let sendBtn =  document.querySelector(".send-btn");

    sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if(name.value == "" || email.value == "" || msg.value == ""){
            emptyerror();
        }else{
            sendmail (name.value, email.value, msg.value);
            success();
        }
    });

}
validate();

function sendmail(name,email,msg){
    emailjs.send("service_r2bizil","template_r5a259s",{
        to_name: email,
        from_name: name,
        message: msg,
        });
        emailjs.send("service_r2bizil","template_r5a259s");

}

function emptyerror() {
    swal({
        title: "Oh No....",
        text: "Fields cannot be empty!",
        icon: "error",
      });
}

function success() {
    swal({
        title: "Email sent successfully",
        text: "We try to reply in 24 hours",
        icon: "success",
      });
}




