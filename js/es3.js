
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


async function loadData() {
    try {
        const response = await fetch("http://localhost:8080/api/customers?limite=1");
        if (!response.ok) {
            throw new Error("HTTP error" + response.status);
        }
        const data = await response.json();
        console.log(data);
        renderTable(data, "container");
    } catch (e) {
        console.error("Errore di comunicazione col server" + e);
    }
}
const btn = document.querySelector("button");
btn.addEventListener("click", () => {
loadData();
});

