const b = document.querySelector("button");
b.addEventListener("click", function(){
    const input = document.querySelector("input").value;
    const newListItem = document.createElement("li");
    newListItem.textContent = input
    const finalList = document.querySelector("ul");
    finalList.appendChild(newListItem);
 }
);







