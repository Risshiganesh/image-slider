import "./style.css";

import field from "./field.jpg";
import forest from "./forest.jpg";
import hills from "./hills.jpg";

const leftArrow = document.querySelector(".left-arrow");

const rightArrow = document.querySelector(".right-arrow");

const imageContainer = document.querySelector(".image-container");

const testImgContainer = document.querySelector(".inner-img-container");

const imageSrc = [field, forest, hills];

const imageCollection = [];

imageSrc.forEach((src) => {
  const innerImgContainer = document.createElement("div");
  innerImgContainer.classList.add("inner-img-container");

  const newImg = new Image();
  newImg.src = src;

  innerImgContainer.append(newImg);

  imageCollection.push(innerImgContainer);
});

imageCollection.forEach((image) => {
  imageContainer.append(image);
});

imageCollection[0].classList.add("grow-right");

leftArrow.addEventListener("click", previousSlide);

rightArrow.addEventListener("click", nextSlide);

// shows previous slide
function previousSlide() {
  for (let index = 0; index < imageCollection.length; index++) {
    if (
      imageCollection[index].classList.contains("grow-right") ||
      imageCollection[index].classList.contains("grow-left")
    ) {
      if (!imageCollection[index + 1]) {
        imageCollection[index].classList.add("shrink-left");
        imageCollection[0].classList.add("grow-right");
        return;
      }
      clearClasses();

      imageCollection[index].classList.add("shrink-left");
      imageCollection[index + 1].classList.add("grow-right");

      break;
    }
  }
}

// shows next slide
function nextSlide() {
  for (let index = 0; index < imageCollection.length; index++) {
    if (
      imageCollection[index].classList.contains("grow-right") ||
      imageCollection[index].classList.contains("grow-left")
    ) {
      if (!imageCollection[index - 1]) {
        clearClasses();

        imageCollection[index].classList.add("shrink-right");
        imageCollection[imageCollection.length - 1].classList.add("grow-left");

        return;
      }
      clearClasses();

      imageCollection[index].classList.add("shrink-right");
      imageCollection[index - 1].classList.add("grow-left");

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
}

setInterval(previousSlide, 5000);
