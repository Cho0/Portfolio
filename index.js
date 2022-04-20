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
  autoLoop();
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
  autoLoop();
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
  autoLoop();
}

function autoLoop() {
  timeoutID = setTimeout(() => {
    getNextSlide();
  }, 5000)
}

getActiveDot();
clickDot();
autoLoop();

// -- reveal about me -- //

// function showHideAbout() {
//   var showHide = document.getElementById("about-me");
//   if (showHide.style.display === "none") {
//     showHide.style.display = "block";
//   } else {
//     showHide.style.display = "none";
//   }
// }

