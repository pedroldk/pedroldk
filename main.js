import {
  animate,
  createTimeline,
  stagger,
  onScroll
} from "https://cdn.jsdelivr.net/npm/animejs@4.0.0/+esm";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  document
    .querySelectorAll(".hero-copy, .profile-visual, .stats article, .project-card")
    .forEach((item) => {
      item.style.opacity = 1;
    });
} else {
  createTimeline({ defaults: { ease: "outExpo" } })
    .add(".hero-copy", {
      opacity: [0, 1],
      y: [34, 0],
      duration: 900
    })
    .add(".profile-visual", {
      opacity: [0, 1],
      x: [42, 0],
      duration: 900
    }, "-=520")
    .add(".portrait-grid span", {
      opacity: [0.15, 0.9],
      scale: [0.82, 1],
      duration: 620,
      delay: stagger(42, { grid: [4, 3], from: "center" })
    }, "-=520")
    .add(".stats article", {
      opacity: [0, 1],
      y: [22, 0],
      duration: 680,
      delay: stagger(95)
    }, "-=260");

  animate(".initials", {
    y: [-8, 8],
    duration: 2400,
    ease: "inOutSine",
    alternate: true,
    loop: true
  });

  animate(".console-card", {
    rotate: [-1.4, 1.4],
    duration: 3600,
    ease: "inOutSine",
    alternate: true,
    loop: true
  });

  animate(".project-card", {
    opacity: [0, 1],
    y: [36, 0],
    duration: 760,
    delay: stagger(120),
    ease: "outExpo",
    autoplay: onScroll({
      target: ".project-grid",
      enter: "bottom-=120 top",
      sync: false
    })
  });
}
