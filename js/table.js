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
        th.textContent= header.charAt(0).toUpperCase() + header.slice(1);
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
const btn = document.querySelector("button");
btn.addEventListener("click", ()=>{
    //renderTable(products, "tablecontainer");
    loadData();
});

function loadData(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "data/products.json", true);
    xhr.onload = function(){
        if(xhr.status === 200){
            const jsonText = xhr.responseText;
            const productArray = JSON.parse(jsonText);
            renderTable(productArray, "tablecontainer");
        } else {
            alert("Errore nel caricamento dei dati "+ xhr.status);
        }
    };
    xhr.onerror = function(){
        alert("Errore di comunicazione con il server");
    };
    xhr.send();
}