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
      const matchInfo = `

    <img src="${match.teams.home.logo}" alt="${
        match.teams.home.name
      }" width="50">   vs
    <img src="${match.teams.away.logo}" alt="${
        match.teams.away.name
      }" width="50">

    ${match.teams.home.name} vs ${match.teams.away.name} <br>
    ${new Date(match.fixture.date).toLocaleString()}<br>

  `;
      document.getElementById("prochain-match").innerHTML = matchInfo;
    } else {
      document.getElementById("prochain-match").innerText =
        "Aucun match trouvé.";
    }
  })
  .catch((error) => console.error("Erreur:", error));
