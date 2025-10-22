const cursor = document.querySelector(".cursor");
let cursorVisible = false;

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;

  if (!cursorVisible) {
    cursor.style.opacity = "1";
    cursorVisible = true;
  }
});

const username = "matheusadriel2";
const projectsGrid = document.querySelector(".projects-grid");

async function loadProjects() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) throw new Error("Falha ao obter repositórios do GitHub");

    const repos = await response.json();

    const filteredRepos = repos.filter((repo) => !repo.fork).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    const limitedRepos = filteredRepos.slice(0, 6);

    const reposWithLanguages = await Promise.all(
      limitedRepos.map(async (repo) => {
        const langResponse = await fetch(repo.languages_url);
        const langs = await langResponse.json();

        const topLanguages = Object.entries(langs)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([lang]) => lang);

        return { ...repo, topLanguages };
      })
    );

    reposWithLanguages.forEach((repo) => {
      const imagePath = `./assets/img/${repo.name}-banner.webp`;
      const defaultImage = "./assets/img/default-banner.webp";
      const description = repo.description || "Sem descrição disponível.";

      const card = document.createElement("div");
      card.classList.add("card-item");

      const badgesHTML = repo.topLanguages
        .map((lang) => {
          const langClass = `${lang.toLowerCase()}-badge`;
          return `<p class="badge ${langClass}">${lang}</p>`;
        })
        .join("");

      card.innerHTML = `
        <a href="${repo.html_url}" target="_blank" class="card-link" aria-label="Ver projeto ${repo.name} no GitHub">
          <img src="${imagePath}" 
               onerror="this.onerror=null; this.src='${defaultImage}'" 
               alt="Capa do projeto ${repo.name}" 
               class="card-image" />
          <div class="card-content">
            <div class="badges">
              ${badgesHTML}
            </div>
            <h2 class="card-title">${repo.name}</h2>
            <p class="card-description">${description}</p>
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
