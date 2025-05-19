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

const btn = document.querySelector("button");
btn.addEventListener("click", () => {
    switchEmployeeAddress();
});

async function loadCustomer() {
    try {
        const response = await fetch("http://localhost:8080/api/customers?limite=1");
        if (!response.ok) {
            throw new Error("HTTP error" + response.status);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (e) {
        console.error("Errore di comunicazione col server" + e);
    }
}

async function loadEmployee() {
    try {
        const response = await fetch("http://localhost:8080/api/employee?limite=1");
        if (!response.ok) {
            throw new Error("HTTP error" + response.status);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (e) {
        console.error("Errore di comunicazione col server" + e);
    }
}

async function switchEmployeeAddress(){
    const cust = await loadCustomer();
    const emp = await loadEmployee();
        
    console.log(emp[0].empId);
    console.log("STAMPA");
    console.log(`http://localhost:8080/api/employee/${emp[0].empId}`);

    // const customer = cust[0];
    // const employee = emp[0];
    // const address = customer.address;
    // employee.address = customer.address;
    const {address, city, region, postalCode, country} = cust[0]; 

    if (!cust || !emp) {
        console.error("Errore nel recupero dei dati di customer o employee");
        return;
    }
    try{
        const response = await fetch(`http://localhost:8080/api/employee/${emp[0].empId}`, {
            method:'PUT',
            // body: JSON.stringify({
            //     empId: emp[0].empId,
            //     lastName: emp[0].lastName,
            //     firstName: emp[0].firstName,
            //     title: emp[0].title,
            //     titleOfCourtesy: emp[0].titleOfCourtesy,
            //     birthDate: emp[0].birthDate,
            //     hireDate: emp[0].hireDate,
            //     address: cust[0].address,
            //     city: emp[0].city,
            //     region: emp[0].region,
            //     postalCode: emp[0].postalCode,
            //     country: emp[0].country,
            //     phone: emp[0].phone,
            //     mgrId: emp[0].mgrId
            // }), 
            body: JSON.stringify({...emp[0], address:cust[0].address}),
            // body: JSON.stringify(employee),
            headers:  {
                   'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error("HTTP error" + response.status + response.statusText);
        }
        const data = await response.json();
        console.log(data);
        // const arr = [data];
        renderTable([data], "container2");
    } catch (e) {
        console.error("Errore di comunicazione col server" + e);
    }
}


