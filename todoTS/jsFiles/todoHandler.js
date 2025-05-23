import { Todo } from "./todo.js";
class TodoHandler {
    _todos;
    _todoListContainer;
    _form;
    constructor() {
        this._todos = new Array();
        this._todoListContainer = document.querySelector("#todo-list-container");
        this._form = document.querySelector("#create-form");
        this._form.addEventListener("submit", async (event) => {
            event.preventDefault();
            await this.addTodoToList();
            console.log(this._todos);
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
            todo.renderTodo(todo.todoId);
            this._todoListContainer.appendChild(todo.todoContainer);
        });
        console.log(this._todos);
    }
}
const handler = new TodoHandler();
//# sourceMappingURL=todoHandler.js.map