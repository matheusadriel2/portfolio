const mobileMenu = document.querySelector(".mobile-menu");
const navMenu = document.querySelector(".nav-list");

mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".item").forEach((n) =>
  n.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

document.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const homeTitle = document.querySelector("#home-title");

  const aboutTop = homeTitle.getBoundingClientRect().top;

  if (aboutTop <= 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
