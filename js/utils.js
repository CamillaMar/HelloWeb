
async function createTable(idContainer, config){
    const data = await loadData(config)
    renderTable(data, idContainer);
}

async function loadData(config) {
    const response = await callService(config);
    const data = await response.json();
    return data;
}

async function callService(config) {

  const url = getUrl(config);
  const fetchOptions = getFetchOptions(config);

  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    return await response;
  } catch (error) {
    alert("Errore di comunicazione con il server: " + error);
    throw error;
  }
}
function getUrl({ controller, method = "GET", pathSegments = [], params = {} }) {
  let url = `http://localhost:8080/api/${controller}`;

  // Add path segments if provided
  if (pathSegments.length > 0) {
    url += "/" + pathSegments.map(encodeURIComponent).join("/");
  }

  // Append query string only for GET
  if (method === "GET" && Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(params).toString();
    url += "?" + queryString;
  }

  return url;
}
function getFetchOptions({ method = "GET", params = {} }) {
  const options = { method: method.toUpperCase() };

  const hasBody = ["POST", "PUT", "PATCH", "DELETE"].includes(options.method);

  if (hasBody && params && Object.keys(params).length > 0) {
    options.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    options.body = JSON.stringify(params);
  }

  return options;
}
function buildObject(keys, values) {
  const keyArray = toArray(keys);
  const valueArray = toArray(values);

  if (keyArray.length !== valueArray.length) {
    throw new Error("Keys and values must have the same length");
  }

  return Object.fromEntries(
    keyArray.map((key, i) => [key, valueArray[i]])
  );
}
function toArray(value){
    return Array.isArray(value) ? value : [value];
}
function renderTable(data, idContainer){
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

    // table.classList.add("table");
    // table.classList.add("table-striped");
    // table.classList.add("table-dark");

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