const b = document.querySelector("button");
b.addEventListener("click", function(){
    const newList = document.createElement("ul");

let toDo = [];
for(let i = 0; i < toDo; i++){
    toDo[i].push(b.getElementsByClassName(myButton))
    const newListItem = document.createElement("li");
    newListItem.textContent = toDo[i];
    newList.appendChild(newListItem);
}
})