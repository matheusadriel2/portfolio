// Primeiro Observer para adicionar classes nas divs
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
});

// Aplicar observer para os elementos com a classe .hidden
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// Seções onde o botão deve aparecer
const sections = document.querySelectorAll(
  "#sobre, #projetos, #skills, #contato"
);
const fixedButton = document.querySelector(".scrollTop"); // Usar querySelector para classe

// Configuração do Intersection Observer para o botão
const observerOptions = {
  root: null, // Observe em relação ao viewport
  rootMargin: "0px",
  threshold: 0.1, // Quando 10% da div estiver visível
};

// Callback para monitorar a visibilidade das seções
const observerCallback = (entries) => {
  let isVisible = entries.some((entry) => entry.isIntersecting);

  // Exibir ou ocultar o botão com base na visibilidade das divs
  fixedButton.style.display = isVisible ? "block" : "none";
};

// Criação do segundo Intersection Observer
const observer2 = new IntersectionObserver(observerCallback, observerOptions);

// Observar cada seção onde o botão deve aparecer
sections.forEach((section) => observer2.observe(section));

// Função para scroll para o topo
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Adicionar evento de clique no botão para rolar para o topo
fixedButton.addEventListener("click", scrollToTop);
