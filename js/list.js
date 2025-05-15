const button = document.querySelector("button");
const input = document.querySelector("input");
button.addEventListener("click", function(){
    const newItem = document.createElement("li");
    newItem.textContent = input.value;
    document.querySelector("ul").appendChild(newItem);
    input.value = "";
    const newButton = document.createElement("button");
    newButton.textContent = "cancella";
    document.querySelector("ul").appendChild(newButton);
    newButton.addEventListener("click", function(){
        newButton.remove();
        newItem.remove();
    })
    
});