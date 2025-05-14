const list = document.querySelector("body ul");
const input = document.querySelector("body input");
const button = document.querySelector("body button");
button.addEventListener("click",()=>{
    console.log("sono nel click");
    const text = input.value;
    const newLi = document.createElement("li");
    newLi.classList.add("list")
    const newh2 = document.createElement("h2");
    const newButton = document.createElement("button");
    newh2.textContent = text;
    newButton.textContent = "Rimuovi";
    newLi.appendChild(newh2);
    newLi.appendChild(newButton);
    list.appendChild(newLi);
    newButton.addEventListener("click",()=>{
        list.removeChild(newLi);
    })
    
})
