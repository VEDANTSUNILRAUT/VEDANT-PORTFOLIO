const roles = [
  "Full Stack Developer",
  "UI/UX Designer",
  "Web Developer",
  "Software Engineer",
];
const roleElement = document.getElementById("changing-role");

let index = 0;

function changeRole() {
  // Fade out
  roleElement.style.opacity = 0;

  setTimeout(() => {
    // Change text
    roleElement.textContent = roles[index];
    // Fade in
    roleElement.style.opacity = 1;

    // Move to next role
    index = (index + 1) % roles.length;
  }, 500); // matches CSS transition duration
}

// Change role every 2 seconds
setInterval(changeRole, 2000);

// Initialize first role
roleElement.textContent = roles[0];
