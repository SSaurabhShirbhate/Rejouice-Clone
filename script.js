function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locoScroll();

function cursorEffect() {
  // select elements
  var cursor = document.querySelector("#cursor");
  var section1Content = document.querySelector("#section1-content");

  section1Content.addEventListener("mousemove", function (dets) {
    gsap.to(cursor, {
      x: dets.x,
      y: dets.y,
    });
  });

  // mouse entre and leave logic =>
  section1Content.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });
  section1Content.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}
cursorEffect();

function section2Animation() {
  gsap.from(".elem h1", {
    y: 150,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: "#section2",
      scroller: ".main",
      start: "top 60%",
      end: "top 47%",
      //   markers: true,
      scrub: 2,
    },
  });

  gsap.from("#section2-head h2", {
    y: 60,
    stagger: 0.2,
    duration: 0.1,
    scrollTrigger: {
      trigger: "#section2",
      scroller: ".main",
      start: "top 90%",
      end: "top 57%",
      //   markers: true,
      scrub: 2,
    },
  });
}
section2Animation();

function section4Animation() {
  gsap.from(".elem4 h1", {
    y: 150,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: "#section4",
      scroller: ".main",
      start: "top 60%",
      end: "top 47%",
      //   markers: true,
      scrub: 2,
    },
  });

  gsap.from("#section4-head h2", {
    y: 60,
    stagger: 0.2,
    duration: 0.1,
    scrollTrigger: {
      trigger: "#section4",
      scroller: ".main",
      start: "top 90%",
      end: "top 57%",
      //   markers: true,
      scrub: 2,
    },
  });
}
section4Animation();

function section5CursorEffect() {
  var cursorblack = document.getElementById("section5-cursor");
  var sectionfive = document.getElementById("section5");

  //GSAP logic for smooth scrolling =>
  sectionfive.addEventListener("mousemove", function (dets) {
    gsap.to(cursorblack, {
      x: dets.x,
      y: dets.y,
    });
  });

  sectionfive.addEventListener("mouseenter", function () {
    gsap.to(cursorblack, {
      scale: 1,
      opacity: 1,
    });
  });

  sectionfive.addEventListener("mouseleave", function () {
    gsap.to(cursorblack, {
      scale: 0,
      opacity: 0,
    });
  });
}
section5CursorEffect();

function section6Animation() {
  gsap.from(".elem6 h1", {
    y: 150,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: "#section6",
      scroller: ".main",
      start: "top 60%",
      end: "top 47%",
      //   markers: true,
      scrub: 2,
    },
  });

  gsap.from("#section6-head h2", {
    y: 60,
    stagger: 0.2,
    duration: 0.1,
    scrollTrigger: {
      trigger: "#section6",
      scroller: ".main",
      start: "top 90%",
      end: "top 57%",
      //   markers: true,
      scrub: 2,
    },
  });
}
section6Animation();

function loaderEffect() {
  var tl = gsap.timeline();

  tl.from("#loader p", {
    x: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.1, //time for each element come after another
  })
    .to("#loader p", {
      x: -25,
      duration: 0.5,
      stagger: 0.1,
      opacity: 0,
    })
    .to("#loader", {
      opacity: 0,
    })
    .to("#loader", {
      display: "none",
    })
    .from("#section1-content h1 span", {
      y: 160,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      delay: -0.6,
    });

  tl.play();
}

function footerEffect() {
  var tlfooter = gsap.timeline();

  // Animation for "rejouice" word at the bottom of section 9
  tlfooter.from("#section-foot h1 span", {
    y: -200,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
  });

  return tlfooter; // Return the timeline
}

// Call the loaderEffect() function to initiate the initial animations
loaderEffect();

// Function to check if the footer is in the viewport
function isFooterVisible() {
  var footer = document.getElementById("section9");

  var rect = footer.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

// Check if the footer is in the viewport every 500 milliseconds
var footerInterval = setInterval(function () {
  if (isFooterVisible()) {
    footerEffect(); // Trigger the footer animation
    clearInterval(footerInterval); // Stop checking once the footer is visible
  }
}, 500);
