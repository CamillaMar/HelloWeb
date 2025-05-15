const b = document.querySelector("button");
const input = document.querySelector("input");
b.addEventListener("click", function() {
    const list = document.querySelector("ul");
    const listItem = document.createElement("li");
    const newListItem = document.createElement("p");
    newListItem.textContent = input.value;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    listItem.appendChild(newListItem);
    listItem.appendChild(deleteButton);
    list.appendChild(listItem);
    input.value = "";
    
    deleteButton.addEventListener("click", function() {
        list.removeChild(listItem);
    })
})
input.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        document.querySelector("button").click();
    }
})

