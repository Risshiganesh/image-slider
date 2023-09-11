import "./style.css";

import field from "./field.jpg";
import forest from "./forest.jpg";
import hills from "./hills.jpg";
import brownField from "./brown-field.jpg";
import barleyField from "./barley-field.jpg";

import chevronLeft from "./icons/chevron-left.png";
import chevronRight from "./icons/chevron-right.png";

const leftArrow = document.querySelector(".left-arrow");

const rightArrow = document.querySelector(".right-arrow");

const imageContainer = document.querySelector(".image-container");

const navDotsDiv = document.querySelector(".nav-dots-div");

const chevronLeftDiv = document.querySelector(".chevron-left");
const chevronRightDiv = document.querySelector(".chevron-right");

const chevronLeftIcon = new Image();
chevronLeftIcon.src = chevronLeft;
chevronLeftDiv.append(chevronLeftIcon);

const chevronRightIcon = new Image();
chevronRightIcon.src = chevronRight;
chevronRightDiv.append(chevronRightIcon);

// whenever there is an image you want to add, just add the src here and the creation will be automated.
const imageSrc = [field, forest, hills, brownField, barleyField];

const imageCollection = [];

const navDots = [];

imageSrc.forEach((src) => {
  const innerImgContainer = document.createElement("div");
  innerImgContainer.classList.add("inner-img-container");

  const newImg = new Image();
  newImg.src = src;

  innerImgContainer.append(newImg);

  imageCollection.push(innerImgContainer);

  const navDot = document.createElement("div");
  navDot.classList.add("nav-dots");
  navDots.push(navDot);
});

imageCollection.forEach((image) => {
  imageContainer.append(image);
});

navDots.forEach((dot) => {
  navDotsDiv.append(dot);
});

imageCollection[0].classList.add("grow-right");
navDots[0].classList.add("dot-active");

leftArrow.addEventListener("click", previousSlide);

rightArrow.addEventListener("click", nextSlide);

// shows previous slide
function nextSlide() {
  for (let index = 0; index < imageCollection.length; index++) {
    if (
      imageCollection[index].classList.contains("grow-right") ||
      imageCollection[index].classList.contains("grow-left")
    ) {
      if (!imageCollection[index + 1]) {
        clearClasses();

        imageCollection[index].classList.add("shrink-left");

        imageCollection[0].classList.add("grow-right");
        navDots[0].classList.add("dot-active");

        resetTimer();

        break;
      }
      clearClasses();

      imageCollection[index].classList.add("shrink-left");
      imageCollection[index + 1].classList.add("grow-right");
      navDots[index + 1].classList.add("dot-active");

      resetTimer();

      break;
    }
  }
}

// shows next slide
function previousSlide() {
  for (let index = 0; index < imageCollection.length; index++) {
    if (
      imageCollection[index].classList.contains("grow-right") ||
      imageCollection[index].classList.contains("grow-left")
    ) {
      if (!imageCollection[index - 1]) {
        clearClasses();

        imageCollection[index].classList.add("shrink-right");

        imageCollection[imageCollection.length - 1].classList.add("grow-left");
        navDots[navDots.length - 1].classList.add("dot-active");

        resetTimer();

        break;
      }
      clearClasses();

      imageCollection[index].classList.add("shrink-right");
      imageCollection[index - 1].classList.add("grow-left");
      navDots[index - 1].classList.add("dot-active");

      resetTimer();

      break;
    }
  }
}

function clearClasses() {
  imageCollection.forEach((element) => {
    element.classList.remove("grow-right");
    element.classList.remove("grow-left");
    element.classList.remove("shrink-left");
    element.classList.remove("shrink-right");
  });

  navDots.forEach((dot) => {
    dot.classList.remove("dot-active");
  });
}

function clickNav() {
  for (let index = 0; index < navDots.length; index++) {
    navDots[index].addEventListener("click", function () {
      for (let count = 0; count < imageCollection.length; count++) {
        if (
          imageCollection[count].classList.contains("grow-right") ||
          imageCollection[count].classList.contains("grow-left")
        ) {
          clearClasses();
          imageCollection[count].classList.add("shrink-left");
          imageCollection[index].classList.add("grow-right");
          navDots[index].classList.add("dot-active");
          console.log("ITERATION");

          resetTimer();

          break;
        }
      }
    });
  }
}

clickNav();

let timer = setInterval(nextSlide, 5000);

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(nextSlide, 5000);
}
