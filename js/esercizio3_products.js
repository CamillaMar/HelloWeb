document.addEventListener("DOMContentLoaded", () => {
	const b3 = document.querySelector("#esercizio-3");

	b3.addEventListener("click", () => {
		employeeInOmaggio();
	});
});

async function employeeInOmaggio(){
    try {
        const urlC = "http://localhost:8080/api/customer";
        const urlE = "http://localhost:8080/api/employee";
        const responseC = await fetch(urlC);
        if(!responseC.ok){
            throw new Error("http error "+ response.status);
        }
        const responseE = await fetch(urlE);
        if(!responseE.ok){
            throw new Error("http error "+ response.status);
        }
        const customerAddress = {

        };
        const response = await fetch(url, fetchOptions);
        if(!response.ok){
            throw new Error("http error "+ response.status);
        }
        const data = await response.json();
        renderTable(data, "tablecontainer");
    } catch(error){
        alert("errore di comunicazione con il server " + error);
    }
}