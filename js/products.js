document.addEventListener("DOMContentLoaded", () => {
	const b1 = document.querySelector("#esercizio-1");
	const b2 = document.querySelector("#esercizio-2");

	b1.addEventListener("click", () => {
		loadData("topN", 10, "GET");
	});

	b2.addEventListener("click", () => {
		const input = document.querySelector("input");
		loadData2("categoryId", input.value, "POST");
	});

});

async function loadData(parameter, value, requestType){
    try {
        const url = getCorrectUrl(parameter, value, requestType);
        const fetchOptions = getFetchOptions(parameter, value, requestType);

        const response = await fetch(url, fetchOptions);
        if(!response.ok){
            throw new Error("http error "+ response.status);
        }
        const data = await response.json();
        renderTable(data, "tablecontainer");
    } catch(error){
        alert("errore di comunicazione con il server " + error);
    }
}


async function loadData2(parameter, value, requestType){
    try {
        const url = "http://localhost:8080/api/product";
        const queryString = `?${parameter}=${value}`;
		const urlGet = url + queryString;
        const response = await fetch(urlGet);
        if(!response.ok){
            throw new Error("http error "+ response.status);
        }
        const data = await response.json();

        if(data.length === 0){ 
            data.push(await createStandardProduct(url, value, requestType));
            renderTable(data, "tablecontainer");
            return;
        }

        debugger;

        let totCost = 0;
        data.forEach(product => {
            totCost += product.cost;
        });
        if(data.length > 2  && totCost >= 200){
            renderTable(data, "tablecontainer");
        }
        data.push(await createStandardProduct(url, value, requestType));
        renderTable(data, "tablecontainer");
    } catch(error){
        alert("errore di comunicazione con il server " + error);
    }
}
async function createStandardProduct(url, value, requestType){
    const requestBody = {
        productName: "Standard_Product",
        supplierId: 1,
        categoryId: value,
        unitPrice: 100,
        discontinued: false
    };

    const fetchOptions = {
        method: requestType,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    };
    response = await fetch(url, fetchOptions);
                
    if(!response.ok){
        throw new Error("http error "+ response.status);
    }
    
    return await response.json();
}

function getCorrectUrl(parameter, value, requestType){
    let url = "http://localhost:8080/api/product";
    if(requestType === "GET"){
        const queryString = `?${parameter}=${value}`;
		url += queryString;
    }
    return url;
}

function getFetchOptions(parameter, value, requestType){
    const fetchOptions = {
        method: "GET"
    };

    if (requestType === "POST") {
        fetchOptions.method = "POST";
        fetchOptions.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const requestBody = {
            [parameter]: value
        };
        fetchOptions.body = JSON.stringify(requestBody);
    }
    return fetchOptions;
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

    // table.classList.add("table");
    // table.classList.add("table-striped");
    // table.classList.add("table-dark");

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
