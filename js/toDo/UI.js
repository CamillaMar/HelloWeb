class UI{
    static renderTable(data, idContainer){
        if(data.length === 0){
            console.log("L'array di dati è vuoto");
            return;
        }

        const container = document.querySelector(`#${idContainer}`);
        if(!container){
            container = document.createElement("div");
            container.id = idContainer;
            
            const body = document.querySelector("body");
            body.appendChild(container);
        }
        container.innerHTML = "";

        const table = document.createElement("table");
        const tHead = table.createTHead();

        table.classList.add("table");
        table.classList.add("table-striped");
        table.classList.add("table-dark");

        const headerRow = tHead.insertRow();
        const headers = Object.keys(data[0]);
        headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
            headerRow.appendChild(th);
        });
        const tBody = table.createTBody();
        data.forEach(item =>{
            const row = tBody.insertRow();
            headers.forEach(key => {
                const cell = row.insertCell();
                cell.textContent = item[key];       
            });
        });
        container.appendChild(table);
    }
}