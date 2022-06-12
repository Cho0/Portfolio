const slides = Array.from(document.querySelectorAll('.slide'));
const slider = document.querySelector('.slider');
const buttons = document.querySelectorAll('.buttons div');
const dotEl = document.querySelector('.dots');
const caseStudy = document.querySelector('.case-study-button');
let timeoutID


// --- Slider --- //
function getNextPrev() {
  const activeSlide = document.querySelector('.slide.active');
  const activeIndex = slides.indexOf(activeSlide);
  let next, prev;
  if (activeIndex === slides.length - 1) {
    next = slides[0]
  } else {
    next = slides[activeIndex + 1];
  }

  if (activeIndex === 0) {
    prev = slides[slides.length - 1]
  } else {
    prev = slides[activeIndex - 1];
  }
  return [next, prev]
}

function getPosition() {
  const activeSlide = document.querySelector('.slide.active');
  const activeIndex = slides.indexOf(activeSlide);
  const [next, prev] = getNextPrev();

  slides.forEach((slide, index) => {
    if (index === activeIndex) {
      slide.style.transform = 'translateX(0)';
    } else if (slide === prev) {
      slide.style.transform = 'translateX(-100%)';
    } else if (slide === next) {
      slide.style.transform = 'translateX(100%)';
    } else {
      slide.style.transform = 'translate(100%)';
    }

    slide.addEventListener('transitionend', () => {
      slide.classList.remove('top');
    })
  })
}
getPosition();

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('next')) getNextSlide()
    else if (button.classList.contains('prev')) getPrevSilde();
  })
})

function getNextSlide() {
  clearTimeout(timeoutID);
  const current = document.querySelector('.slide.active');
  const [next, prev] = getNextPrev();

  if (current.classList.contains('top')) {
    return;
  }
  current.classList.add('top');
  next.classList.add('top');
  current.classList.remove('active');
  current.style.transform = 'translate(-100%)';
  next.classList.add('active');
  next.style.transform = 'translate(0)';
  getPosition();
  getActiveDot();
  // autoLoop();
}

function getPrevSilde() {
  clearTimeout(timeoutID);
  const current = document.querySelector('.slide.active');
  const [next, prev] = getNextPrev();

  if (current.classList.contains('top')) {
    return;
  }
  current.classList.add('top');
  prev.classList.add('top');
  current.classList.remove('active');
  current.style.transform = 'translateX(-100%)';
  prev.classList.add('active');
  prev.style.transform = 'translateX(0)'
  getPosition();
  getActiveDot();
  // autoLoop();
}

// --- dots --- //

slides.forEach((slide) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dotEl.appendChild(dot);
});

function getActiveDot() {
  const allDots = document.querySelectorAll('.dots .dot');
  const activeSlide = document.querySelector('.slide.active');
  const activeIndex = slides.indexOf(activeSlide);

  allDots.forEach(dot => {
    dot.classList.remove('active')
  })

  allDots[activeIndex].classList.add('active');
}

function clickDot() {
  const allDots = document.querySelectorAll('.dots .dot');
  allDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      getDotSlide(index);
    })
  })
}

function getDotSlide(index) {
  clearTimeout(timeoutID);
  slides.forEach(slide => {
    slide.classList.remove('active');
  });
  slides[index].classList.add('active');
  getPosition();
  getActiveDot();
  // autoLoop();
}

function autoLoop() {
  timeoutID = setTimeout(() => {
    getNextSlide();
  }, 5000)
}

getActiveDot();
clickDot();
// autoLoop();

// -- reveal about me -- //

// function showHideAbout() {
//   var showHide = document.getElementById("about-me");
//   if (showHide.style.display === "none") {
//     showHide.style.display = "block";
//   } else {
//     showHide.style.display = "none";
//   }
// }

const text1Options = [
  "About me:",
  "Semi-Pro Career:",
  "Hobbies:",
  "Current Projects:"
];

const text2Options = [
  "Technology has always been at the forefront of my life. I have loved learning about computers and building them ever since I was young. I have always wanted to do something in the tech field from a young age. However, I grew up an artist because my family loves art. Due to my background in art, I found that I communicate well with other artists. I have developed my skills as a full-stack web developer, and I am excited to continue growing and deepening my understanding of code.",
  "Before starting my coding journey, I was an Overwatch Semi-Pro, playing and winning against some of the best players worldwide. My personal rank was in the top 500 in the North American region, and I would play in high-level tournaments with my team. While I am retired now, I still work as a coach for my team and lower-ranked players.",
  "I enjoy gaming, sports like tennis, and eating food with too many calories. Coding and painting too, of course.",
  "I am creating an app that allows users to input a budget and the app will give you a travel plan. The plan will include plane tickets, Airbnb costs, food costs (option to turn off), and tourist attractions. The idea is to give people an easier time figuring out their options for where they could go."
];

const colorOptions = ["#EBB9D2", "#FE9968", "#7FE0EB", "#6CE5B1"];

const imageOptions = [
  "https://i.postimg.cc/3wnYycYg/1V3A4518.jpg",
  "https://i.postimg.cc/Hk0pmLNv/F7897-CC7-56-C5-4-B4-C-9-FE1-CA981-CD22650.jpg",
  "https://i.postimg.cc/tTJyFN48/1V3A4540.jpg",
  "https://i.postimg.cc/NMCsnPng/1-BBA1630-1954-47-C1-AEDF-D1-C7224-DE096.jpg",
]

var i = 0;

const currentOptionText1 = document.getElementById("active-text1");
const currentOptionText2 = document.getElementById("active-text2");
const currentOptionImage = document.getElementById("image");
const carousel = document.getElementById("about-carousel-wrapper");
const mainMenu = document.getElementById("menu");
const optionPrevious = document.getElementById("previous-option");
const optionNext = document.getElementById("next-option");

currentOptionText1.innerText = text1Options[i];
currentOptionText2.innerText = text2Options[i];
currentOptionImage.style.backgroundImage = "url(" + imageOptions[i] + ")";
mainMenu.style.background = colorOptions[i];

optionPrevious.onclick = function () {
  i = i + 1;
  i = i % text1Options.length;
  currentOptionText1.dataset.nextText = text1Options[i];

  currentOptionText2.dataset.nextTest = text2Options[i];

  mainMenu.style.background = colorOptions[i];
  carousel.classList.add("anim-next");

  setTimeout(() => {
    currentOptionImage.style.backgroundImage = "url(" + imageOptions[i] + ")";
  }, 455);

  setTimeout(() => {
    currentOptionText1.innerText = text1Options[i];
    currentOptionText2.innerText = text2Options[i];
    carousel.classList.remove("anim-next");
  }, 650)
}

optionNext.onclick = function () {
  if (i === 0) {
    i = text1Options.length;
  }
  i = i - 1;
  currentOptionText1.dataset.previousText = text1Options[i];

  currentOptionText2.dataset.previousText = text2Options[i];

  mainMenu.style.background = colorOptions[i];
  carousel.classList.add("anim-previous");

  setTimeout(() => {
    currentOptionImage.style.backgroundImage = "url(" + imageOptions[i] + ")";
  }, 455);

  setTimeout(() => {
    currentOptionText1.innerText = text1Options[i];
    currentOptionText2.innerText = text2Options[i];
    carousel.classList.remove("anim-previous");
  }, 650);
}

