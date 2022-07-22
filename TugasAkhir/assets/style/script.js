// Membuat Navigation Bar menjadi responsif
function showMenu(x){
    x.classList.toggle("klik");

    var menu = document.getElementById("navigation-menu");
    if(menu.className === "navigation-list"){
        menu.className += " responsif";
    } else {
        menu.className = "navigation-list";
    }
}

// Membuat menu navigation bar di highlight ketika di klik
const menu = document.querySelector(".menu");
menu.addEventListener("click", function(menu){
    const targetMenu = menu.target;

    if(targetMenu.classList.contains('link')){
        const menuLinkActive = document.querySelector("nav .menu a.active");
        if(menuLinkActive !== null && targetMenu.getAttribute('href') !== menuLinkActive.getAttribute('href')) {
            menuLinkActive.classList.remove('active');
        }
        targetMenu.classList.add('active');
    }
})

// Membuat scolling animation untuk setiap elemen
const scrollElements = document.querySelectorAll(".animasi");
var throttleTimer = false;

const throttle = (callback, time) => {
    if (throttleTimer) {
        return;
    }
    else{
        throttleTimer = true;
        setTimeout(() => {
            callback();
            throttleTimer = false;
        }, time);
    }
}

const elementInView = (element, dividend) => {
    const elementTop = element.getBoundingClientRect().top;
    return (
        elementTop <= document.documentElement.clientHeight / dividend
    );
};

const elementOutofView = (element) => {
    const elementTop = element.getBoundingClientRect().top;
    return (
        elementTop > document.documentElement.clientHeight
    );
};

const displayScrollElement = (element) => {
    element.classList.add("gulir");
};

const hideScrollElement = (element) => {
    element.classList.remove("gulir");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else if (elementOutofView(el)) {
            hideScrollElement(el);
        }
    })
}

window.addEventListener("scroll", () => { 
    throttle(() => {
        handleScrollAnimation();
    }, 250);
});