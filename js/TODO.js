// const b = document.querySelector("button");
// const input = document.querySelector("input");
// b.addEventListener("click", function() {
//     const list = document.querySelector("ul");
//     const listItem = document.createElement("li");
//     const newListItem = document.createElement("p");
//     newListItem.textContent = input.value;
//     const deleteButton = document.createElement("button");
//     deleteButton.textContent = "Delete";
//     listItem.appendChild(newListItem);
//     listItem.appendChild(deleteButton);
//     list.appendChild(listItem);
//     input.value = "";
    
//     deleteButton.addEventListener("click", function() {
//         list.removeChild(listItem);
//     })
// })
// input.addEventListener("keypress", function(event) {
//     if(event.key === "Enter") {
//         document.querySelector("button").click();
//     }
// })

const b = document.querySelector("button");
const list = document.querySelector("ul");
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