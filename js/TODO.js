const b = document.querySelector("button");
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