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

const table = document.querySelector("table");
b.addEventListener("click", function(){
    table.replaceChildren();

    if(products.length === 0){
        console.log("L'array dei prodotti è vuoto");
        return;
    }

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    Object.keys(products[0]).forEach(key => {
            const th = document.createElement("th");
            th.textContent= key;
            headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    
    const tbody = document.createElement("tbody");
    products.forEach(product => {
        const bodyRow = document.createElement("tr");
        // Object.keys(products[0]).forEach(key => {
        //     const td = document.createElement("td");
        //     td.textContent = product[key];
        //     bodyRow.appendChild(td);  
        // });
        Object.values(product).forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            bodyRow.appendChild(td); 
        })
        tbody.appendChild(bodyRow);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
})

function renderTable(data, containerId){
    const container = document.querySelector(`#${containerId}`);
    if(!container){
        console.log("L'elemento contenitore non esiste");
        return;
    }
    if(data.length == 0){
        console.log("L'array di dati è vuoto");
        return;
    }
    container.innerHTML = '';
    const table = document.createElement("table");
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    const headers = Object.keys(data[0]);
    headers.forEach(header => {
        const th = document.createElement("th");
        let convertedString = "";
        for (let char of header) {
            convertedString += addSpace(char);
        }
        th.textContent = convertedString;
        // th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
        headerRow.appendChild(th);
    })

    const tbody = table.createTBody();
    data.forEach(item =>{
        const row = tbody.insertRow();
        headers.forEach(key => {
            const cell = row.insertCell();
            cell.textContent = item[key];
        })
    })

    container.appendChild(table);
}


b.addEventListener("click", () => {
    fetchData();
});

function addSpace(character) {
    // if (character === 
    // character.toUpperCase()) {
    //     return ' ' + character;
    // } else {
    //     return character;
    // }
    return (/[A-Z]/.test(character)) ? ' ' + character : character;
}

function loadData(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "./data/products.json", true);
    xhr.onload = function(){
        if(xhr.status === 200){
            const jsonText = xhr.responseText;
            const productArray = JSON.parse(jsonText);
            renderTable(products, "tableContainer");
        } else {
            alert("Errore nel caricamento dei dati " + xhr.status);
            console.error("Errore nel caricamento dei dati " + xhr.status);
        }
    };
    xhr.onerror = function(){
        alert("Errore di comunicazione col server");
    };
    xhr.send();
}

// function loadDataSync(){
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", "./data/products.json", false);
//     try{
//         xhr.send();
//         if(xhr.status === 200){ 
//             const jsonText = xhr.responseText;
//             const productArray = JSON.parse(jsonText);
//             renderTable(products, "tableContainer");
//         } else {
//             alert("Errore nel caricamento dei dati " + xhr.status);
//             console.error("Errore nel caricamento dei dati " + xhr.status);
//         }
//     }catch(e){
//         alert("Errore di comunicazione col server");
//     }
// }

function fetchData(){
    const pr = fetch("./data/products.json");
    pr.then(response => {
        if(!response.ok){
            throw new Error("http error " + response.status);
        }
        return response.json();;
    }).then(data => {
        renderTable(products, "tableContainer");
    }).catch(error => {
        alert("errore di comunicazionr con il server " + error);
    });
}

async function awaitLoadData(){
    try{
        const response = await fetch("./data/products.json");
        if(!response.ok){
            throw new Error("http error " + response.status);
        }
        const data = await response.json();
        renderTable(data, "tableContainer");
    } catch(error){
        alert("errore di comunicazionr con il server " + error);
    }
}