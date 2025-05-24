import { Todo } from "./todo.js";
localStorage.clear();
let cont = 0; 
const saveButton = document.querySelector("#submit");
saveButton.addEventListener("click", () => {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#due-date");
    const category = document.querySelector("#category");
    const todo = new Todo(cont, title.value, description.value, dueDate.value, category.value, new Date(), false);
    localStorage.setItem(todo.id , JSON.stringify(todo));
    cont++;
});
const loadButton = document.querySelector("#load");
loadButton.addEventListener("click", () =>{
    const todosContainer = document.querySelector("#todosContainer");
    const childs = todosContainer.querySelectorAll("div");
    childs.forEach(child =>{
        child.remove();
    });

    for(let i = 0; i < cont; i++){
        let jsonString = localStorage.getItem(localStorage.key(i));
        console.log(jsonString )
        let json = JSON.parse(jsonString);
        console.log(json);
        const todo = new Todo(json.id, json.title, json.description, json.dueDate, json.category, json.creationDate, json.isCompleted);
        todo.render(); 
    }
});

