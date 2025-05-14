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
    const newThead = document.createElement("thead");
    const keys = Object.keys(products[0]);
    keys.forEach(attribute => {
        const newTh = document.createElement("th");
        newTh.innerText = attribute;
        newThead.appendChild(newTh);
    });
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