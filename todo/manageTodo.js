import { Todos } from "./todos.js";

    // const list = JSON.parse(localStorage.getItem("todoList"));
    // console.log(list);
    // list.forEach(todoArray => {
    //     if(todoArray.isCompleted === true || todoArray.isCompleted === undefined){
    //         return;
    //     } 
    //     const todoDiv = document.createElement("div");
    //     const setComplete = document.createElement("input")
    //     setComplete.setAttribute("type", "checkbox");
    //     todoDiv.innerHTML = `Title: ${todoArray.title}, Description: ${todoArray.description}, Category: ${todoArray.category}, Deadline: ${todoArray.deadline}`
        
    //     setComplete.addEventListener("input", function(){
    //         //delete dalla list
    //         todoArray.isCompleted = true;
    //         //push di nuovo nella lista?
    //     });

    //     const container = document.querySelector("#container");
    //     container.appendChild(todoDiv);
    //     container.appendChild(setComplete);
    // });





export class ManageTodo{
    constructor() {

        const previousData = localStorage.getItem("todoList");
        this.todoList = previousData? JSON.parse(previousData) : [];
        this.form = document.querySelector("form");
        this.title = document.getElementById("title");
        this.description = document.getElementById("description");
        this.deadline = document.getElementById("deadline");
        this.isCompleted = document.getElementById("completed");
        this.category = document.getElementById("category");
        this.container = document.querySelector("#container");
        this.renderTodoTable();

        this.form.addEventListener("submit", (event)=>{
            event.preventDefault();
            const title = this.title.value;
            const description = this.description.value;
            const deadline = this.deadline.value;
            const isCompleted = this.isCompleted.checked;
            const category = this.category.value;
            const date = new Date();
            const todo = new Todos(title, description, deadline, isCompleted, category, date);//aggiungere data completamento
            this.todoList.push(todo);
            // console.log(this.todoList);
            // console.log(JSON.stringify(this.todoList));
            localStorage.setItem("todoList", JSON.stringify(this.todoList));
            this.renderTodoTable();
            
        });
    }
    renderTodoTable(){
        console.log(this.todoList.length);
        const table = document.createElement("table");
        const tHead = table.createTHead();
        const headerRow = tHead.insertRow();
        ["Title", "Description", "Deadline", "Is Completed", "Category"].forEach(
            h => {
                const th = document.createElement('th');
                th.textContent = h;
                headerRow.appendChild(th);
            }
        );
        const tBody= table.createTBody();
        this.todoList.forEach(t => {
            const row = tBody.insertRow();
            const obj = t.toJSON? t.toJSON() : t;
            Object.values(obj).forEach(v => {
                console.log("creo la cella per " + v);
                const cell = row.insertCell();
                cell.textContent = v;
            });
        });
        this.container.innerHTML = "";
        this.container.appendChild(table);
    }
}

const manager = new ManageTodo();

