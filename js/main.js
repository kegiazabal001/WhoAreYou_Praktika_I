import { folder, leftArrow } from "./fragments.js";
import { fetchJSON } from "./loaders.js";
import { setupRows, initializeGame } from "./rows.js";            //milestone2-koa
import { autocomplete } from "./autocomplete.js";              //milestone3-koa
import { getGame, updateGame } from "./stats.js";


let game = getGame("game"); 

function differenceInDays(date1) {
  // YOUR CODE HERE
  let gaur = new Date();
  let difference = Math.abs(gaur.getTime() - date1.getTime());
  difference = Math.floor(difference / (1000 * 3600 * 24));
  return difference;
}

let difference_In_Days = differenceInDays(new Date("08/18/2022"));

window.onload = function () {
  document.getElementById(
    "gamenumber"
  ).innerText = difference_In_Days.toString();
  document.getElementById("back-icon").innerHTML = folder + leftArrow;
  setupRows(game);
};

function getSolution(players, solutionArray, difference_In_Days) {
  // YOUR CODE HERE 
  if (difference_In_Days >= solutionArray.length) {
    difference_In_Days = difference_In_Days % solutionArray.length;
  }

  let id = solutionArray[difference_In_Days - 1].id;
  let solution = players.filter(player => player.id == id)[0];

  return solution;
}

Promise.all([fetchJSON("fullplayers"), fetchJSON("solution")]).then(
  (values) => {

    let solution;

    [game.players, solution] = values;

    game.solution = getSolution(game.players, solution, difference_In_Days);

    document.getElementById(
      "mistery"
    ).src = `https://playfootball.games/media/players/${game.solution.id % 32
    }/${game.solution.id}.png`;

    /* Milestone2 ariketakoa:
    // YOUR CODE HERE
    let addRow = setupRows(game);
    // get myInput object...
    let myInput = document.getElementById("myInput");
    // when the user types a number an press the Enter key:
    document.addEventListener("keydown", function (event) {
      if (event.key == "Enter") {
        let myInputValue = myInput.value;
        addRow(myInputValue);
      }
    });
    */

    // Milestone3 ariketakoa:
    autocomplete(document.getElementById("myInput"), game);
    
    updateGame('game', game); 

    let myInput = document.getElementById("myInput");
    myInput.addEventListener("click", function (event) {
      myInput.value = "";
    });

  if(game.guesses.length > 0){
    initializeGame(getGame('game'));
  }

    
});