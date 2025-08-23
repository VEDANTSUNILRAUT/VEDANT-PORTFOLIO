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

  // Skills slider functionality
  const categoryBtns = document.querySelectorAll(".category-btn");
  const slider = document.querySelector(".skills-slider");
  const indicatorDots = document.querySelectorAll(".indicator-dot");
  const categories = ["languages", "frontend", "backend", "databases", "tools"];
  let currentCategoryIndex = 0;

  // Set active category
  function setActiveCategory(index) {
    // Remove active class from all buttons
    categoryBtns.forEach((btn) => btn.classList.remove("active"));
    indicatorDots.forEach((dot) => dot.classList.remove("active"));

    // Add active class to clicked button
    categoryBtns[index].classList.add("active");
    indicatorDots[index].classList.add("active");

    // Move slider
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  // Add click event to category buttons
  categoryBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      setActiveCategory(index);
    });
  });

  // Add click event to indicator dots
  indicatorDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setActiveCategory(index);
    });
  });

  // Add hover effects to skill items
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) translateY(-5px)";
      this.style.boxShadow = "0 0 15px rgba(56, 189, 248, 0.5)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) translateY(0)";
      this.style.boxShadow = "none";
    });
  });

  // Auto-rotate categories every 8 seconds
  setInterval(() => {
    currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
    setActiveCategory(currentCategoryIndex);
  }, 8000);

  // Adjust container height based on content
  function adjustContainerHeight() {
    const container = document.querySelector(".skills-container");
    const categories = document.querySelectorAll(".skill-category");
    let maxHeight = 0;

    // Temporarily show all categories to measure
    slider.style.transform = "translateX(0)";

    categories.forEach((category) => {
      category.style.display = "block";
      if (category.offsetHeight > maxHeight) {
        maxHeight = category.offsetHeight;
      }
    });

    // Restore current view
    slider.style.transform = `translateX(-${currentCategoryIndex * 100}%)`;

    // Set min-height to ensure enough space
    container.style.minHeight = `${maxHeight + 40}px`;
  }

  // Adjust on load and resize
  window.addEventListener("load", adjustContainerHeight);
  window.addEventListener("resize", adjustContainerHeight);

  // Project link handling
  document.addEventListener("click", function (e) {
    const link = e.target.closest(".project-link[title='Live Demo']");
    if (link) {
      const href = link.getAttribute("href");
      if (!href || href.trim() === "#") {
        e.preventDefault(); // stop default # jump
        window.location.href = "components/notfound.html";
      }
    }
  });

  // Typing effect
  const roles = ["Full-Stack Developer", "Java Developer", "Web Developer"];
  let roleIndex = 0;
  let textIndex = 0;
  let currentText = "";
  let isDeleting = false;
  const speed = 100; // typing speed
  const eraseSpeed = 60; // erasing speed
  const delayBetweenRoles = 1500; // pause after typing a role

  function typeEffect() {
    const role = roles[roleIndex];
    if (isDeleting) {
      currentText = role.substring(0, textIndex--);
    } else {
      currentText = role.substring(0, textIndex++);
    }

    document.getElementById("changing-role").textContent = currentText;

    if (!isDeleting && textIndex === role.length + 1) {
      isDeleting = true;
      setTimeout(typeEffect, delayBetweenRoles);
    } else if (isDeleting && textIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 300);
    } else {
      setTimeout(typeEffect, isDeleting ? eraseSpeed : speed);
    }
  }

  // Start typing effect
  typeEffect();
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

// Gear spinning functions
function spinGearAndRedirect() {
  const gear = document.getElementById("gear-icon");

  // Add spinning animation
  gear.style.transition = "transform 0.8s ease";
  gear.style.transform = "rotate(360deg)";

  // Wait for animation to finish before redirect
  setTimeout(() => {
    window.location.href = "./components/project.html";
  }, 800);
}

function spinGearAndRedirectExperience() {
  const gear = document.getElementById("gear-icon-experience");
  gear.classList.add("spin"); // Add spinning class

  // After animation, redirect
  setTimeout(() => {
    window.location.href = "./components/experience.html";
  }, 1000); // 1 second delay for the spin effect
}

// Add CSS for spin class if not already in your CSS
const style = document.createElement("style");
style.textContent = `
  .spin {
    animation: spin 1s linear;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
