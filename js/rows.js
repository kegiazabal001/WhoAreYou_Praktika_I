// YOUR CODE HERE :  
// .... stringToHTML ....
import { stringToHTML } from './fragments.js';
// .... setupRows .....
export { setupRows };

const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate']
const flags = { 564: 'es1', 8: 'en1', 82: 'de1', 384: 'it1', 301: 'fr1' };

let setupRows = function (game) {

    // jokalariek ez dute leagueId, beraz beti null izango da atributua
    function leagueToFlag(leagueId) {
        // YOUR CODE HERE
        
        let flag = flags[leagueId];
        console.log("leageID:" + flag +', '+ leagueId);
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
            } else if (difference > 0) {
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

    function setContent(guess) {
        return [
            `<img src="https://playfootball.games/who-are-ya/media/nations/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
            `<img src="https://playfootball.games/media/competitions/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
            `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
            `${guess.position}`,
            `${getAge(guess.birthdate)}`
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

    let getPlayer = function (playerId) {
        // YOUR CODE HERE
        let player = game.players.find(player => player.id == playerId);
        return player;
    }

    return /* addRow */ function (playerId) {

        let guess = getPlayer(playerId)
        console.log(guess)

        let content = setContent(guess)
        showContent(content, guess)
    }
}
