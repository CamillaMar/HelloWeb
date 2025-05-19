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
    const th1 = createElment("th");
    const th2 = createElment("th");
    th1.textContent = "Elimina ordine";
    th2.textContent = "Ordina di nuovo";
    headerRow.append("th1","th2");
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