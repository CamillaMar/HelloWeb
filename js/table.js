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

const table = document.querySelector("#productTable");
const button = document.querySelector("button");
console.log(Object.keys(products[0]));

button.addEventListener("click",() =>{
    table.replaceChildren()
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    Object.keys(products[0]).forEach(key => {
        const th = document.createElement("th");
        th.textContent = key;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);    

    const tbody = document.createElement("tbody");
    products.forEach(product =>{
        const trBody = document.createElement("tr");
        Object.keys(products[0]).forEach(key=>{
            const td = document.createElement("td");
            td.textContent = product[key];
            trBody.appendChild(td);
        });
        tbody.appendChild(trBody);
    });
    table.appendChild(tbody);
    console.log(table);
});




