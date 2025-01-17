// YOUR CODE HERE :  
// .... stringToHTML ....
import { stringToHTML } from './fragments.js';
// .... setupRows .....
export { setupRows, initializeGame };
import { higher, lower, stats, headless, toggle } from './fragments.js';
import { initState, updateStats , updateGame } from './stats.js';

const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate', 'number']
const flags = { 564: 'es1', 8: 'en1', 82: 'de1', 384: 'it1', 301: 'fr1' };

let initializeGame;

// From: https://stackoverflow.com/a/7254108/243532
function pad(a, b) {
    return (1e15 + a + '').slice(-b);
}

let setupRows = function (game) {

    let [state, updateState] = initState('WAYgameState', game.solution.id)

    function leagueToFlag(leagueId) {
        // YOUR CODE HERE
        let flag = flags[leagueId];
        return flag;
    }

    function getAge(dateString) {
        // YOUR CODE HERE
        let gaur = new Date();
        let date = new Date(dateString);
        let difference_In_Time = Math.abs(gaur - date);
        let difference_In_Days = Math.floor(difference_In_Time / (1000 * 3600 * 24));
        let difference_In_Years = Math.floor(difference_In_Days / 365);
        return difference_In_Years;
    }

    let check = function (theKey, theValue) {
        // YOUR CODE HERE
        let erantzuna = 'incorrect';
        if (theKey == 'birthdate') {
            let difference = getAge(theValue) - getAge(game.solution[theKey]);
            if (difference == 0) {
                erantzuna = 'correct';
            } else if (difference < 0) {
                erantzuna = 'higher';
            } else {
                erantzuna = 'lower';
            }
        } else if(theKey == 'number'){
            let difference = theValue - game.solution[theKey];
            if (difference == 0) {
                erantzuna = 'correct';
            } else if (difference < 0) {
                erantzuna = 'higher';
            } else {
                erantzuna = 'lower';
            }

        } else {
            if (theValue == game.solution[theKey]) {
                erantzuna = 'correct';
            } else {
                erantzuna = 'incorrect';
            }
        }
        return erantzuna;
    }

    function unblur(outcome) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                document.getElementById("mistery").classList.remove("hue-rotate-180", "blur")
                document.getElementById("combobox").remove()
                let color, text
                if (outcome == 'success') {
                    color = "bg-blue-500"
                    text = "Awesome"
                } else {
                    color = "bg-rose-500"
                    text = "The player was " + game.solution.name
                }
                document.getElementById("picbox").innerHTML += `<div class="animate-pulse fixed z-20 top-14 left-1/2 transform -translate-x-1/2 max-w-sm shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${color} text-white"><div class="p-4"><p class="text-sm text-center font-medium">${text}</p></div></div>`
                resolve();
            }, "2000")
        })
    }

    function showStats(timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                document.body.appendChild(stringToHTML(headless(stats())));
                document.getElementById("showHide").onclick = toggle;
                bindClose();
                resolve();
            }, timeout)
        })
    }

    function bindClose() {
        document.getElementById("closedialog").onclick = function () {
            document.body.removeChild(document.body.lastChild)
            document.getElementById("mistery").classList.remove("hue-rotate-180", "blur")
        }
    }

    function setContent(guess) {
        return [
            `<img src="https://playfootball.games/who-are-ya/media/nations/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
            `<img src="https://playfootball.games/media/competitions/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
            `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
            `${guess.position}`,
            `${getAge(guess.birthdate)}  ${check('birthdate', guess.birthdate) == 'higher' ? higher : check('birthdate', guess.birthdate) == 'lower' ? lower : ''}`,
            `${'#' + guess.number}  ${check('number', guess.number) == 'higher' ? higher : check('number', guess.number) == 'lower' ? lower : ''}`,
        ]
    }

    function showContent(content, guess) {
        let fragments = '', s = '';
        for (let j = 0; j < content.length; j++) {
            s = "".concat(((j + 1) * delay).toString(), "ms")
            fragments += `<div class="w-1/5 shrink-0 flex justify-center ">
                            <div class="mx-1 overflow-hidden w-full max-w-2 shadowed font-bold text-xl flex aspect-square rounded-full justify-center items-center bg-slate-400 text-white ${check(attribs[j], guess[attribs[j]]) == 'correct' ? 'bg-green-500' : ''} opacity-0 fadeInDown" style="max-width: 60px; animation-delay: ${s};">
                                ${content[j]}
                            </div>
                         </div>`
        }

        let child = `<div class="flex w-full flex-wrap text-l py-2">
                        <div class=" w-full grow text-center pb-2">
                            <div class="mx-1 overflow-hidden h-full flex items-center justify-center sm:text-right px-4 uppercase font-bold text-lg opacity-0 fadeInDown " style="animation-delay: 0ms;">
                                ${guess.name}
                            </div>
                        </div>
                        ${fragments}`

        let playersNode = document.getElementById('players')
        playersNode.prepend(stringToHTML(child))
    }

    function resetInput() {
        // YOUR CODE HERE
        document.getElementById("myInput").value = "";
        let input = "Guess " + (game.guesses.length + 1) + " of 8";
        document.getElementById("myInput").value = input;
    }

    function gameEnded(lastGuess) {
        // YOUR CODE HERE
        return (lastGuess == game.solution.id) || (game.guesses.length == 8);
    }

    let getPlayer = function (playerId) {
        // YOUR CODE HERE
        let player = game.players.find(player => player.id == playerId);
        return player;
    }

    let success = function () {
        let input = document.getElementById("myInput");
        input.value = "Winner!";
        input.disabled = true;
        unblur('success');
        showStats(2000);
    }

    let gameOver = function () {
        let input = document.getElementById("myInput");
        input.value = "Game Over";
        input.disabled = true;
        unblur('fail');
        showStats(2000);
    }

    resetInput();


    initializeGame = function (game) {
        resetInput();
        for (let guess of game.guesses) {
            guess = game.players.find(player => player.id == guess);
            let content = setContent(guess)
            showContent(content, guess)
            if (gameEnded(guess.id)) {                
                if (guess.id == game.solution.id) {
                    unblur('success');
                }
        
                if (game.guesses.length == 8) {
                    unblur('fail');
                }
            }
        }
    }

    return /* addRow */ function (playerId) {

        let guess = getPlayer(playerId)

        let content = setContent(guess)

        game.guesses.push(playerId)
        updateState(playerId)
        updateGame('game', game)
        resetInput();

        if (gameEnded(playerId)) {
            updateStats(game.guesses.length -1);
            updateGame('game', game);

            if (playerId == game.solution.id) {
                success();
            }

            if (game.guesses.length == 8) {
                gameOver();
            }

            let interval = setInterval(function () {
                const now = new Date();
                //"23:59:59"
                const hours = 23 - now.getHours();
                const minutes = 59 - now.getMinutes();
                const seconds = 59 - now.getSeconds();
                let next = document.getElementById("nextPlayer");
                next.innerHTML = "Next player in " + hours + ":" + minutes + ":" + seconds;
            }, 1000);
        }

        showContent(content, guess)
    }
}


