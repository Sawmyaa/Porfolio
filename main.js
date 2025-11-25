// --------------------------
// MENU TOGGLE
// --------------------------
const menu = document.querySelector('.menu-icon');
menu.addEventListener('click', () => {
    menu.classList.toggle('move');
});

// --------------------------
// HEADER & SCROLL-TOP
// --------------------------
const header = document.querySelector('header');
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    header.classList.toggle('header-active', scrollY > 0);
    scrollTopBtn.classList.toggle('scroll-active', scrollY >= 400);
});

// --------------------------
// CAROUSAL / IMAGE SLIDER
// --------------------------
const carousal = document.querySelector('.carousal');
const firstImg = carousal.querySelector('img');
const arrowIcons = document.querySelectorAll('.wrapper i');

let isDragStart = false, prevPageX, prevScrollLeft;

// Get width including margin
const firstImgWidth = firstImg.clientWidth + 14; 
const scrollWidthMax = carousal.scrollWidth - carousal.clientWidth;

const showHideIcons = () => {
    const scrollLeft = carousal.scrollLeft;
    const maxScroll = carousal.scrollWidth - carousal.clientWidth;
    arrowIcons[0].style.display = scrollLeft <= 0 ? "none" : "block";
    arrowIcons[1].style.display = scrollLeft >= maxScroll ? "none" : "block";
};

arrowIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const scrollAmount = firstImg.clientWidth + 14;
        carousal.scrollLeft += icon.id === "left" ? -scrollAmount : scrollAmount;
        setTimeout(showHideIcons, 60);
    });
});

// Drag functionality (mouse + touch)
const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
    prevScrollLeft = carousal.scrollLeft;
};

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    carousal.classList.add('dragging');
    const currentX = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
    const positionDiff = currentX - prevPageX;
    carousal.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
};

const dragStop = () => {
    isDragStart = false;
    carousal.classList.remove('dragging');
};

// Mouse events
carousal.addEventListener('mousedown', dragStart);
carousal.addEventListener('mousemove', dragging);
carousal.addEventListener('mouseup', dragStop);
carousal.addEventListener('mouseleave', dragStop);

// Touch events
carousal.addEventListener('touchstart', dragStart);
carousal.addEventListener('touchmove', dragging);
carousal.addEventListener('touchend', dragStop);

// Initialize arrow icons visibility
showHideIcons();

// --------------------------
// CIRCULAR PROGRESS COUNTERS
// --------------------------
const numbers = document.querySelectorAll('.number');
const svgCircles = document.querySelectorAll('svg circle');

numbers.forEach((number, index) => {
    let counter = 0;
    const target = parseInt(number.dataset.num);
    const interval = setInterval(() => {
        if (counter >= target) {
            clearInterval(interval);
        } else {
            counter++;
            number.innerHTML = counter + "%";
            svgCircles[index].style.strokeDashoffset = Math.floor(472 - 472 * (counter / 100));
        }
    }, 20);
});

// --------------------------
// EMAILJS FORM VALIDATION
// --------------------------
function validateForm() {
    const name = document.querySelector('.name');
    const email = document.querySelector('.email');
    const msg = document.querySelector('.message');
    const sendBtn = document.querySelector('.send-btn');

    sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (name.value === "" || email.value === "" || msg.value === "") {
            emptyError();
        } else {
            sendEmail(name.value, email.value, msg.value);
            successMsg();
            // Clear fields after sending
            name.value = "";
            email.value = "";
            msg.value = "";
        }
    });
}

function sendEmail(name, email, msg) {
    emailjs.send("service_r2bizil", "template_r5a259s", {
        from_name: name,
        to_email: email,
        message: msg
    });
}

function emptyError() {
    swal({
        title: "Oh No....",
        text: "Fields cannot be empty!",
        icon: "error",
    });
}

function successMsg() {
    swal({
        title: "Email sent successfully",
        text: "We will try to reply in 24 hours",
        icon: "success",
    });
}

// Initialize email validation
validateForm();
