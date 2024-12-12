// const track = document.querySelector(".carousel-track");
// const slides = Array.from(track.children);
// const prevButton = document.querySelector(".carousel-button.left");
// const nextButton = document.querySelector(".carousel-button.right");

// let currentSlideIndex = 0;

// nextButton.addEventListener("click", () => {
//   currentSlideIndex = (currentSlideIndex + 1) % slides.length;
//   const amountToMove = slides[currentSlideIndex].offsetLeft;
//   track.style.transform = `translateX(-${amountToMove}px)`;
// });

// prevButton.addEventListener("click", () => {
//   currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
//   const amountToMove = slides[currentSlideIndex].offsetLeft;
//   track.style.transform = `translateX(-${amountToMove}px)`;
// });

/////////////////////////////////////////////////////////////////////////////
// const response = await fetch(apiUrl, {
//   headers: {
//     "x-rapidapi-key": apiKey, // Remplace par ta clé
//     "x-rapidapi-host": "v3.football.api-sports.io",
//   },
// });
// const apiUrl = `https://v3.football.api-sports.io/fixtures?team=57&next=5`;

// const apiKey = "69dc1fd4ea9a42afad982548c860b9d9";
// const teamId = 57;

// async function fetchUpcomingMatches() {
//   const response = await fetch(
//     `https://v3.football.api-sports.io/fixtures?team=57&next=5
// `,
//     {
//       headers: { "x-rapidapi-key": apiKey },
//     }
//   );
//   const data = await response.json();

//   const matches = data.response;
//   const matchesList = document.getElementById("matches-list");

//   matches.forEach((match) => {
//     const homeTeam = match.teams.home;
//     const awayTeam = match.teams.away;

//     const matchItem = document.createElement("li");
//     matchItem.innerHTML = `
//       <div>
//         <img src="${homeTeam.logo}" alt="${homeTeam.name}" width="50">
//         <span>${homeTeam.name} vs ${awayTeam.name}</span>
//         <img src="${awayTeam.logo}" alt="${awayTeam.name}" width="50">
//         <p>${new Date(match.fixture.date).toLocaleDateString()}</p>
//       </div>
//     `;
//     matchesList.appendChild(matchItem);
//   });
// }

// fetchUpcomingMatches();

///////////////////////////////////////
const url = "https://footapi7.p.rapidapi.com/api/team/57/matches/next/1";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "79e1983542msh7f9b7101deb4fafp13c258jsnc7847ba46947",
    "x-rapidapi-host": "footapi7.p.rapidapi.com",
  },
};

const matchesContainer = document.getElementById("matches-container");

async function fetchNextMatches() {
  try {
    const response = await fetch(url, options);
    console.log("Réponse brute:", response);

    // Vérification du statut HTTP avant d'essayer de traiter la réponse
    if (response.status === 204) {
      console.log("Aucun contenu disponible pour ce match.");
      matchesContainer.innerHTML = "<p>Aucun match à venir.</p>";
      return; // Pas de contenu à afficher
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Essayer de convertir en JSON après avoir vérifié la réponse
    const result = await response.json();
    console.log("Données reçues :", result);

    matchesContainer.innerHTML = ""; // Supprimer le message de chargement

    const matches = result?.matches || [];
    if (matches.length === 0) {
      matchesContainer.innerHTML = "<p>Aucun match à venir.</p>";
      return;
    }

    // Affichage des matchs
    matches.forEach((match) => {
      const matchCard = document.createElement("div");
      matchCard.classList.add("match-card");

      const homeTeam = match.homeTeam?.name || "Équipe à domicile inconnue";
      const awayTeam = match.awayTeam?.name || "Équipe à l’extérieur inconnue";
      const date = new Date(match.date).toLocaleString("fr-FR", {
        dateStyle: "full",
        timeStyle: "short",
      });

      matchCard.innerHTML = `
        <h2>${homeTeam} vs ${awayTeam}</h2>
        <p>Date : ${date}</p>
        <p>Compétition : ${match.competition?.name || "Inconnue"}</p>
      `;
      matchesContainer.appendChild(matchCard);
    });
  } catch (error) {
    matchesContainer.innerHTML = `<p>Erreur lors de la récupération des matchs : ${error.message}</p>`;
    console.error("Erreur:", error);
  }
}

fetchNextMatches();
