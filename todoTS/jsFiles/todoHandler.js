import { Todo } from "./todo.js";
class TodoHandler {
    _todos;
    _todoListContainer;
    _form;
    _searchForm;
    constructor() {
        this._todos = new Array();
        this._form = document.querySelector("#create-form");
        this._form.addEventListener("submit", async (event) => {
            event.preventDefault();
            await this.addTodoToList();
            this.renderTodoList();
        });
        this._todoListContainer = document.querySelector("#todo-list-container");
        this._todoListContainer.addEventListener("click", async (event) => {
            const btnId = event.target.dataset.id;
            const action = event.target.dataset.action;
            const id = parseInt(btnId);
            await this.editTodo(id, action);
        });
        this._searchForm = document.getElementById('search-form');
        this._searchForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.addFilteredTodo();
            this.renderTodoList();
        });
    }
    async addTodoToList() {
        const inputTitle = document.querySelector("#title").value;
        const inputDescription = document.querySelector("#description").value;
        const inputDueDate = document.querySelector("#due-date").value;
        const selectedCategory = document.querySelector("#category").value;
        const dueDate = inputDueDate ? new Date(inputDueDate) : null;
        const categoryId = parseInt(selectedCategory);
        const newTodo = new Todo(inputTitle, inputDescription, dueDate, categoryId);
        await newTodo.insertTodo();
        this._todos.push(newTodo);
    }
    renderTodoList() {
        this._todoListContainer.textContent = "";
        this._todos.forEach(todo => {
            if (todo.todoId != undefined) {
                todo.renderTodo(todo.todoId);
                this._todoListContainer.appendChild(todo.todoContainer);
            }
        });
        console.log(this._todos);
    }
    async editTodo(id, action) {
        const todo = this._todos.find(t => t.todoId == id);
        if (!todo)
            return;
        if (action === "complete") {
            await todo.completeTodo(id);
            await todo.renderTodo(id);
        }
        if (action === "delete") {
            await todo.deleteTodo(id);
            todo.todoContainer.remove();
            this._todos = this._todos.filter(t => t.todoId != id);
        }
    }
    async getTodosByFilter() {
        const formData = new FormData(this._searchForm);
        const params = new URLSearchParams();
        for (const [key, value] of formData.entries()) {
            if (value) {
                params.append(key, value.toString());
            }
            console.log(key);
            console.log(value);
            console.log(`http://localhost:8080/api/todos?${params.toString()}`);
        }
        try {
            const response = await fetch(`http://localhost:8080/api/todos?${params.toString()}`);
            if (!response.ok) {
                throw new Error("HTTP error" + response.status);
            }
            const data = await response.json();
            console.log(data);
            return data.map((item) => new Todo(item.title, item.description, item.dueDate ? new Date(item.dueDate) : null, item.categoryId, item.todoId, item.createdAt ? new Date(item.createdAt) : new Date(), item.status, item.completedAt ? new Date(item.completedAt) : new Date()));
        }
        catch (e) {
            console.error("Errore di comunicazione col server" + e);
            return [];
        }
    }
    async addFilteredTodo() {
        this._todos.length = 0;
        const todos = await this.getTodosByFilter();
        todos.forEach(todo => {
            this._todos.push(todo);
        });
    }
}
const handler = new TodoHandler();
document.addEventListener("DOMContentLoaded", () => {
    const inputDueDate = document.querySelector("#due-date");
    const today = new Date().toISOString().split("T")[0];
    inputDueDate.setAttribute("min", today);
});
//# sourceMappingURL=todoHandler.js.map