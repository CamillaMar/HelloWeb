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
const table = document.getElementById("productTable");
const thead = document.createElement("thead");
const tbody = document.createElement("tbody");
const headerRow = document.createElement("tr");

const thId = document.createElement("th");
thId.textContent = "ID";
const thName = document.createElement("th");    
thName.textContent = "Nome";
const thPrice = document.createElement("th");
thPrice.textContent = "Prezzo";
const thCategory = document.createElement("th");
thCategory.textContent = "Categoria";
const thDelete = document.createElement("th");
thDelete.textContent = "Elimina";
const thEdit = document.createElement("th");
thEdit.textContent = "Modifica";


b.addEventListener("click", function() {
products.forEach(product => {
    const bodyRow = document.createElement("tr");
    const tdId = document.createElement("td");
    const tdName = document.createElement("td");
    const tdPrice = document.createElement("td");
    const tdCategory = document.createElement("td");
    const tdDelete = document.createElement("td");
    const tdEdit = document.createElement("td");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    deleteButton.textContent = "Delete Item";
    editButton.textContent = "Modifica";

    tdId.textContent = product.productId
    tdName.textContent = product.productName;
    tdPrice.textContent = product.itemPrice;
    tdCategory.textContent = product.categoryName;

    deleteButton.addEventListener("click", function() {
    });
  
   
    bodyRow.appendChild(tdId);
    bodyRow.appendChild(tdName);
    bodyRow.appendChild(tdPrice);
    bodyRow.appendChild(tdCategory);
    tbody.appendChild(bodyRow);
    bodyRow.appendChild(tdDelete);
    tdDelete.appendChild(deleteButton);
});
headerRow.append(thId, thName, thPrice, thCategory, thDelete, thEdit);
thead.appendChild(headerRow);

document.querySelector("table").appendChild(thead);
document.querySelector("table").appendChild(tbody);
});