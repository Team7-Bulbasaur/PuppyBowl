const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2302-ACC-PT-WEB-PT-C";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;
const APIURLTEAMS = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/teams`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(APIURL);
    const players = await response.json();
    return players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/${playerId}`);
    const singlePlayer = await response.json();
    return singlePlayer;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

const addNewPlayer = async (playerObj) => {
  try {
    console.log(playerObj);
    const response = await fetch(APIURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerObj),
    });
    const newPlayer = await response.json();
    if (newPlayer.success) {
      alert("New Player Successfully Added");
    } else {
      alert("Oops, there's a problem, check the data you sent.");
    }
    init();
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

const removePlayer = async (playerId) => {
  try {
    const resp = await fetch(`${APIURL}/${playerId}`, {
      method: "DELETE",
    });
    const deletedSinglePlayer = await resp.json();
    console.log(deletedSinglePlayer);
    if (deletedSinglePlayer.success) {
      alert("Player deleted successfully");
    } else {
      alert("Whoops, trouble removing player from the roster!`");
    }
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = async (playersResponse) => {
  try {
    console.log(playersResponse);
    // console.log(playersResponse.data.players);
    let playerList = playersResponse.data.players;
    console.log(playerList)
    playerContainer.innerHTML = "";
    playerList.forEach((player) => {
      const playersElement = document.createElement("div");
      playersElement.classList.add("player");
      playersElement.innerHTML = `
                    <h2>${player.name}</h2>
                    <p>${player.breed}</p>
                    <p>${player.status}</p>
                    <img src="${player.imageUrl}"></p>
                    <p>${player.createdAt}</p>
                    <p>${player.updatedAt}</p>
                    <button class="details-button" data-id="${player.id}" >See Details</button>
                    
                `;
      playerContainer.appendChild(playersElement);

      // see details
      const detailsButton = playersElement.querySelector(".details-button");
      detailsButton.addEventListener("click", async (event) => {
        // your code here
        event.preventDefault();
        const singlePlayer = await fetchSinglePlayer(player.id);
        playerContainer.innerHTML = `
                    <h2>${player.name}</h2>
                    <p>ID: ${player.id}</p>
                    <p>Breed: ${player.breed}</p>
                    <p>Player Status: ${player.status}</p>
                    <img src="${player.imageUrl}"></p>
                    <p>Created: ${player.createdAt}</p>
                    <p>Last Update: ${player.updatedAt}</p>
                    <p>Team: ${player.teamId} </p>
                    <button class='backButton' id="backButton">Back to the Roster</button>
                    <button class="delete-button" id="delete-button" data-id="${player.id}">Delete</button>
        `;

        const backButton = playerContainer.querySelector(".backButton");
        backButton.addEventListener("click", async (evt) => {
          event.preventDefault();

          const allPlayers = await fetchAllPlayers();
          renderAllPlayers(allPlayers);
        });

        // delete player
        const deleteButton = playerContainer.querySelector(".delete-button");
        deleteButton.addEventListener("click", async (event) => {
          // your code here
          if (confirm("Are you sure?")) {
            event.preventDefault(await removePlayer(player.id));
            init();
          } else {
            
          }
          

          //playersElement.appendChild(deleteButton);
        });
      });

      playersElement.appendChild(detailsButton);
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};
/**
 * It fetches all Teams from the API and returns them
 *
 * @returns An arry of objects with the teams
 */
const fetchAllTeams = async () => {
  try {
    const response = await fetch(APIURLTEAMS);
    const teams = await response.json();

    return teams;
  } catch (err) {
    console.error("Uh oh, trouble fetching Teams!", err);
  }
};
function renderSelectTeams(teams) {
  try {
    let render = `<select name="teamid" id="teamid">
    `;
    for (const t of teams.data.teams) {
      render =
        render +
        `<option value="${t.id}">${t.id}</option>
      `;
    }

    render = render + "</select>";
    return render;
  } catch (error) {
    `Whoops, trouble rendering teams  `, err;
  }
}
/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

//   createNewPlayer();
const addPlayerButton = document.getElementById("addPlayer");

addPlayerButton.addEventListener("click", async (event) => {
  event.preventDefault();
  addNewPlayerForm();
});
const addNewPlayerForm = async () => {
  let teams = "";
  let obtTeams = await fetchAllTeams();
  teams = renderSelectTeams(obtTeams);
  playerContainer.innerHTML = ``;
  newPlayerFormContainer.innerHTML =
    `

    <form class="new-player-form">
      <h2 class="subTitle">Create New Player</h2>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" placeholder="Name" required>
      </div>
      <div class="form-group">
        <label for="breed">Breed</label>
        <input type="text" id="breed" name="breed" placeholder="Breed" required>
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <select name="status" id="status" required>
          <option value="field">Field</option>
          <option value="bench">Bench</option> 
        </select>
      </div>
      <div class="form-group">
        <label for="imageUrl">Image URL</label>
        <input type="text" id="imageUrl" name="imageUrl" placeholder="Image URL" required>
      </div>
      <div class="form-group">
        <label for="teamid">TeamID</label>
        ${teams}
      </div>
      <button type="submit">Add Player</button>

    </form>
    `;
    let form = newPlayerFormContainer.querySelector("form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      let newPlayerData = {
        name: form.name.value,
        breed: form.breed.value,
        status: form.status.value,
        imageUrl: form.imageUrl.value,
        teamId: form.teamid.value,
      };
      await addNewPlayer(newPlayerData);
      newPlayerFormContainer.innerHTML = ``;
  
      const newPlayer = await fetchAllPlayers();
      renderAllPlayers(newPlayer);
  
      form.name.value = "";
      form.breed.value = "";
      form.status.value = "";
      form.imageUrl.value = "";
      form.teamid.value = "";
    });
  };
  // generate team page
  function generateTeamListPage(teams) {
    const teamListContainer = document.getElementById('all-players-container');
    teamListContainer.innerHTML = '';
  
    const header = document.createElement('h1');
    header.innerText = 'Teams';
    teamListContainer.appendChild(header);
  
    const teamList = document.createElement('ul');
    teamList.classList.add('team-list');
    teamListContainer.appendChild(teamList);
  
    teams.forEach((team) => {
      const teamItem = document.createElement('li');
      const teamLink = document.createElement('a');
      teamLink.href = `#${team.id}`;
      teamLink.innerText = `Team ${team.id}`;
      teamItem.appendChild(teamLink);
      teamList.appendChild(teamItem);
  
      teamLink.addEventListener('click', async (event) => {
        event.preventDefault();
        const playersResponse = await fetchAllPlayers();
        const players = playersResponse.data.players;
        const teamPlayers = players.filter((player) => player.teamId === team.id);
        const playerNames = teamPlayers.map((player) => player.name);
        alert(playerNames.join(', '));
      });
    });
  }

// Handle Show Teams link click event
function handleShowTeamsClick(event) {
  event.preventDefault();
  fetch(APIURLTEAMS)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        generateTeamListPage(data.data.teams);
      } else {
        console.log('Error: Unable to fetch teams data');
      }
    })
    .catch((error) => {
      console.error('Error fetching teams data:', error);
    });
}

// Add event listener for Show Teams link click
const showTeamsLink = document.getElementById('showTeams');
showTeamsLink.addEventListener('click', handleShowTeamsClick);



  const init = async () => {
    const playersResponse = await fetchAllPlayers();
    renderAllPlayers(playersResponse);
  };
  
  init();