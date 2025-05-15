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
    table.innerHTML="";
    const newThead = document.createElement("thead");
    const newRow = document.createElement("tr");
    const keys = Object.keys(products[0]);
    keys.forEach(attribute => {
        const newTh = document.createElement("th");
        newTh.innerText = attribute;
        newRow.appendChild(newTh);
    });
    newThead.appendChild(newRow);
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
//2* modo per farlo
function renderTable(data, containerId){
    const container = document.querySelector("#"+containerId);
    if(!container){ //not null e not undefined è true
        console.log("l elemento non esiste");
        return;
    }
    if(data.length === 0){
        console.log("l array di dati è vuoto");
    }
    const table = document.createElement("table");
    const tHead = table.createTHead(); //crea un table  e lo attacca alla tabella
    const headerRow = tHead.insertRow(); //crea una riga  e lo attacca alla header
    const headers = Object.keys(data[0]);
    headerRow.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
        headerRow.appendChild(th);
    });
    const tBody = table.createTBody();
    data.forEach(item => {
        const row = tBody.insertRow();
        headers.forEach(key =>{
            const cell = row.insertCell();
//oggetto js come una hashmap, il nome della proprieta che sto leggendo puo essere usato per recuperare in modo dinamico il valore associato a quel nome
            cell.textContent = item[key]; 
        });
    });
    container.appendChild(table);
}
function loadData(){
    const xhr = new HTMLHttpRequest()
}