const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

const cursorGlow = document.querySelector(".cursor-glow");
const useGlow = cursorGlow && window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion;

if (useGlow) {
  let currentX = window.innerWidth / 2;
  let currentY = window.innerHeight / 2;
  let targetX = currentX;
  let targetY = currentY;

  const moveGlow = () => {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    cursorGlow.style.transform = `translate(${currentX - 120}px, ${currentY - 120}px)`;
    window.requestAnimationFrame(moveGlow);
  };

  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  });

  window.addEventListener("pointerleave", () => {
    targetX = window.innerWidth / 2;
    targetY = window.innerHeight / 2;
  });

  moveGlow();
}
