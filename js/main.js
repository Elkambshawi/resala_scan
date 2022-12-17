
// Menu Bar Icon
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

// Card "Profile" Strucutre
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


// Dark Mode Function
let modeBtn = document.querySelector(".slid");
const root_theme = document.querySelector(':root');

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

// Btn Up
let upBtn = document.querySelector(".up-btn i")

window.onscroll = function () {

    if (scrollY > 400) {
        upBtn.style.display = "block";
        scrollUpOnClick();
        
    } else if (scrollY < 400) {
        upBtn.style.display = "none";
    }

}

function scrollUpOnClick() {
    upBtn.onclick = function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
}

// Machine Type Section
let readMoreBtn = document.querySelectorAll(".machine-desc span");
console.log(readMoreBtn);
function requestJson () {
    let myRequest = new XMLHttpRequest();
    
    
    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let machineObj = JSON.parse(this.responseText);
            let machineObjLenghth = machineObj.length;
            readMoreBtn.forEach((ele, index) => {
                ele.addEventListener("click", function () {
                    
                    machineDetails (machineObj[index]["machine-description"]);
                    document.addEventListener("click", function (e) {
                        if (e.target.className == "close-btn") {
                            e.target.parentNode.remove();
                            document.querySelector(".popup-overlay").remove();    
                        };
                    })
                }) 
            })
            
        }
    }
    myRequest.open("GET","../js/machinetype.json", true);
    myRequest.send();

}

requestJson ()

function machineDetails (machineObjectDesc) {
    let overlay = document.createElement("div");
    let machineDesc = document.createElement("div");
    overlay.className = "popup-overlay";
    machineDesc.className = "machineDesc";
    machineDesc.innerHTML = `
    <p class="machineObjDesc"> ${machineObjectDesc} </p>
    `

    let closeBtn = document.createElement("span");
    let closeBtnText = document.createTextNode("X");
    closeBtn.className = "close-btn";
    closeBtn.appendChild(closeBtnText);
    machineDesc.appendChild(closeBtn);
    overlay.appendChild(machineDesc);
    document.querySelector("body").appendChild(overlay);
}

// About Us Popup Box
let aboutUs = document.querySelector(".about");
let aboutUsSection = document.querySelector(".about-us");
let closeBtn = document.querySelector(".close-window");
let popupBox = document.querySelector(".popupbox")
aboutUs.onclick = function () {
    aboutUsSection.style.display = "block";
    aboutUsSection.style.opacity = "1";
    popupBox.addEventListener("mouseover", function () {
        closeBtn.style.transform = "rotate(180deg)"
    })
    popupBox.addEventListener("mouseleave", function () {
        closeBtn.style.transform = "rotate(360deg)"
    })
    closeBtn.addEventListener("click", function () {
        aboutUsSection.style.display = "none";
        aboutUsSection.style.opacity = "1";
    })
}



// Slider Section
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


// Book Inquire
let submitBtn = document.querySelector(".send");
submitBtn.onclick = function (e) {
    e.preventDefault();
    let usernameInput = document.getElementById("username-input");
    let subjectInput = document.getElementById("subject-input");
    let phoneInput = document.getElementById("phone-input");
    let emailInput = document.getElementById("email-input");
    let textarea = document.getElementById("textarea");
    let brunch = document.getElementById("brunch");
    let inquireType = document.getElementById("type");
    let body = `
    <br />
    الاسم: ${usernameInput.value}
    <br />
    عنوان الموضوع : ${subjectInput.value}
    <br />
    رقم التليفون : ${phoneInput.value}
    <br />
    الإيميل : ${emailInput.value}
    <br />
    الفرع: ${selectOption(brunch)}
    <br />
    نوع الرسالة : ${selectOption(inquireType)}
    <br />
    محتوى الرسالة : ${textarea.value}
    <br />
    `
    if (usernameInput.value === "" || subjectInput.value === "" || phoneInput.value === "" || textarea.value === "") {
        Swal.fire({
            icon: 'error',
            title: 'خطأ...',
            text: 'خطأ، يرجى التأكد من ملئ البيانات!',
        });
        } else {
            Email.send({
                SecureToken : "99c047cf-18e0-46fa-aa20-597539c10318",
                To : 'elnegmabdo@gmail.com',
                From : "elnegmabdo@gmail.com",
                Subject : "Message From Resala Website",
                Body : body
            }).then(
                Swal.fire({
                    position: 'center-center',
                    icon: 'success',
                    title: 'تم إرسال الرسالة بنجاح',
                    showConfirmButton: false,
                    timer: 1500
                })
            );
            usernameInput.value = '';
            subjectInput.value = '';
            phoneInput.value = '';
            emailInput.value = '';
            textarea.value = '';
        }
    
}


function selectOption(select) {
    let selectLenghth = select.length;
    let selected = Array.from(select).filter(ele => ele.selected === true);
    // for (let i = 0; i < selectLenghth; i++) {
    //     if (select[i].selected === true) {
    //         selected = select[i].textContent;
    //         console.log(selected);
    //     }
    // }
    return selected[0].textContent;
}
