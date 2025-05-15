document.addEventListener("DOMContentLoaded", () => {
	const b1 = document.querySelector("#esercizio-1");
	const b2 = document.querySelector("#esercizio-2");
	const b3 = document.querySelector("#esercizio-3");

	b1.addEventListener("click", () => {
		loadData("topN", 10, "GET");
	});

	b2.addEventListener("click", () => {
		const input = document.querySelector("input");
		loadData("categoryId", input.value, "POST");
	});

	b3.addEventListener("click", () => {
		//loadData();
	});
});

async function loadData(parameter, value, requestType){
    try {
        let url = "http://localhost:8080/api/product";
        if(requestType === "GET"){
            const queryString = `?${parameter}=${value}`;
		    url += queryString;
        }
        if(requestType === "POST"){
            url += "/category";
        }
        const response = await fetch(url, {
            method: requestType,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({parameter:value})//getJSONBody(requestType, value)
        });
        if(!response.ok){
            throw new Error("http error "+ response.status);
        }
        const data = await response.json();
        renderTable(data, "tablecontainer");
    } catch(error){
        alert("errore di comunicazione con il server " + error);
    }
}

function getJSONBody(requestType, value){
    if(requestType === "GET"){
        return null;
    }
    return JSON.stringify(value);
}

function renderTable(data, containerId){
    const container = document.querySelector(`#${containerId}`);
    if(!container){
        console.log("l'elemento contenitore non esiste");
        return;
    }
    if(data.length === 0){
        console.log("L'array di dati è vuoto");
        return;
    }
    container.innerHTML = "";
    const table = document.createElement("table");
    const tHead = table.createTHead();
    const headerRow = tHead.insertRow();
    const headers = Object.keys(data[0]);
    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
        headerRow.appendChild(th);
    });
    const tBody = table.createTBody();
    data.forEach(item =>{
        const row = tBody.insertRow();
        headers.forEach(key => {
            const cell = row.insertCell();
            cell.textContent = item[key];       
        });
    });
    container.appendChild(table);
}
