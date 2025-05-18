const standardProduct = {
    productName: "standard product",
    supplierId: 1,
    unitPrice: 100,
    discontinued: 0
}
const top10Button = document.createElement("button");
top10Button.textContent = "Get TOP 10 expensive products!!!";
top10Button.addEventListener("click", async () => renderTop10Products());
document.body.appendChild(top10Button);
createCategorySelect();


async function createCategorySelect() {
    const div = document.createElement("div");
    const button = document.createElement("button");
    button.textContent = "Show products of this category";
    const categorySelect = document.createElement("select");
    let categories = await getAllCategories();
    categories.forEach(category => {
        let categoryOption = document.createElement("option");
        categoryOption.value = category.categoryId;
        categoryOption.textContent = category.categoryName;
        categorySelect.appendChild(categoryOption);
    })
    div.appendChild(categorySelect);
    div.appendChild(button);
    document.body.appendChild(div);

    button.addEventListener("click", async () => {
        renderProductsByCategoryId(categorySelect.options[categorySelect.selectedIndex].value);
    })

}

renderTable = function (data) {
    let table = document.querySelector("#db-table");
    if (table != null) {
        table.remove();
    }

    table = document.createElement("table");
    table.id = "db-table";
    const thead = document.createElement("thead");

    const headTr = document.createElement("tr");
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement("th");
        th.textContent = key;
        headTr.appendChild(th);
    });
    thead.appendChild(headTr);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    data.forEach(element => {
        const tr = document.createElement("tr");
        Object.entries(element).forEach(([key, value]) => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    document.body.appendChild(table);
}

async function renderTop10Products() {
    let response = await fetch("http://localhost:8080/api/products?topN=10");
    let data = await response.json();
    renderTable(data);
}

async function getAllCategories() {
    let response = await fetch("http://localhost:8080/api/categories");
    let data = await response.json();
    return data;
}

async function renderProductsByCategoryId(categoryId) {
    let response = await fetch("http://localhost:8080/api/products?categoryId=" + categoryId);
    let data = await response.json();

    let totalPrice = 0;
    data.forEach(product => {
        totalPrice += product.unitPrice;
    })

    if (data.length <= 7 || totalPrice < 300) {
        await addNewProduct(standardProduct, categoryId);
        response = await fetch("http://localhost:8080/api/products?categoryId=" + categoryId);
        data = await response.json();
    }

    renderTable(data);
}

async function addNewProduct(product, categoryId) {
    product.categoryId = categoryId;
    let response = await fetch("http://localhost:8080/api/products",
        {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
    )
    if (response.ok) {
        return true;
    }
    return false;
}
