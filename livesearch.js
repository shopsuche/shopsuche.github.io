async function livesearch() {
    const searchtext = document.getElementById("search").value
    if (searchtext != null) {
        const searchurl = new URL("/", "https://vortexlab.de")
        searchurl.searchParams.set("search", searchtext)
        fetch(searchurl).then(function (response) {
            return response.json()
        })
        .then(function (body) {
            const resulttable = document.getElementById("resulttable")
            while (resulttable.rows.length > 1) {
                resulttable.deleteRow(-1);
            }
            if (body != null && body.length > 0) {
                for (i = 0; i < body.length; i++) {
                    let row = resulttable.insertRow(i+1)

                    let namep = document.createElement("P")
                    namep.innerHTML = body[i].name
                    row.insertCell(0).appendChild(namep)

                    let link = document.createElement("A")
                    link.href = body[i].url
                    link.innerHTML = body[i].url
                    link.target = "_blank"
                    let linkp = document.createElement("P")
                    row.insertCell(1).appendChild(linkp).appendChild(link)

                    let tagp = document.createElement("P")
                    tagp.innerHTML = body[i].tags
                    row.insertCell(2).appendChild(tagp)
                }
            }
        })
        .catch(function (error) {
            console.log("Scheinbar haben wir Probleme mit unserem Backend. Wir kümmern uns bestimmt darum.")
        })
    }
}