const products = [
    {
        productId: 1,
        productName: "Bicicletta",
        itemPrice: 200.00,
        categoryName: "Sport"
    },
    {
        productId: 2,
        productName: "Scii",
        itemPrice: 150.00,
        categoryName: "Sport"
    },
    {
        productId: 3,
        productName: "Tavola da Surf",
        itemPrice: 300.00,
        categoryName: "Sport"
    }
];

const b = document.querySelector("button");
let isAdded = false;

b.addEventListener("click", () => {
    if(isAdded){
        return;
    }
    isAdded = true;

	const tbody = document.querySelector("tbody");
	products.forEach((product) => {
	    /* console.log(product); */
		const tr = document.createElement("tr");
        
		Object.keys(product).forEach((key) => {
			const td = document.createElement("td");
            
			if(key == "productId") {
				td.classList.add("hide");
				/* td.style = "display: none"; */ //implementato in CSS
			}
			td.textContent = product[key];
			tr.appendChild(td);
		});
		tbody.appendChild(tr);
	});
});
function renderTable(data, containerId) {
	const container = document.querySelector(`#${containerId}`);
	if(!container) {
		console.log("L'elemento contenitore non esiste");
		return;
	}
	if(data.length === 0) {
		console.log("L'array di dati è vuoto");
		return;
	}
	container.innerHTML = "";
	const table = document.createElement("table");
	const tHead = table.createTHead(); //Ci evita un po' di lavoro creando il thead della tabella
	const headerRow = tHead.insertRow();
	const headers = Object.keys(data[0]);
	headers.forEach(header => {
		const th = document.createElement("th");
		th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
		headerRow.appendChild(th);
	});
	const tBody = table.createTBody();
	data.forEach(item => {
		const row = tBody.insertRow();
		headers.forEach(key => {
			const cell = row.insertCell();
			cell.textContent = item[key];
		});
	});
	container.appendChild(table);
}
b.addEventListener("click", (evt) => { 
	//renderTable(products, "tableContainer");
	loadData();
});

function loadData() { //AJAX
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "data/products.json", true); //false per il sincrono, perchè con true potrebbe funzionare o meno in base a quanto sia veloce a fare la richiesta
	xhr.onload = function() {
		if(xhr.status === 200) {
			const jsonText = xhr.responseText;
			const productArray = JSON.parse(jsonText);
			/* renderTable(productArray, "tablecontainer"); */
			if(productArray.length >= 3) {
				const xhr2 = new XMLHttpRequest();
				xhr2.open("GET", "data/specificProduct3.json");
				xhr2.onload = function() {
					if(xhr2.status === 200) {
						
					} else {
						alert("Errore nel caricamento del prodotto specifico");
					}
				};
				xhr2.onerror = function() {
					alert("Errore nella comunicazione network prodotto specifico");
				}
			}
		} else {
			alert("Errore nel caricamento dei dati " + xhr.status);
		}
	};
	xhr.onerror = function() {
		alert("Errore di comunicazione con il server");
	};
	xhr.send();
	/* try {
		xhr.send();
		if(xhr.status === 200) {
			const jsonText = xhr.responseText;
			const productArray = JSON.parse(jsonText);
			renderTable(productArray, "tablecontainer");
		} else {
			alert("Errore nel caricamento dei dati " + xhr.status);
		}
	} catch(e) {
		alert("network error " + e);
	} */
}

function loadData2() { //FETCH
	const pr = fetch("data/products.json"); //La fetch è sempre asincrona, e ritorna una promessa del risultato
	pr.then(response => {
		if(!response.ok) {
			throw new Error("http error " + response.status);
		}
		/* const prData = response.json(); //Non mi ritorna i dati parsati ma una promessa dei dati parsati
		return prData; */
		return response.json();
	}).then(data => { //Riceve i dati già parsati, il risultato della promessa precedente, prData
		renderTable(data, "tablecontainer");
	}).catch(error => {
		alert("Errore di comunicazione con il server " + error);
	});
}

async function loadData3() { //ASYNC AWAIT (riscritto dal compilatore)
	try {
		const response = await fetch("data/products.json");
		if(!response.ok) {
			throw new Error("http error " + response.status);
		}
		const data = await response.json();
		renderTable(data, "tablecontainer");
	} catch(error) {
		alert("Errore di comunicazione con il server " + error);
	}
}
