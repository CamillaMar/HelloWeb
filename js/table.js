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
];

const b = document.querySelector("button");
const table = document.querySelector("table");
b.addEventListener("click", function(){
    const headerContainer = document.createElement("thead");
    const headerRow = document.createElement("tr");
    Object.keys(products[0]).forEach(key => {
        let th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
    }); 
    headerContainer.appendChild(headerRow);
    
    const bodyContainer = document.createElement("tbody");
    products.forEach(function(product) {
        let bodyRow = document.createElement("tr");
        Object.keys(product).forEach(key => {
            const td = document.createElement("td");
            td.textContent = product[key];
            bodyRow.appendChild(td);
        });
        bodyContainer.appendChild(bodyRow);
    });
    
    table.appendChild(headerContainer);
    table.appendChild(bodyContainer);
});
