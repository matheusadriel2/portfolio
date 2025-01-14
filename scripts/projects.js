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

// Popover
document.addEventListener("DOMContentLoaded", () => {
  const openButtons = document.querySelectorAll(".card-link");

  openButtons.forEach((openButton) => {
    const popoverId = openButton.getAttribute("popovertarget");
    const popover = document.getElementById(popoverId);

    if (!popover) {
      console.warn(`Popover com ID "${popoverId}" não encontrado.`);
      return;
    }

    const closeButton = popover.querySelector(".icon");

    if (!closeButton) {
      console.warn(`Botão de fechamento não encontrado no popover "${popoverId}".`);
      return;
    }

    const openPopover = (event) => {
      event.preventDefault();
      popover.showModal();
      document.body.classList.add("modal-open");
    };

    const closeModal = () => {
      popover.close();
      document.body.classList.remove("modal-open");
    };

    openButton.addEventListener("click", openPopover);

    closeButton.addEventListener("click", closeModal);

    popover.addEventListener("click", (event) => {
      if (event.target === popover) {
        closeModal();
      }
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelectorAll(".popover[open]").forEach((popover) => {
        popover.close();
      });
      document.body.classList.remove("modal-open");
    }
  });
});
