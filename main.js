import {
  animate,
  createTimeline,
  stagger
} from "https://cdn.jsdelivr.net/npm/animejs@4.0.0/+esm";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  document
    .querySelectorAll(".hero-copy, .profile-visual, .stats article")
    .forEach((item) => {
      item.style.opacity = 1;
    });
} else {
  const revealGroup = (selector, options = {}) => {
    const items = [...document.querySelectorAll(selector)];
    if (items.length === 0) {
      return;
    }

    items.forEach((item) => {
      item.style.opacity = 0;
      item.style.transform = `translateY(${options.y ?? 28}px)`;
    });

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target);

      if (visible.length === 0) {
        return;
      }

      animate(visible, {
        opacity: [0, 1],
        y: [options.y ?? 28, 0],
        rotate: options.rotate ?? 0,
        duration: options.duration ?? 720,
        delay: stagger(options.stagger ?? 90),
        ease: "outExpo"
      });

      visible.forEach((item) => observer.unobserve(item));
    }, { threshold: 0.18, rootMargin: "0px 0px -10% 0px" });

    items.forEach((item) => observer.observe(item));
  };

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
    .add(".ai-panel", {
      scale: [0.96, 1],
      opacity: [0, 1],
      duration: 720
    }, "-=520")
    .add(".orbit-token", {
      opacity: [0, 1],
      scale: [0.78, 1],
      y: [12, 0],
      duration: 620,
      delay: stagger(85)
    }, "-=520")
    .add(".rocket-ship", {
      opacity: [0, 1],
      scale: [0.65, 1],
      rotate: [-18, 12],
      duration: 620
    }, "-=520")
    .add(".stats article", {
      opacity: [0, 1],
      y: [22, 0],
      duration: 680,
      delay: stagger(95)
    }, "-=260");

  animate(".ai-panel", {
    y: [-6, 6],
    duration: 4200,
    ease: "inOutSine",
    alternate: true,
    loop: true
  });

  animate(".console-card", {
    rotate: [-0.7, 0.7],
    duration: 3600,
    ease: "inOutSine",
    alternate: true,
    loop: true
  });

  animate(".orbit-lines .launch-arc", {
    strokeDashoffset: [60, 0],
    duration: 3600,
    ease: "linear",
    loop: true
  });

  animate(".orbit-token", {
    y: [-8, 8],
    rotate: [-1.5, 1.5],
    duration: 2600,
    delay: stagger(180),
    ease: "inOutSine",
    alternate: true,
    loop: true
  });

  animate(".signal-node", {
    scale: [0.72, 1.28],
    opacity: [0.55, 1],
    duration: 1200,
    delay: stagger(260),
    ease: "inOutSine",
    alternate: true,
    loop: true
  });

  animate(".rocket-ship", {
    x: [0, 24, 50, 20, 0],
    y: [0, -28, -56, -24, 0],
    rotate: [8, 18, 30, 16, 8],
    duration: 5200,
    ease: "inOutSine",
    loop: true
  });

  revealGroup(".capability-card", { y: 34, stagger: 120, duration: 760 });
  revealGroup(".ai-card", { y: 34, rotate: [-1.5, 0], stagger: 95, duration: 760 });
  revealGroup(".skill-cloud span", { y: 16, stagger: 45, duration: 520 });
  revealGroup(".timeline-item", { y: 18, stagger: 90, duration: 660 });

  document.querySelectorAll(".ai-card, .capability-card").forEach((card) => {
    card.addEventListener("pointerenter", () => {
      animate(card, {
        y: -8,
        scale: 1.02,
        duration: 320,
        ease: "outExpo",
        composition: "blend"
      });
    });

    card.addEventListener("pointerleave", () => {
      animate(card, {
        y: 0,
        scale: 1,
        duration: 360,
        ease: "outExpo",
        composition: "blend"
      });
    });
  });
}
