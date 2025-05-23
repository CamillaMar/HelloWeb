class TodoHandler{
    constructor(){
        this.todos = new Array();
        this.todoListContainer = document.querySelector("#todo-list-container");
        this.form = document.querySelector("#create-form");
        this.submitBtn = document.querySelector("#submit-btn");
        this.form.addEventListener("submit", async (event) =>{
            event.preventDefault();
            
            await this.addTodoToList();
            this.renderTodoList();
        });
        this.todoListContainer.addEventListener("click", async (event) => {
            await this.editTodo(event);
        });
    }
    
    async addTodoToList(){
        const inputTitle = document.querySelector("#title").value;
        const inputDescription = document.querySelector("#description").value;
        const inputDueDate = document.querySelector("#due-date").value;
        const selectedCategory = document.querySelector("#category").value;
        
        const newTodo = new Todo(inputTitle, inputDescription, inputDueDate, selectedCategory);
        await newTodo.insertTodo();
        this.todos.push(newTodo);
    }
    
    renderTodoList(){
        this.todoListContainer.textContent = "";
        this.todos.forEach(todo =>{ 
            todo.renderTodo(todo.todoId);
            this.todoListContainer.appendChild(todo.todoContainer);
        });
    }

    async editTodo(event){
        const action = event.target.dataset.action;
        const id = event.target.dataset.id;
        
        if (!action || !id) return;
        
        const todo = this.todos.find(t => t.todoId == id);
        if(!todo) return;
        
        if (action === "complete") {
            await todo.completeTodo(id);
            await todo.renderTodo(id);
        }
        
        if (action === "delete") {
            await todo.deleteTodo(id);
            todo.todoContainer.remove();
            this.todos = this.todos.filter(t => t.todoId != id);
        }
        
    }
}

const todoHandler = new TodoHandler();

document.addEventListener("DOMContentLoaded", () => {
    const inputDueDate = document.querySelector("#due-date");
    const today = new Date().toISOString().split("T")[0];
    inputDueDate.setAttribute("min", today);
});