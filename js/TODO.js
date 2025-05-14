const b = document.querySelector("button");
b.addEventListener("click", function () {
    const ul = document.querySelector('ul');
    const inputElement = document.querySelector('#input');

    const inputValue = inputElement.value;
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    li.textContent = inputValue;
    deleteButton.addEventListener("click", function () {
        li.remove();  
    })
    li.appendChild(deleteButton);
    ul.appendChild(li);

})