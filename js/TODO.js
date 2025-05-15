const b = document.querySelector("button");
const list = document.querySelector("ul")
const input = document.querySelector("input");
input.placeholder ="inserisci il testo";

b.addEventListener("click", function() {
    const item = document.createElement("li");
    const toDo = document.createElement("div");
    
    toDo.innerText = input.value;
    input.value = "";
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Delete";
    removeBtn.addEventListener("click", ()=>{
        item.remove();
    });
    
    item.appendChild(toDo);
    item.appendChild(removeBtn);
    document.querySelector("ul").appendChild(item);
})