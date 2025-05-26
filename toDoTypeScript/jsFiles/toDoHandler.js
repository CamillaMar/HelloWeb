"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const toDo_1 = require("./toDo");
class ToDoHandler {
    constructor() {
        this._toDos = new Array();
        this._form = document.querySelector("#create-form");
        this._form.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            yield this.addToDoList();
            yield this.renderToDoList();
        }));
        this._toDoListContainer = document.querySelector("#todo-list-container");
        this._toDoListContainer.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
            const btnId = event.target.dataset.id;
            const action = event.target.dataset.action;
            console.log(action, btnId);
            const id = parseInt(btnId);
            console.log(id);
            yield this.editTodo(id, action);
        }));
    }
    addToDoList() {
        return __awaiter(this, void 0, void 0, function* () {
            const inputTitle = document.querySelector("#title").value;
            const inputDescription = document.querySelector("#description").value;
            const inputDueDate = document.querySelector("#due-date").value;
            const inputCategory = document.querySelector("#category").value;
            const dueDate = inputDueDate ? new Date(inputDueDate) : null;
            const categoryId = parseInt(inputCategory);
            const newtoDo = new toDo_1.toDo(inputTitle, inputDescription, dueDate, categoryId);
            yield newtoDo.insertToDo();
            console.log("porca miseria " + newtoDo.todoId);
            this._toDos.push(newtoDo);
            console.log("log dell'array:");
            console.log(JSON.stringify(this._toDos));
            console.log(this._toDos);
        });
    }
    renderToDoList() {
        return __awaiter(this, void 0, void 0, function* () {
            this._toDoListContainer.textContent = "";
            console.log(JSON.stringify(this._toDos));
            for (const todo of this._toDos) {
                if (todo.todoId != undefined && todo.todoId !== 0) {
                    console.log("questo è il todo prima di chiamare renderTodo");
                    console.log(JSON.stringify(todo));
                    yield todo.renderToDo(); // che togliendo l'async ci da il todoId
                    this._toDoListContainer.appendChild(todo.toDoContainer);
                }
            }
        });
    }
    editTodo(id, action) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this._toDos);
            const todo = this._toDos.find(t => t.todoId == id);
            if (!todo)
                return;
            if (action === "complete") {
                yield todo.completeTodo(id);
                yield todo.renderToDo();
            }
            if (action === "delete") {
                yield todo.deleteTodo(id);
                todo.toDoContainer.remove();
                this._toDos = this._toDos.filter(t => t.todoId != id);
            }
        });
    }
}
const handler = new ToDoHandler();
//# sourceMappingURL=toDoHandler.js.map