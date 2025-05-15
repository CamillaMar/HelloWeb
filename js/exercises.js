const top10Btn = document.querySelector('.top10Btn');
const categoryBtn = document.querySelector('.categoryBtn');

top10Btn.addEventListener('click', async () => {
    const data = await loadTopProducts(10);
    renderTable(data, "top10");
});

// categoryBtn.addEventListener('click', async () => {

// })

async function loadTopProducts(numOfProducts) {
    return await sendRequest(`http://localhost:8080/api/products?topN=${numOfProducts}`);
}

async function loadProductsByCategory(categoryId) {
    return await sendRequest(`http://localhost:8080/api/products?categoryId=${categoryId}`);
}

async function sendRequest(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("http error "+ response.status);
        }

        return await response.json();
    } catch (error) {
        console.log("Errore nella connessione al server");
    }
}


function renderTable(data, containerId) {
    const container = document.querySelector(`#${containerId}`);
    if (!container) {
        console.log(`La table con id ${containerId} non esiste`);
        return;
    }

    container.textContent = "";

    if (data.length === 0) {
        console.log("L'array di dati è vuoto");
        return;
    }

    let tHead = container.querySelector('thead');
    let tBody = container.querySelector('tbody');

    if (!tHead) {
        tHead = document.createElement('thead');
        if(tBody){
            container.insertBefore(tHead, tBody);
        } else {
            container.appendChild(tHead);
        }
    }

    if (!tBody) {
        tBody = document.createElement('tbody');
        container.appendChild(tBody);
    }

    const headersRow = document.createElement('tr');
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headersRow.appendChild(th);
    });
    tHead.appendChild(headersRow);

    data.forEach(element => {
        const bodyRow = document.createElement('tr');
        Object.keys(element).forEach(key => {
            const td = document.createElement('td');
            td.textContent = element[key];
            bodyRow.appendChild(td);
        }); 
        tBody.appendChild(bodyRow);
    });
}