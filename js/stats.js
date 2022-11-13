export { updateStats, getStats, initState }

let initState = function (what, solutionId) {
    // YOUR CODE HERE
    let emaitza = [];

    let state = localStorage.getItem(what);
    if (state) {
        emaitza.push(JSON.parse(state));
    } else {
        state = {
            guesses: [],
            solution: solutionId
        }
        localStorage.setItem('WAYgameState', JSON.stringify(state));
        emaitza.push(JSON.parse(state));
    }

    emaitza.push(function (guess) {
        let p = JSON.parse(localStorage.getItem('WAYgameState'));
        p.guesses.push(guess);
        localStorage.setItem('WAYgameState', JSON.stringify(p));
    });

    return emaitza;
}

function successRate(e) {
    let sRate = (e.totalGames - e.gamesFailed) / e.totalGames;
    return sRate*100;
}

let getStats = function (what) {
    let state = localStorage.getItem(what);
    if (state) {
        state = JSON.parse(state);
    } else {   // estatistikarik gordeta ez badago localStorage-an
        state = {
            winDistribution: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            gamesFailed: 0,
            currentStreak: 0,
            bestStreak: 0,
            totalGames: 0,
            successRate: 0
        }
        localStorage.setItem(what, JSON.stringify(state));
    }
    return state;
};


function updateStats(t) {
    if (t >= 7) {   // partida galdu bada
        let state = JSON.parse(localStorage.getItem("gameStats"));
        state.gamesFailed++;
        state.currentStreak = 0;
        state.totalGames++;
        state.successRate = successRate(state);
        state.winDistribution[8]++;
        localStorage.setItem("gameStats", JSON.stringify(state));
    } else {    // partida irabazi bada
        let state = JSON.parse(localStorage.getItem("gameStats"));
        state.currentStreak++;
        state.totalGames++;
        state.successRate = successRate(state);
        state.winDistribution[t]++;
        if (state.currentStreak > state.bestStreak) {
            state.bestStreak = state.currentStreak;
        }
        localStorage.setItem("gameStats", JSON.stringify(state));
    }
};


let gamestats = getStats('gameStats');



