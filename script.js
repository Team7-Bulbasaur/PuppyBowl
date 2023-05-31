const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2302-ACC-PT-WEB-PT-C";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

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
    const response = await fetch(`${APIURL}/${playerId}`)
    const singlePlayer = await response.json()
    return singlePlayer;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

const addNewPlayer = async (playerObj) => {
  try { 

  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

const removePlayer = async (playerId) => {
  try {
    const resp = await fetch(`${APIURL}/${playerId}`, {
      method: "DELETE"
    })
    const deletedSinglePlayer = await resp.json()
    console.log(deletedSinglePlayer)
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
const renderAllPlayers =  async (playersResponse) => {
  try {
   // console.log(playersResponse.data.players);
    let playerList = playersResponse.data.players;
    console.log(playerList);
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
                    <p>${player.updatedAt }</p>
                    <button class="details-button" data-id="${player.id}" >See Details</button>
                    <button class="delete-button" data-id="${player.id}">Delete</button>
                `;
                playerContainer.appendChild(playersElement);

      // see details
      const detailsButton = playersElement.querySelector(".details-button");
      detailsButton.addEventListener("click", async (event) => {
        // your code here
        event.preventDefault()
        const singlePlayer = await fetchSinglePlayer(player.id)
        playerContainer.innerHTML = `
                    <h2>${player.name}</h2>
                    <p>ID: ${player.id}</p>
                    <p>Breed: ${player.breed}</p>
                    <p>Player Status: ${player.status}</p>
                    <img src="${player.imageUrl}"></p>
                    <p>Created: ${player.createdAt}</p>
                    <p>Last Update: ${player.updatedAt }</p>
                    <p>Team: ${player.teamId} </p>
                    <button class='backButton' id="backButton">Back to the Roster</button>
        `

        const backButton = playerContainer.querySelector('.backButton');
        backButton.addEventListener('click', async (evt)=> {
            event.preventDefault()

            const allPlayers = await fetchAllPlayers()
            renderAllPlayers(allPlayers);
        })

      })
      playersElement.appendChild(detailsButton)

      // delete player
      const deleteButton = playersElement.querySelector(".delete-button");
      deleteButton.addEventListener("click", async (event) => {
        // your code here
        event.preventDefault (
        await removePlayer(player.id)
        );

        playersElement.appendChild(deleteButton)
        
      });
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};


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

const init = async () => {
  const playersResponse = await fetchAllPlayers();
  renderAllPlayers(playersResponse);

//   createNewPlayer();
  //renderNewPlayerForm();
};

init();