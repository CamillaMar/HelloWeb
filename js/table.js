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
const button = document.querySelector("button");
button.addEventListener("click", ()=>{
    const table = document.querySelector("table");
    table.innerHTML = "";
    const newThead = document.createElement("thead");
    if(products.length === 0){
        console.log("errore: l'array dei prodotti risulta vuoto");
        return;
    }
    const htr = document.createElement("tr");
    const keys = Object.keys(products[0]);
    keys.forEach(attribute => {
        const newTh = document.createElement("th");
        newTh.innerText = attribute;
        htr.appendChild(newTh);
    });
    newThead.appendChild(htr);
    table.appendChild(newThead);

    const newTBody = document.createElement("tbody");
    products.forEach(product => {
        const newTr = document.createElement("tr");
        newTr.classList.add("borderTr");
        const values = Object.values(product);
        values.forEach(data => {
            const newTd = document.createElement("td");
            newTd.innerText = data;
            newTr.appendChild(newTd);
        });
        newTBody.appendChild(newTr);
    });
    table.appendChild(newTBody);
});
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
button.addEventListener("click", ()=>{
    renderTable(products, "tableContainer");
});

