
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
switchEmployeeAdress();
});

async function loadCustomer() {
    try {
        const response = await fetch("http://localhost:8080/api/customers?limite=1");
        if (!response.ok) {
            throw new Error("HTTP error" + response.status);
        }
        const data = await response.json();
        console.log(data);
        return data[0];
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
        return data[0]
    } catch (e) {
        console.error("Errore di comunicazione col server" + e);
    }
}

// async function switchEmployeeAdress(){
//     const emp = loadEmployee();
//     const cust = loadCustomer();
//     if (!emp || !cust) {
//     console.error("Employee o Customer null");
//     return;
// }
//     console.log(emp, cust);

//     try{
//          const response = await fetch("http://localhost:8080/api/employee/" + emp.empId, {
//             method:'PUT',
//             body: JSON.stringify({
//                 empId : emp.empId,
//                 lastName: emp.lastName,
//                 firstName: emp.firstName,
//                 title: emp.title,
//                 titleOfCourtesy: emp.titleOfCourtesy,
//                 birthDate: emp.birthDate,
//                 hireDate: emp.hireDate,
//                 address: cust.address,
//                 city: emp.city,
//                 region: emp.region,
//                 postalCode: emp.postalCode,
//                 country: emp.country,
//                 phone: emp.phone,
//                 mgrId: emp.mgrId
//             }), 
//             headers:  {
//                    'Content-Type': 'application/json'
//                    }
//         });
//             if (!response.ok) {
//             throw new Error("HTTP error" + response.status);
//             }
//         const data = await response.json();
//         console.log(data);
//         renderTable(data, "container");
//     } catch (e) {
//         console.error("Errore di comunicazione col server" + e);
//     }
// }



async function switchEmployeeAdress() {
    const emp = await loadEmployee();
    const cust = await loadCustomer();


    if (!emp || !cust) {
        console.error("Dati dell'impiegato o del cliente non trovati.");
        return ;
    }
    if (!emp[0].empId) {
        console.error("ID dell'impiegato mancante.");
        return;
    }
    try {
        const response = await fetch(`http://localhost:8080/api/employee/${emp[0].empId}`, {
            method: 'PUT',
            body: JSON.stringify({
                empId: emp.empId,
                lastName: emp.lastName,
                firstName: emp.firstName,
                title: emp.title,
                titleOfCourtesy: emp.titleOfCourtesy,
                birthDate: emp.birthDate,
                hireDate: emp.hireDate,
                address: cust.address,
                city: emp.city,
                region: emp.region,
                postalCode: emp.postalCode,
                country: emp.country,
                phone: emp.phone,
                mgrId: emp.mgrId
            }), 
            headers:  {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Errore HTTP ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Risposta dal server:", data);
        renderTable(data, "container");
    } catch (e) {
        console.error("Errore nella comunicazione con il server:", e);
    }
}
