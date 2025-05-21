const b = document.querySelector("button");
<<<<<<< HEAD
b.addEventListener("click", () => {
    let value = document.querySelector("input").value;
    const newElement = document.createElement("li");
    newElement.textContent = value;

    const removeButton = document.createElement("button");
    removeButton.textContent = "delete";

    newElement.appendChild(removeButton);

    removeButton.addEventListener("click", () =>{
       newElement.remove();
    });
    document.querySelector("ul").appendChild(newElement);
});
=======
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

>>>>>>> main
