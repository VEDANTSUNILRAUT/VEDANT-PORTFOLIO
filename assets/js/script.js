// BackGround Spider Man Effect
document.addEventListener("DOMContentLoaded", () => {
  // Breathing RGB color sequence
  const rgbColors = [
    { r: 255, g: 0, b: 0 }, // Red
    { r: 0, g: 255, b: 0 }, // Green
    { r: 0, g: 0, b: 255 }, // Blue
    { r: 255, g: 0, b: 255 }, // Magenta
    { r: 0, g: 255, b: 255 }, // Cyan
    { r: 255, g: 255, b: 0 }, // Yellow
  ];

  let currentIndex = 0;
  let nextIndex = 1;
  let progress = 0;
  const transitionSpeed = 0.005; // Lower = slower

  // Convert RGB to hex
  function rgbToHex(r, g, b) {
    return (
      "#" +
      [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("")
    );
  }

  // Linear interpolation between two RGB colors
  function lerpColor(c1, c2, t) {
    return {
      r: c1.r + (c2.r - c1.r) * t,
      g: c1.g + (c2.g - c1.g) * t,
      b: c1.b + (c2.b - c1.b) * t,
    };
  }

  // ParticleJS config
  const config = {
    particles: {
      number: {
        value: 120,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ["#ffffff", "#66fcf1", "#00f2ff", "#9d4edd"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 0.5,
          opacity_min: 0.2,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          size_min: 0.3,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 130,
        color: "#66fcf1",
        opacity: 0.2,
        width: 1.2,
      },

      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 150,
          line_linked: {
            opacity: 1,
          },
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    retina_detect: true,
  };

  particlesJS("particles-js", config);

  // Smooth RGB transition loop
  function animateLineColor() {
    if (!window.pJSDom || !window.pJSDom[0]) return;
    const pJS = window.pJSDom[0].pJS;

    // Interpolate color
    const currentColor = rgbColors[currentIndex];
    const nextColor = rgbColors[nextIndex];
    const lerped = lerpColor(currentColor, nextColor, progress);
    const hexColor = rgbToHex(lerped.r, lerped.g, lerped.b);

    // Apply to lines
    pJS.particles.line_linked.color_rgb_line = lerped;
    pJS.particles.line_linked.color = hexColor;

    // Update progress
    progress += transitionSpeed;
    if (progress >= 1) {
      progress = 0;
      currentIndex = nextIndex;
      nextIndex = (nextIndex + 1) % rgbColors.length;
    }

    requestAnimationFrame(animateLineColor);
  }

  requestAnimationFrame(animateLineColor);

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Mobile menu toggle
  document.querySelector(".hamburger")?.addEventListener("click", () => {
    document.querySelector(".nav-links")?.classList.toggle("active");
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target && targetId !== "#") {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
        document.querySelector(".nav-links")?.classList.remove("active");
      }
    });
  });

  // Animate skill bars
  document.querySelectorAll(".skill-level-bar").forEach((bar) => {
    const targetWidth = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, 300);
  });

  // Intersection Observer utility
  const createObserver = (selector, threshold, callback) => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(callback, { threshold });
    elements.forEach((el) => observer.observe(el));
  };

  // Skill category animation
  createObserver(".skill-category", 0.1, (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  // Timeline item animation
  createObserver(".timeline-item", 0.15, (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  // Timeline hover effect
  document.querySelectorAll(".timeline-content").forEach((content) => {
    content.addEventListener("mouseenter", () => {
      content.style.transform = "translateY(-10px)";
      content.style.boxShadow = "0 20px 40px rgba(157, 78, 221, 0.3)";
    });
    content.addEventListener("mouseleave", () => {
      content.style.transform = "translateY(0)";
      content.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.3)";
    });
  });

  // Generic animation for elements with .animate-in
  document.querySelectorAll(".animate-in").forEach((el) => {
    el.style.visibility = "hidden";
  });
  createObserver(".animate-in", 0.1, (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.visibility = "visible";
        entry.target.classList.add(entry.target.dataset.animation);
      }
    });
  });

  // Project card staggered animation
  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
});

// Back to Top Button
window.onscroll = function () {
  const btn = document.getElementById("backToTopBtn");
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

document.getElementById("backToTopBtn")?.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// photo animation
// document.addEventListener("DOMContentLoaded", () => {
//   // Add dynamic glow effect to spinner on mouse move
//   const spinner = document.querySelector(".spinner");
//   const container = document.querySelector(".spinner-container");

//   container.addEventListener("mousemove", (e) => {
//     const rect = container.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const centerX = rect.width / 2;
//     const centerY = rect.height / 2;

//     const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);

//     spinner.style.background = `conic-gradient(
//                     from ${angle}deg at 50% 50%,
//                     rgba(186, 66, 255, 0.9) 0%,
//                     rgba(0, 225, 255, 0.9) 50%,
//                     rgba(186, 66, 255, 0.9) 100%
//                 )`;
//   });

//   container.addEventListener("mouseleave", () => {
//     spinner.style.background = `conic-gradient(
//                     from 0deg at 50% 50%,
//                     rgba(186, 66, 255, 0.8) 0%,
//                     rgba(0, 225, 255, 0.8) 50%,
//                     rgba(186, 66, 255, 0.8) 100%
//                 )`;
//   });

//   // Add random floating to icons
//   const icons = document.querySelectorAll(".icon");

//   setInterval(() => {
//     icons.forEach((icon) => {
//       const randomX = Math.random() * 20 - 10;
//       const randomY = Math.random() * 20 - 10;
//       icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
//     });
//   }, 3000);
// });
// ===== THEME TOGGLE FUNCTIONALITY =====
const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

// Check for saved theme preference or respect OS preference
const currentTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark");
htmlElement.setAttribute("data-theme", currentTheme);

// Update icon based on current theme
if (currentTheme === "light") {
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  htmlElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Update icon
  themeToggle.innerHTML =
    newTheme === "dark"
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
});
