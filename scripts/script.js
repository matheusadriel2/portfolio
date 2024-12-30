const description = document.getElementById("about-description");

const mediaQuery = window.matchMedia("(max-width: 600px)");

function changeDescription(e) {
  if (e.matches) {
    description.innerHTML =
      "Matheus Adriel, 25 anos, desenvolvedor com experiência tanto em front quanto em back-end, além de um forte background em design.";
  } else {
    description.innerHTML =
      "Matheus Adriel, 25 anos, desenvolvedor com experiência tanto em front quanto em back-end, além de um forte background em design. Combino habilidades técnicas e criativas no desenvolvimento de sistemas robustos e funcionais, focados em oferecer experiências memoráveis.";
  }
}

mediaQuery.addEventListener("change", changeDescription);

changeDescription(mediaQuery);

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
