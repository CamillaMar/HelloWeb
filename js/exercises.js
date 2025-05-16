const top10Btn = document.querySelector('.top10Btn');
const categoryBtn = document.querySelector('.categoryBtn');
const selectCategory = document.querySelector('#category');
const custEmpBtn = document.querySelector('.custEmpBtn');

document.addEventListener('DOMContentLoaded', async () => {
    const categories = await loadCategories();
    fillCategorySelect(categories);
});

top10Btn.addEventListener('click', async () => {
    const data = await loadTopProducts(10);
    renderTable(data, "top10");
});

categoryBtn.addEventListener('click', async () => {
    const categoryId = selectCategory.value;
    let productsByCategory = await loadProductsByCategory(categoryId);

    let totalPrice = 0;
    productsByCategory.forEach(product => {
        totalPrice += product['unitPrice'];
    });

    if (productsByCategory.length < 6 || totalPrice < 100) {
        const standardProduct = new Product('Standard Product', 1, categoryId, 100, false);
        await addProductToDB(standardProduct);
        productsByCategory = await loadProductsByCategory(categoryId);
    }

    renderTable(productsByCategory, "categoryTable");
})

custEmpBtn.addEventListener('click', async () => {
    const customer = [await loadCustomerWithMostOrders()];
    const employee = [await loadEmployeeWithMostOrders()];

    if(employee[0].address !== customer[0].address) {
        await updateEmployeeAddress(employee[0], customer[0].address);
    }

    renderTable(customer, 'customerTable');
    renderTable(employee, 'employeeTable');
});

async function loadCategories() {
    return await sendGetRequest('http://localhost:8080/api/categories');
}

async function loadTopProducts(numOfProducts) {
    return await sendGetRequest(`http://localhost:8080/api/products?topN=${numOfProducts}`);
}

async function loadProductsByCategory(categoryId) {
    return await sendGetRequest(`http://localhost:8080/api/products?categoryId=${categoryId}`);
}

async function addProductToDB(product) {
    await sendPostRequest('http://localhost:8080/api/products', product);
}

async function loadEmployeeWithMostOrders() {
    return await sendGetRequest('http://localhost:8080/api/employees?empWithMostOrders=true');
}

async function loadCustomerWithMostOrders() {
    return await sendGetRequest('http://localhost:8080/api/customers?custWithMostOrders=true');
}

async function sendGetRequest(url) {
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

async function sendPostRequest(url, bodyObj) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(bodyObj)
        });

        if (!response.ok) {
            throw new Error("http error "+ response.status);
        }

        return await response.json();
    } catch (error) {
        console.log("Errore nella connessione al server");
        console.log(error);
    }
}

async function sendPutRequest(url, bodyObj) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(bodyObj)
        });
        
        if (!response.ok) {
            throw new Error("http error "+ response.status);
        }

        return await response.json();
    } catch (error) {
        console.log("Errore nella connessione al server");
        console.log(error);
    }
}

function fillCategorySelect(categories) {
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category['categoryId'];
        option.textContent = category['categoryName'];
        selectCategory.appendChild(option);
    });
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
        tHead = container.createTHead();
    }

    if (!tBody) {
        tBody = container.createTBody();
    }

    const headersRow = tHead.insertRow();
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headersRow.appendChild(th);
    });

    data.forEach(element => {
        const bodyRow = tBody.insertRow();
        Object.keys(element).forEach(key => {
            const td = bodyRow.insertCell();
            td.textContent = element[key];
        }); 
    });
}

async function updateEmployeeAddress(employee, newAddress) {
    employee.address = newAddress;
    await sendPutRequest(`http://localhost:8080/api/employees/${employee.empId}`, employee);
}

function Product(productName, supplierId, categoryId, unitPrice, discontinued) {
    this.productName = productName;
    this.supplierId = supplierId;
    this.categoryId = categoryId;
    this.unitPrice = unitPrice;
    this.discontinued = discontinued;
}