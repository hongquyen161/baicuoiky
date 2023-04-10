const slider = document.querySelector(".slides"),
firstImg = slider.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll("#img-slider i");

let isDragStart = false, prevPageX, prevScrollLeft;

const showHideIcon = () => {
    let scrollWidth = slider.scrollWidth - slider.clientWidth;
    arrowIcons[0].style.display = slider.prevScrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = slider.prevScrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        slider.scrollLeft += icon.id == "left" ? - firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcon(), 60);
    });
});

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = slider.scrollLeft;
}

const dragging = (e) => {
    if(!isDragStart) return;
    e.preventDefault();
    slider.classList.add("dragging");
    let positionDiff = e.pageX - prevPageX;
    slider.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = () => {
    isDragStart = false;
    slider.classList.remove("dragging");

}

slider.addEventListener("mousedown", dragStart);
slider.addEventListener("mousemove", dragging);
slider.addEventListener("mouseup", dragStop);
slider.addEventListener("mouseleave", dragStop);

