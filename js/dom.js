const b = document.querySelector("button");
console.log(b);
console.log("Subito prima di definire la lambda");
console.log(this);
// b.addEventListener("click", () =>  {
//     console.log("Usando una lambda");
//     console.log(this); //il this è l'oggetto che ha generato l'evento, il listener però dev'essere una funzione e non una lambda o altro
// });
b.addEventListener("click", function(){
    console.log("Usando una function");
    console.log(this);
    const h1= document.querySelector("h1");
    h1.textContent = "Abbiamo cambiato il testo";
    const p= document.querySelector("body p:nth-of-type(2)");
    p.innerHTML = "che<strong> Brutta </strong>giornata";
    p.classList.add("hope");
    const newElement = document.createElement("p");
    newElement.textContent = "Sono stato creato dinamicamente";
    document.querySelector("body").appendChild(newElement);

    let names = ["Filippo","Elvis","Camilla","Nicolò","Lorenzo","Edoardo"];
    const newList = document.createElement("ul");
    names.forEach((name)=>{
        const newListItem = document.createElement("li");
        newListItem.textContent = name;
        newList.appendChild(newListItem);
    })
    document.querySelector("body").appendChild(newList);
});

