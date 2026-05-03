// Dark Mode
const btn = document.getElementById("themeBtn");

if (btn) {
  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

// Scroll Animation
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

  sections.forEach(section => {

    const pos = section.getBoundingClientRect().top;
    const screen = window.innerHeight;

    if (pos < screen - 100) {
      section.classList.add("show");
    }

  });

});

// Smooth Scroll (ONLY for internal links)
document
  .querySelectorAll('a[href^="#"]')
  .forEach(link => {

    link.addEventListener("click", e => {
      e.preventDefault();

      const target = document.querySelector(
        link.getAttribute("href")
      );

      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });

  });

// Navbar background on scroll
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {

  if (window.scrollY > 80) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

});

// Open Modal
function openModal(src) {
  document.getElementById("imgModal").style.display = "block";
  document.getElementById("modalImg").src = src;
}

// Close Modal
function closeModal() {
  document.getElementById("imgModal").style.display = "none";
}

// Close when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById("imgModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
