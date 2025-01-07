const apiKey = "eb07dfa7f9525afbfb394e2a542680f4";
const teamId = "42";
const leagueId = "39";
const season = "2021";
const fromDate = "2021-09-25";
const toDate = "2021-09-26";

const url = `https://v3.football.api-sports.io/fixtures?team=${teamId}&league=${leagueId}&season=${season}&from=${fromDate}&to=${toDate}`;

fetch(url, {
  method: "GET",
  headers: {
    "x-apisports-key": apiKey,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // Vérifie s'il y a des matchs disponibles
    if (data.response.length > 0) {
      const match = data.response[0];
      const matchDate = new Date(match.fixture.date);

      // Formatte la date (jour/mois/année)
      const formattedDate = matchDate.toLocaleDateString("fr-FR");

      // Formatte l'heure (heures:minutes)
      const formattedTime = matchDate.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const matchInfo = `
        <div class="match-header">Match à venir</div>
        <div class="match-teams">
          <img src="${match.teams.home.logo}" alt="${match.teams.home.name}" width="10vw"> 
          <span>vs</span>
          <img src="${match.teams.away.logo}" alt="${match.teams.away.name}" width="10vw">
        </div>
        ${formattedDate} ${formattedTime}<br>
        ${match.fixture.venue.name}, ${match.fixture.venue.city}<br>
        ${match.league.name}
      `;
      document.getElementById("prochain-match").innerHTML = matchInfo;
    } else {
      document.getElementById("prochain-match").innerText =
        "Aucun match trouvé.";
    }
  })
  .catch((error) => console.error("Erreur:", error));

/////////////////////////////////////////////////////////////////////////////

// Fonction pour changer le titre du h3
function updateTitle() {
  const carouselItems = document.querySelectorAll("[data-carousel-item]");
  const activeItem = Array.from(carouselItems).find(
    (item) => !item.classList.contains("hidden")
  );

  const title = document.getElementById("carousel-title");

  if (activeItem) {
    if (
      activeItem.querySelector("img").alt ===
      "Collection Adidas Arsenal - France"
    ) {
      title.textContent = "Collection Adidas Arsenal - France";
    } else if (
      activeItem.querySelector("img").alt === "Adversaires Ligue des Champions"
    ) {
      title.textContent = "Adversaires Ligue des Champions";
    }
  }
}

// Écoute les événements de changement de l'image du carousel
const carouselPrevButton = document.querySelector("[data-carousel-prev]");
const carouselNextButton = document.querySelector("[data-carousel-next]");

// Met à jour le titre au démarrage
updateTitle();

// Ajoute des écouteurs d'événements sur les boutons de navigation du carousel
carouselPrevButton.addEventListener("click", updateTitle);
carouselNextButton.addEventListener("click", updateTitle);

/////////////////////////////////////////////////////////////////////////////

fetch("menu.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("menu-container").innerHTML = data;
    // Ajoutez les scripts nécessaires après le chargement
    const menuToggle = document.getElementById("menu-toggle");
    const menuClose = document.getElementById("menu-close");
    const mobileMenu = document.getElementById("mobile-menu");

    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.add("visible");
    });

    menuClose.addEventListener("click", () => {
      mobileMenu.classList.remove("visible");
    });
  });

/////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const menuLink = document.getElementById("menu-link");
  const closeButton = document.getElementById("close-button");
  const menu = document.getElementById("menu");
  const body = document.body;

  menuLink.addEventListener("click", (e) => {
    e.preventDefault();
    menu.classList.add("visible"); // Afficher le menu
    body.classList.add("hidden-content"); // Masquer le contenu sauf le header et le footer
  });

  closeButton.addEventListener("click", () => {
    menu.classList.remove("visible");
    body.classList.remove("hidden-content"); // Réafficher le contenu
  });
});
