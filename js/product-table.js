//esercizio 1

const button = document.querySelector("button");
function renderTable(data, tableid) {
    if(data.length === 0) {
        console.log("L'array di dati è vuoto");
        return;
    } 
    const table = document.querySelector(`#${tableid}`);
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


function renderCategorySelect(data) {
    if(data.length === 0) {
        console.log("L'array è vuoto");
        return
    }
    const select = document.querySelector("select");
    data.forEach(category => {
        const opt = document.createElement("option");
        //console.log(category.categoryId);
        opt.value=category.categoryId;
        opt.textContent=category.categoryName;
        select.appendChild(opt);
    });

}
async function loadCategories(){
    try {
        const response = await fetch("http://localhost:8080/api/category");
        if(!response.ok) {
            throw new Error("Http Error");
        } 
        const data = await response.json();
        renderCategorySelect(data);
    } catch (error) {
        alert("Errore Server" + error);
    }
}
loadCategories();

async function loadProductByCategoryId(categoryId) {
    try {

        const response = await fetch("http://localhost:8080/api/product?categoryId=" + categoryId);
        const data = await response.json();
        let somma = 0;
        data.forEach(product =>{
            somma += product.unitPrice;
        });
        if(data.length > 5 || somma > 100){
            renderTable(data,"table2");
        } else{
            await postData(categoryId);

            const response2 = await fetch("http://localhost:8080/api/product?categoryId=" + categoryId);
            const data2 = await response2.json();
            renderTable(data2,"table2");
        }
    } catch (error) {
        alert("Errore Server" + error);
    } 
}


async function postData(categoryId) {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "productId": 0,
                "productName": "standard product",
                "supplierId": 1,
                "unitPrice": 100,
                "discontinued": false,
                "categoryId": categoryId
            })
        };
        const response = await fetch("http://localhost:8080/api/product" , config);
        //const json = await response.json()
        if (response.ok) {
            //return json
            return response;
        } else {
            console.log("Http Error");
        }
    } catch (error) {
            console.log("Erroe nel collegamento con il server: " + error);
    }
}
const select = document.querySelector("select");
const button2 = document.querySelector("article>button");
button2.addEventListener("click", function(){
    const idValue = select.value;
    loadProductByCategoryId(idValue);
    
}) //lasciamo qui un attimo 