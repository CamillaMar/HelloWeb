let b = document.querySelector("#addElementButton");
let id = 0;

b.addEventListener("click", () => {
    const ul = document.querySelector("ul");
    
    let value = document.querySelector("input").value;
    const newElement = document.createElement("li")
    newElement.textContent = value;

    const button = document.createElement("button");
    button.textContent = "delete";

    button.addEventListener("click", () => {
        newElement.remove();
    });

    newElement.appendChild(button);
    
    ul.appendChild(newElement);
});