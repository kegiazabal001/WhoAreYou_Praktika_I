export { fetchJSON };

async function fetchJSON(what) {

    // YOUR CODE HERE
    let r = await fetch(`./json/${what}.json`).then(response => response.json());
    return r;
}
