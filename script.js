// Selecting DOM elements
const counter = document.querySelector('.counter');
const h1 = document.querySelectorAll('.loader-text h1');
const loaderBottom = document.querySelector('#loader-bottom');
const nowKeyWord = document.querySelector('[data-word="now"]');
const preloader = document.querySelector('.preloader');

// Function to count up to 100
const countUp = () => {
  let count = 0;
  const interval = setInterval(() => {
    if (count < 100) {
      count++;
      counter.textContent = `${count} - 100`;
    } else {
      clearInterval(interval);
    }
  }, 25);
};

// Function to start animations
const startAnimation = () => {
  const tl = gsap.timeline({
    delay: 0.5,
    defaults: { duration: 1 },
    onComplete: () => console.log("Animation finished"),
  });

  tl.from(h1, {
    y: 150,
    duration: 0.6,
    stagger: 0.25,
  })
  .to([loaderBottom, counter], {
    opacity: 1,
    onStart: () => {
      countUp();
      changeStyle();
    },
  })
  .to(h1, {
    delay: 2,
    opacity: 0,
    duration: 1.5,
    onStart: () => {
      counter.style.opacity = 0;
      loaderBottom.style.opacity = 0;
    },
  })
  .to(preloader, {
    y: '-100%',
    opacity: 0,
  });
};

startAnimation();