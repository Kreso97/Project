const generateTeamsButton = document.getElementById("generate-teams");
const teamsContainer = document.getElementById("teams");

generateTeamsButton.addEventListener("click", async () => {
  // pravljenje API poziva
  const response = await fetch("https://free-nba.p.rapidapi.com/teams?page=0", {
    headers: {
      "X-RapidAPI-Key": "4f5c10fc7amshfce1fdc1324a8bap1e37f3jsne2aa425f53b2",
      "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
    },
  });

  // Parsiranje podataka kako bismo ih mogli koristiti
  const data = await response.json();

  // Prikazivanje timova
  teamsContainer.innerHTML = "";
  data.data.forEach((team) => {
    //pomoću petlje forEach prolazimo kroz svaku iteraciju niza "team"
    const teamElement = document.createElement("div"); //napravi novi div
    teamElement.classList.add("card"); //doda mu clasu "card"
    teamElement.innerHTML = `   
      <div class="card-header">
        ${team.full_name}
      </div>
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item">City: ${team.city}</li>
          <li class="list-group-item">Conference: ${team.conference}</li>
          <li class="list-group-item">Name: ${team.name}</li>
          <li class="list-group-item">Full name: ${team.full_name}</li>
        </ul>
      </div>
    `;
    teamsContainer.appendChild(teamElement); //pomoću appendChild dodamo teamElement u teamsContainer
  });
});

document.getElementById("back-to-top").addEventListener("click", function () {
  window.scrollTo(0, 0); // skrolanje na vrh
  document.getElementById("teams").innerHTML = ""; // brisanje sadrzaja od timova
});

// NOVI API POZIV za pretraživanje igrača //

const data = null;

const xhr = new XMLHttpRequest();
const generatePlayersButton = document.getElementById("generate-players");

generatePlayersButton.addEventListener("click", async () => {
  // tražimo ime igrača
  const playerName = prompt("Enter a player name:");

  // pravimo api poziv sa imenom igrača
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      // parsiranje podataka
      const data = JSON.parse(this.responseText);

      // prikazivanje rezultata igrača
      const teamsContainer = document.getElementById("teams");
      teamsContainer.innerHTML = "";

      data.data.forEach((player) => {
        const playerElement = document.createElement("div");
        playerElement.classList.add("card");
        playerElement.innerHTML = `
          <div class="card-header">
            ${player.first_name} ${player.last_name}
          </div>
          <div class="card-body">
            <ul class="list-group">
              <li class="list-group-item">Position: ${player.position}</li>
              <li class="list-group-item">Team: ${player.team.full_name}</li>
              <li class="list-group-item">Height: ${player.height_feet}'${player.height_inches}''</li>
              <li class="list-group-item">Weight: ${player.weight} lbs</li>
            </ul>
          </div>
        `;

        teamsContainer.appendChild(playerElement);
      });
    }
  });

  xhr.open(
    "GET",
    `https://free-nba.p.rapidapi.com/players?page=0&per_page=25&search=${playerName}`
  );
  xhr.setRequestHeader(
    "X-RapidAPI-Key",
    "4f5c10fc7amshfce1fdc1324a8bap1e37f3jsne2aa425f53b2"
  );
  xhr.setRequestHeader("X-RapidAPI-Host", "free-nba.p.rapidapi.com");

  xhr.send();
});
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open(
  "GET",
  "https://free-nba.p.rapidapi.com/players?page=0&per_page=25&search=Steph"
);
xhr.setRequestHeader(
  "X-RapidAPI-Key",
  "4f5c10fc7amshfce1fdc1324a8bap1e37f3jsne2aa425f53b2"
);
xhr.setRequestHeader("X-RapidAPI-Host", "free-nba.p.rapidapi.com");

xhr.send(data);
