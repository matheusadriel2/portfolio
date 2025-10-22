const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.transform = `translate(${e.clientX - cursor.offsetWidth / 2}px, ${e.clientY - cursor.offsetHeight / 2}px)`;
});

const username = "matheusadriel2";
const projectsGrid = document.querySelector(".projects-grid");

async function loadProjects() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) throw new Error("Falha ao obter repositórios do GitHub");

    const repos = await response.json();

    const filteredRepos = repos
      .filter((repo) => !repo.fork) // ignora forks
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    const limitedRepos = filteredRepos.slice(0, 6);

    limitedRepos.forEach((repo) => {
      const language = repo.language || "Outros";
      const languageClass = `${language.toLowerCase()}-badge`;

      const imagePath = `./assets/img/${repo.name}-banner.webp`;
      const defaultImage = "./assets/img/default-banner.webp";

      const card = document.createElement("div");
      card.classList.add("card-item");

      card.innerHTML = `
        <a href="${repo.html_url}" target="_blank" class="card-link" aria-label="Ver projeto ${repo.name} no GitHub">
          <img src="${imagePath}" 
               onerror="this.onerror=null; this.src='${defaultImage}'" 
               alt="Capa do projeto ${repo.name}" 
               class="card-image" />
          <div class="card-content">
            <div class="badges">
              <p class="badge ${languageClass}">${language}</p>
            </div>
            <h2 class="card-title">${repo.name}</h2>
            <button class="card-button material-symbols-outlined">arrow_forward</button>
          </div>
        </a>
      `;

      projectsGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar repositórios:", error);
    projectsGrid.innerHTML = `<p style="color: var(--primary-color); font-size: 1.25rem;">Não foi possível carregar os projetos 😞</p>`;
  }
}

document.addEventListener("DOMContentLoaded", loadProjects);
