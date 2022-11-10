export { initState }

let initState = function (what, solutionId) {
    // YOUR CODE HERE
    let emaitza = [];
    /*
    { "guesses" : [],
    "solution": IDa}
    */

    let state = localStorage.getItem(what);
    if (state) {
        emaitza.push(state);
    }

    emaitza.push(function (guess) {
        JSON.parse(state).guesses.push(guess);
    });

    localStorage.setItem(what, state);
    return emaitza;
}



