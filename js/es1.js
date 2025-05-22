const category = document.addEventListener("DOMContentLoaded", function () {
    loadCategory();
});

function renderTable(data, containerId) {
    const container = document.querySelector(`#${containerId}`);
    if (!container) {
        console.log("l'elemento contenitore non esiste");
        return;
    }
    if (data.length === 0) {
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
        th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
        headerRow.appendChild(th);
    });
    const tBody = table.createTBody();
    data.forEach(item => {
        const row = tBody.insertRow();
        headers.forEach(key => {
            const cell = row.insertCell();
            cell.textContent = item[key];
        });
    });
    container.appendChild(table);
}

// const btn = document.querySelector("button");
// btn.addEventListener("click", () => {
// loadData();
// });

async function loadCategory() {
    try {
        const response = await fetch("http://localhost:8080/api/category");
        if (!response.ok) {
            throw new Error("HTTP error" + response.status);
        }
        const categories = await response.json();
        renderCategorySelect(categories);
    } catch (e) {
        console.error("Errore di comunicazione col server" + e);
    }
}

async function loadData() {
    try {
        const response = await fetch("http://localhost:8080/api/product?topN=10");
        if (!response.ok) {
            throw new Error("HTTP error" + response.status);
        }
        const data = await response.json();
        renderTable(data, "container");
    } catch (e) {
        console.error("Errore di comunicazione col server" + e);
    }
}


async function searchProductCategory(categoryId) {
    try {
        const response = await fetch("http://localhost:8080/api/product?categoryId=" + categoryId);
        if (!response.ok) {
            throw new Error("HTTP error" + response.status);
        }
        let data = await response.json();
        let sum = 0;
        data.forEach(product =>{
            sum += product.unitPrice;
        })
        if(data.length < 8 || sum < 300){
            await createDefaultProduct(categoryId);
            let updatedResponse = await fetch("http://localhost:8080/api/product?categoryId=" + categoryId);
            data = await updatedResponse.json();
        }
        renderTable(data, "container");
    } catch (e) {
        console.error("Errore di comunicazione col server" + e);
    }
}

async function createDefaultProduct(category) {
    try {
        const response = await fetch("http://localhost:8080/api/product", {
            method:'POST',
            body: JSON.stringify({
                productName : "Marcella Bella",
                supplierId : 1,
                categoryId : category,
                unitPrice : 100,
                discontinued : false
            }), 
            headers:  {
                   'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error("HTTP error" + response.status);
        }
        const data = await response.json();
        console.log(data);
    } catch (e) {
        console.error("Errore di comunicazione col server" + e);
    }
}


function renderCategorySelect(categories) {
    const select = document.querySelector("#categoryID")
    const optionDefault = document.createElement("option")
    optionDefault.textContent = "Select Category";
    optionDefault.disabled = true;
    optionDefault.selected = true;
    select.appendChild(optionDefault);
    optionDefault.hidden = true;
    categories.forEach(category => {
        const option = document.createElement("option")
        option.value = category.categoryId;
        option.innerText = category.categoryName;
        select.appendChild(option);
    });
    select.addEventListener("change", function () {
        const selectValue = this.value;
        searchProductCategory(selectValue);
    });  
}




