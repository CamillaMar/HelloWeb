//esercizio 1

const button = document.querySelector("button");
function renderTable(data, tableid) {
    if(data.length === 0) {
        console.log("L'array di dati è vuoto");
        return;
    } 
    const table = document.querySelector(`${tableid}`);
    table.innerHTML = "";
    const tHead = table.createTHead();
    const tr = tHead.insertRow();
    const headers = Object.keys(data[0]);
    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header.charAt(0).toUpperCase() + header.slice(1); 
        tr.appendChild(th);
    });
    const tBody = table.createTBody();
    data.forEach(product => {
        const tr = document.createElement("tr");
        headers.forEach(key => {
            const td = tr.insertCell();
            td.textContent = product[key];
        });
        tBody.appendChild(tr);
    });
};
async function loadExpensiveProducts() {
    try {
        const response = await fetch("http://localhost:8080/api/product?topN=10");
        if(!response.ok) {
            throw new Error("Http Error");
        } 
        const data = await response.json();
        renderTable(data, "table1");
    } catch (error) {
        alert("Errore Server" + error);
    }
}
button.addEventListener("click", ()=>{
    loadExpensiveProducts();
});

//esercizio 2

function loadAllCategories(data) {
    if(data.length === 0) {
        console.log("L'array è vuoto");
        return
    }
    const select = document.querySelector("select");
    const keys = Object.keys(data[0]);
    data.forEach(category => {
        const opt = document.createElement("option");
        console.log(category.categoryId);
    });
}

async function loadProductByCategoryName(categoryName) {
    try {
        const response = await fetch("http://localhost:8080/api/product?categoryName=" + categoryName);
    } catch (error) {
        alert("Errore Server" + error);
    } 
}

const input = document.querySelector("input");
const button2 = document.querySelector("article>button");
button2.addEventListener() //lasciamo qui un attimo 

async function postData() {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: {
                "productId": 0,
                "productName": "standard product",
                "supplierId": 1,
                "unitPrice": 100,
                "discontinued": false 
            }
        }
        const response = await fetch(url, config)
        //const json = await response.json()
        if (response.ok) {
            //return json
            return response
        } else {
            //
        }
    } catch (error) {
            //
    }
}
