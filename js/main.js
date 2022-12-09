let expandBtn = document.querySelectorAll("#expand-button");
let profileCard = document.querySelectorAll(".profile-card");

expandBtn.forEach((ele, indexEle) => {
    ele.addEventListener("click", function () {
        profileCard.forEach((card, indexCard) => {
            if (card.classList.contains("expand")) {
                card.classList.remove("expand");
            } else if (indexEle === indexCard) {
                card.classList.toggle("expand");
            }
        })
    })
})


let menuBarBtn = document.querySelector(".menu-bar-icon");
let listMenu = document.querySelector(".menu-list");
let linkListMenu = document.querySelectorAll(".menu-list a")

menuBarBtn.onclick = function () {
    listMenu.classList.toggle("block");
}

linkListMenu.forEach((link) => {
    link.addEventListener("click", function () {
        listMenu.classList.remove("block")
    });
})


let modeBtn = document.querySelector(".slid");
const root_theme = document.querySelector(':root');

console.log(root_theme);
/* 
    --background-image-light: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
    --background-image-dark: linear-gradient(to right top, #03071e, #2f1442, #6e004e, #ab003b, #d00000);
    --main-color:#d00000;
    --title-color: #1d3557;
    --main-transition: .3s;
    --main-padding-section: 150px 0;
    --section-backgronund: #f8edeb;
    --white-color: #fff;
    --alternative-background: #e1e1e1;
*/
modeBtn.onclick = function () {
    this.classList.toggle("light");
    if (this.classList.contains("light") === true) {
        root_theme.style.setProperty('--background-image-light', 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)'); 
        root_theme.style.setProperty('--main-color', '#d00000'); 
        root_theme.style.setProperty('--title-color', '#1d3557'); 
        root_theme.style.setProperty('--section-backgronund', '#f8edeb'); 
        root_theme.style.setProperty('--white-color', '#fff'); 
        root_theme.style.setProperty('--alternative-background', '#e1e1e1'); 
    } else {
        root_theme.style.setProperty('--background-image-light', 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)'); 
        root_theme.style.setProperty('--main-color', '#ffb703'); 
        root_theme.style.setProperty('--title-color', '#fff'); 
        root_theme.style.setProperty('--section-backgronund', '#2b2d42'); 
        root_theme.style.setProperty('--white-color', '#000'); 
        root_theme.style.setProperty('--alternative-background', '#03071e'); 
    }
}


























document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const sliderItem = document.querySelectorAll(".slider-item");
    const sliderControl = document.querySelector(".slider-control");
    const sliderControlNext = document.querySelector(".slider-control-next");
    const sliderControlPrev = document.querySelector(".slider-control-prev");
    const pagination = document.querySelector(".pagination");
    const sliderWidth = slider.clientWidth;
    sliderControl.style.width = `${sliderWidth - 50}px`;
    let sliderActiveItem = 0;
    const deleteActivationOfSlider = () => {
        const itemArray = Array.from(slider.children);
        itemArray.forEach((element) => {
            element.classList.remove("slider-item-active");
        });
    }
    const setActivationOfSlider = () => {
        sliderItem[sliderActiveItem].classList.add("slider-item-active");
    }
    sliderControlPrev.addEventListener("click", () => {
        deleteActivationOfSlider();
        if (sliderActiveItem > 0) {
            sliderActiveItem--
        } else {
            sliderActiveItem = (sliderItem.length - 1)
        }
        setActivationOfSlider();
        paginationProgress();
    })
    sliderControlNext.addEventListener("click", () => {
        deleteActivationOfSlider();
        if (sliderActiveItem < (sliderItem.length - 1)) {
            sliderActiveItem++
        } else {
            sliderActiveItem = 0;
        }
        setActivationOfSlider();
        paginationProgress();
    })
    const setSliderControlItem = () => {
        const sliderItems = Array.from(sliderControl.children);
        sliderItems.forEach((element) => {
            element.classList.add("slider-control__arrow");
        });
    }
    const progressBar = `<div class="pagination-bar" background="" width=""></div>`;
    pagination.insertAdjacentHTML('beforeend', progressBar);
    const paginationProgress = () => {
        let progressItemPercent = 100 / sliderItem.length;
        const totalProgressPercent = progressItemPercent * (sliderActiveItem + 1);
        const getProgressBar = document.querySelector(".pagination-bar");
        getProgressBar.style.width = `${totalProgressPercent}%`;
    }
    setSliderControlItem();
    paginationProgress();
    setActivationOfSlider();
}, false);