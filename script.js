
function kargatu(){

    let datubase = fetch("../services/competitions.json").then(res => res.json()).then(data => console.log(data))
    console.log(datubase);

    /*
    aurrera.addEventListener('click', (event) => {
        if (indizea < datubasea.length-1)
            indizea++
        eremuakBete()
    })
    atzera.addEventListener('click', (event) => {
        if (indizea > 0)
            indizea--
        eremuakBete()
    })

    bilatu.addEventListener('click', async (event) => {
        let isbnLag = isbn.value
        let i = datubasea.findIndex(lib => lib.isbn == isbnLag)
        if(i != -1) { //liburua datubasean badago
                indizea = i
        }else{ //Datubasean ez dago liburu hori
            let berria = await fetch("https://openlibrary.org/api/books?bibkeys=ISBN:"+isbnLag+"&format=json&jscmd=details").then(r => r.json())
            
            let libBerria = berria['ISBN:'+isbnLag]
            let book = {
                "izenburua": libBerria.details.title,
                "egilea": libBerria.details.authors[0].name,
                "data": libBerria.details.publish_date,
                "isbn": isbnLag,
                "filename": `${libBerria.details.covers[0]}-M.jpg`
            }
            console.log(berria)
            datubasea.push(book)
            indizea = datubasea.length-1
            eremuakBete()

        }
        eremuakBete()
        
    })*/
}

window.onload = kargatu;

