import { Todos } from "./todos.js";

document.addEventListener("DOMContentLoaded", function(){
    console.log(localStorage.getItem("todoList"));
     
});
 const todoList = [];

export class ManageTodo{
    constructor(todoList) {

        this.todoList = todoList;
        this.form = document.querySelector("form");
        this.title = document.getElementById("title");
        this.description = document.getElementById("description");
        this.deadline = document.getElementById("deadline");
        this.isCompleted = document.getElementById("completed");
        this.category = document.getElementById("category");

        this.form.addEventListener("submit", (event)=>{
            event.preventDefault();
            const title = this.title.value;
            const description = this.description.value;
            const deadline = this.deadline.value;
            const isCompleted = this.isCompleted.checked;
            const category = this.category.value;

            // console.log("Titolo:", title);
            // console.log("Descrizione:", description);
            // console.log("Scadenza:", deadline);
            // console.log("Completato:", completed);
            // console.log("Categoria:", category);
            const date = new Date();

            const todo = new Todos(title, description, deadline, isCompleted, category, date);//aggiungere data completamento
            todoList.push(todo);
            // console.log(todoList);
            // console.log(JSON.stringify(todoList));
            localStorage.setItem("todoList", JSON.stringify(todoList));
            
        });
    }
}

const manager = new ManageTodo(todoList);

