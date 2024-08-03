const locomotiveFn = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

};
// locomotiveFn();

const counter = document.querySelector('.counter');
const h1 = document.querySelectorAll('.loader-text h1');
const loaderBottom = document.querySelector('#loader-bottom');
const nowKeyWord = document.querySelector('[data-word="now"]');
const preloader = document.querySelector('#preloader');

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

const changeStyle = () => {
  let isItalic = false;
  const interval = setInterval(() => {
    let count = parseInt(counter.textContent.split(' ')[0]);
    if (count >= 100) {
      clearInterval(interval);
      return;
    }
    nowKeyWord.style.fontFamily = isItalic ? 'Plain-regular' : 'silkserif-light';
    nowKeyWord.style.color = isItalic ? 'white' : 'transparent';
    isItalic = !isItalic;
  }, 450);
};

const startAnimation = () => {
  let tl = gsap.timeline({
    delay: 0.5,
    defaults: {
      duration: 1,
    },
    onComplete: () => {
      console.log("Animation finished");
    }
  });

  tl.from([h1], {
    y: 150,
    duration: 0.6,
    stagger: 0.25,
  });

  tl.to([loaderBottom, counter], {
    opacity: 1,
    onStart: () => {
      countUp();
      changeStyle();
    }
  });

  tl.from(preloader, {
    y: '-100%'
  })
};

startAnimation();