const btnCostosi = document.getElementById("costosi");
const btnByCat = document.querySelector("div button");
const byCatSelect = document.querySelector("div select");
const btnCustomer = document.querySelector("#MostUsefullCustomer");

getCategoriesNamesForSelect();

function generateTable(data, limit) {
    if (data.length === 0) { console.log("Non sono stati trovati dati da mostrare"); return; }
    const table = document.querySelector("table");
    table.innerHTML = "";
    const tHead = table.createTHead();
    const tBody = table.createTBody();
    const headers = Object.keys(data[0]);
    headers.forEach(head => {
        const th = document.createElement("th");
        th.textContent = head;
        tHead.appendChild(th);
    });
    for (i = 0; i < limit; i++) {
        const row = tBody.insertRow();
        const values = Object.values(data[i])
        values.forEach(value => {
            const cell = row.insertCell();
            cell.innerText = value;
        })
    }

}
async function getDataFor10MaxPrice() {
    try {
        const response = await fetch("http://localhost:8080/api/product?orderByPrice=true");
        if (!response.ok) {
            throw new Error("http error " + response.status);
        }
        const data = await response.json();
        generateTable(data, 10);
    } catch (error) {
        alert("errore di comunicazione con il server " + error);
    }
}
async function getCategoriesNamesForSelect() {
    try {
        const response = await fetch("http://localhost:8080/api/category");
        if (!response.ok) {
            throw new Error("http error " + response.status);
        }
        const data = await response.json();
        data.forEach(dato => {
            const values = Object.values(dato);
            byCatSelect.innerHTML = byCatSelect.innerHTML + "<option value=\"" + values[0] + "\">" + values[1] + "</option>"
        })
    } catch (error) {
        alert("errore di comunicazione con il server " + error);
    }
}
async function getDataForCatAndCreate() {
    try {
        const response = await fetch("http://localhost:8080/api/product?categoryId=" + byCatSelect.value);
        if (!response.ok) {
            throw new Error("http error " + response.status);
        }
        const data = await response.json();
        let totalPrice = 0;
        data.forEach(obj => {
            const values = Object.values(obj);
            const price = parseInt(values[4]);
            totalPrice += price;
        })
        if (totalPrice <= 1000 || data.length < 3) {
            console.log("non superava i 1000, quindi aggiungo un prodotto standard");
            await AddProduct(byCatSelect.value)
        }
        const Newresponse = await fetch("http://localhost:8080/api/product?categoryId=" + byCatSelect.value);
        if (!response.ok) {
            throw new Error("http error " + response.status);
        }
        const newdata = await Newresponse.json();
        generateTable(newdata, newdata.length);
    } catch (error) {
        alert("errore di comunicazione con il server " + error);
    }
}
async function AddProduct(category) {
    try {
        await fetch('http://localhost:8080/api/product', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productName: "standardProduct",
                    supplierId: 1,
                    categoryId: category,
                    unitPrice: 1000,
                    discontinued: false
                })
            });
    } catch (error) {
        alert("errore nel aggiunta del prodotto jolly " + error);
    }
}
async function FindSuccessfullClient(){
    try{
        const bestEmployeeResponse = await fetch("http://localhost:8080/api/employees/best")
        const bestCustomerResponse= await fetch("http://localhost:8080/api/customers/best")
        if (!bestCustomerResponse.ok||!bestEmployeeResponse.ok ) {
            throw new Error("http error " + response.status);
        }
        const customer = await bestCustomerResponse.json();
        let employee = await bestEmployeeResponse.json();  
        console.log("found this customer");
        console.log(customer);
        console.log("found this employee");
        console.log(employee);        
        const { address,city,region,postalCode,country } = customer;
        // (region === empvalues[9])?console.log("vivono nella stessa regione!"):console.log("Non vivono nella stessa regione");
        // (custCountry === empvalues[11])?console.log("vivono nella stessa Country!"):console.log("Non vivono nella stessa Country");        
        // if((custRegion === empvalues[9])&&(custCountry === empvalues[11])){
        //     console.log("E' altamente probabile che io sia già stato premuto");
        // } 
        const addEmpResponse = await fetch("http://localhost:8080/api/employees",{            
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...employee,address,city,region,postalCode,country})
        });
        const bestEmployeeResponseNew = await fetch("http://localhost:8080/api/employees/best")
        if (!bestEmployeeResponseNew.ok ) {
            throw new Error("http error " + response.status);
        }
        const newBestEmployee = await bestEmployeeResponseNew.json();
        console.log("Changed the best employee to this");
        console.log(newBestEmployee);
        
    }catch(error){
        alert("errore nel server"+error)
    }
}


btnCostosi.addEventListener ("click", getDataFor10MaxPrice);
btnByCat.addEventListener   ("click", getDataForCatAndCreate);
btnCustomer.addEventListener("click", FindSuccessfullClient);

