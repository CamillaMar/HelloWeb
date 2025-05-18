
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

const button = document.createElement("button");
button.textContent = "Render table";
button.addEventListener("click", () => renderTable(products));
document.body.appendChild(button);

renderTable = function (data) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");

    const headTr = document.createElement("tr");
    Object.keys(products[0]).forEach(key => {
        const th = document.createElement("th");
        th.textContent = key;
        headTr.appendChild(th);
    });
    thead.appendChild(headTr);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    products.forEach(product => {
        const tr = document.createElement("tr");
        Object.entries(product).forEach(([key, value]) => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    document.body.appendChild(table);
}