document.addEventListener("DOMContentLoaded", () => {
	const b1 = document.querySelector("#esercizio-1");
	const b2 = document.querySelector("#esercizio-2");
  const b3 = document.querySelector("#esercizio-3");

	b1.addEventListener("click", () => {
		createTable("tablecontainer", {
            controller: "product",
            method: "GET",
            params: {topN: 10}
        });
	});

	b2.addEventListener("click", () => {
		const input = document.querySelector("input");
		esercizio2("tablecontainer", {
            pathSegments: [input.value]
        });
	});

	b3.addEventListener("click", () => {
		employeeInOmaggio();
	});
});

async function esercizio2(idContainer, config){
  const {
    controller,
    method = "GET",
    pathSegments = [],
    params = {},
  } = config;

  const standardProductKeys = ["productName", "supplierId", "categoryId", "unitPrice", "discontinued"];
  const standardProductvalues = ["Standard_Product", 1, pathSegments[0], 100 , false];

  const category = await loadData({
    controller: "category", 
    method: method, 
    pathSegments: pathSegments, 
    params: params
  });

  if(!category){
    throw new Error("la categoria cercata non esiste"+ response.status);
  }
  
  const products = await loadData({
    controller: "product", 
    method: method, 
    pathSegments: [], 
    params: {categoryId: pathSegments[0]}
  });

  const standardProduct = buildObject(standardProductKeys, standardProductvalues);

  if(products.length < 3){ 
      products.push(await loadData({
        controller: "product", 
        method: "POST", 
        pathSegments: [], params: standardProduct
      }));
      renderTable(products, idContainer);
      return;
  }

  let totCost = 0;
  products.forEach(product => {
    totCost += product.unitPrice;
  });
  if(totCost < 100){
    products.push(await loadData({
      controller: "product", 
      method: "POST", 
      pathSegments: [], params: standardProduct
    }));
  }
  renderTable(products, idContainer);
}

async function employeeInOmaggio(){
  const customer = await loadData({
    controller: "customer",
    method: "GET",
    pathSegments: ["findByMostOrders"],
    params: {}
  });
  const employee = await loadData({
    controller: "employee",
    method: "GET",
    pathSegments: ["findByMostOrders"],
    params: {}
  });
  
  employee.address = customer.address;
  employee.city = customer.city;
  employee.region = customer.region;
  employee.postalCode = customer.postalCode;
  employee.country = customer.country;

  await callService({
    controller: "employee",
    method: "PUT",
    pathSegments: [employee.empId],
    params: employee
  });
}