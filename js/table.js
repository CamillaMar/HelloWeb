const products = [
    {
        productId: 1,
        productName: "Bicicletta",
        itemPrice: 200.00,
        categoryName: "Sport"
    },
    {
        productId: 2,
        productName: "Scii",
        itemPrice: 150.00,
        categoryName: "Sport"
    },
    {
        productId: 3,
        productName: "Tavola da Surf",
        itemPrice: 300.00,
        categoryName: "Sport"
    }
];

const b = document.querySelector("button");
b.addEventListener("click", () => {
	const tbody = document.querySelector("tbody");
	products.forEach((product) => {
	/* console.log(product); */
		const tr = document.createElement("tr");
		Object.keys(product).forEach((key) => {
			const td = document.createElement("td");
			if(key == "productId") {
				td.classList.add("hide");
				/* td.style = "display: none"; */ //implementato in CSS
			}
			td.textContent = product[key];
			tr.appendChild(td);
		});
		tbody.appendChild(tr);
	});
});

