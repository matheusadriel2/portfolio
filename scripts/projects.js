// Projects filters
const techFilter = document.querySelector('select[name="tecnologias"]');
const areaFilter = document.querySelector('select[name="area"]');
const cards = document.querySelectorAll(".card-item");

techFilter.addEventListener("change", filterProjects);
areaFilter.addEventListener("change", filterProjects);

function filterProjects() {
  const selectedTech = techFilter.value.toLowerCase();
  const selectedArea = areaFilter.value.toLowerCase();

  cards.forEach((card) => {
    const cardClasses = card.classList;

    const matchesTech = selectedTech === "stack" || cardClasses.contains(selectedTech);
    const matchesArea = selectedArea === "area" || cardClasses.contains(selectedArea);

    if (matchesTech && matchesArea) {
      card.style.display = "block";
      setTimeout(() => card.classList.remove("hidden"), 10);
    } else {
      card.classList.add("hidden");
    }
  });
}

cards.forEach((card) => {
  card.addEventListener("transitionend", () => {
    if (card.classList.contains("hidden")) {
      card.style.display = "none";
    }
  });
});