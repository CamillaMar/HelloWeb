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
    if(product.length === 0 ){
        console.log("L'array dei prodotti risulta vuoto");
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
        Object.keys(products[0]).forEach(key => {
            const td = document.createElement("td");
            td.textContent = product[key];
            bodyRow.appendChild(td);  
        });
        tbody.appendChild(bodyRow);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
})