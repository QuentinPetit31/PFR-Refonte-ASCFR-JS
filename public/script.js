/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Charge tous les composants
    await Promise.all([
      loadComponent("header", "partials/header.html"),
      loadComponent("#menu", "partials/menu.html"),
      loadComponent("footer", "partials/footer.html"),
    ]);

    initializeMenu();
  } catch (error) {
    console.error("Erreur lors du chargement des composants:", error);
  }
});

function initializeMenu() {
  const menuButton = document.querySelector("#menu-button");
  const menu = document.querySelector("#menu");

  if (menuButton && menu) {
    menuButton.addEventListener("click", (e) => {
      e.preventDefault();
      menu.classList.toggle("hidden");
      console.log("Menu toggled");
    });
  }
}

async function loadComponent(selector, path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const content = await response.text();

    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = content;
      console.log(`Composant ${path} chargé avec succès`);
    }
  } catch (error) {
    console.error(`Erreur de chargement du composant ${path}:`, error);
  }
}

function initializeMenu() {
  const menuButton = document.querySelector("#menu-button");
  const menu = document.querySelector("#menu");

  if (menuButton && menu) {
    menuButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Menu cliqué");

      // Vérifie si le menu est actuellement caché
      const isHidden = menu.classList.contains("hidden");

      // Toggle la classe et le style
      menu.classList.toggle("hidden");
      menu.style.display = isHidden ? "flex" : "none";

      console.log("État du menu:", isHidden ? "affiché" : "caché");
    });
  } else {
    console.log("Éléments manquants:", {
      menuButton: !!menuButton,
      menu: !!menu,
    });
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAyLJwseXraAd6RzZmtRYlGFBxkrLPv4PQ",
  authDomain: "ascfr-refonte.firebaseapp.com",
  projectId: "ascfr-refonte",
  storageBucket: "ascfr-refonte.firebasestorage.app",
  messagingSenderId: "192382773773",
  appId: "your-app-id", // Si disponible
};

// Initialisation Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialisation Firestore
const db = firebase.firestore();

// Exemple : récupérer une collection
db.collection("ma-collection")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data());
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des documents :", error);
  });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Firebase
console.log("Début du chargement des composants");

loadComponent("header", "partials/header.html")
  .then(() => console.log("Header chargé avec succès"))
  .catch((error) => console.error("Erreur chargement header :", error));

loadComponent("footer", "partials/footer.html")
  .then(() => console.log("Footer chargé avec succès"))
  .catch((error) => console.error("Erreur chargement footer :", error));

db.collection("test")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data());
    });
  })
  .catch((error) => {
    console.error("Erreur Firebase Firestore :", error);
  });
