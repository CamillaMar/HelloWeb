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
class toDo {
    constructor(title, description, dueDate, category, todoId = 0, createdAt = new Date(), status = false, completedAt = new Date()) {
        this._todoId = todoId;
        this._title = title;
        this._description = description;
        this._createdAt = createdAt;
        this._dueDate = dueDate;
        this._status = status;
        this._categoryId = category;
        this._completedAt = completedAt;
        this.toDoContainer = document.createElement("div");
    }
    get todoId() {
        return this._todoId;
    }
    set todoId(todoId) {
        this._todoId = todoId;
    }
    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }
    get createdAt() {
        return this._createdAt;
    }
    set createdAt(createdAt) {
        this._createdAt = createdAt;
    }
    get dueDate() {
        return this._dueDate;
    }
    set dueDate(dueDate) {
        this._dueDate = dueDate;
    }
    get completedAt() {
        return this._completedAt;
    }
    set completedAt(completedAt) {
        this._completedAt = completedAt;
    }
    get status() {
        return this._status;
    }
    set status(status) {
        this._status = status;
    }
    get categoryId() {
        return this._categoryId;
    }
    set categoryId(categoryId) {
        this._categoryId = categoryId;
    }
    insertToDo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("http://localhost:8080/api/todos", {
                    method: 'POST',
                    body: JSON.stringify({
                        title: this._title,
                        description: this._description,
                        createdAt: this._createdAt,
                        dueDate: this._dueDate,
                        completedAt: this._completedAt,
                        status: this._status,
                        categoryId: this._categoryId
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error("HTTP error" + response.status);
                }
                const data = yield response.json();
                this._todoId = data.todoId;
                console.log("data " + data.todoId);
                console.log(this);
                return data;
            }
            catch (e) {
                console.error("Errore di comunicazione col server" + e);
            }
        });
    }
    getCategoryById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`http://localhost:8080/api/categories/${categoryId}`);
                if (!response.ok) {
                    throw new Error("HTTP error" + response.status);
                }
                const data = yield response.json();
                this._todoId = data.todoId;
                return data;
            }
            catch (e) {
                console.error("Errore di comunicazione col server" + e);
            }
        });
    }
    updateTodo(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`http://localhost:8080/api/todos/${todoId}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        todoId: this._todoId,
                        title: this._title,
                        description: this._description,
                        createdAt: this._createdAt,
                        dueDate: this._dueDate,
                        completedAt: this._completedAt,
                        status: this._status,
                        categoryId: this._categoryId,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error("HTTP error" + response.status + response.statusText);
                }
                const data = yield response.json();
                return data;
            }
            catch (e) {
                console.error("Errore di comunicazione col server" + e);
            }
        });
    }
    deleteTodo(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`http://localhost:8080/api/todos/${todoId}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error("HTTP error" + response.status + response.statusText);
                }
            }
            catch (e) {
                console.error("Errore di comunicazione col server" + e);
            }
        });
    }
    renderToDo() {
        this.toDoContainer.textContent = "";
        const title = document.createElement("h2");
        const description = document.createElement("p");
        const createdAt = document.createElement("p");
        const dueDate = document.createElement("p");
        const status = document.createElement("p");
        const categoryId = document.createElement("p");
        //const category:any = await this.getCategoryById(this._categoryId);
        const statusBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        //title.textContent = "Title: " + this._title + " " + this._todoId + " " + this.todoId;
        title.textContent = JSON.stringify(this);
        description.textContent = "Description: " + this._description;
        createdAt.textContent = "Created At: " + this._createdAt.toLocaleDateString();
        dueDate.textContent = "Due Date: " + (this._dueDate ? new Date(this._dueDate).toLocaleDateString() : "No dueDate");
        status.textContent = "Status: " + (this.status ? "Completed" : "No Completed");
        categoryId.textContent = "Category: " + this.categoryId;
        statusBtn.textContent = !this._status ? "Completed" : "Uncompleted";
        statusBtn.setAttribute("data-action", "complete");
        statusBtn.setAttribute("data-id", "ciao");
        statusBtn.id = `status-btn-${this.todoId}`;
        deleteBtn.textContent = "Delete Todo";
        deleteBtn.setAttribute("data-action", "delete");
        deleteBtn.setAttribute("data-id", "hello");
        deleteBtn.id = `delete-btn-${this.todoId}`;
        const completedDate = document.createElement("p");
        if (this._status && this._completedAt) {
            completedDate.classList.add("completed-date");
            completedDate.textContent = "Completed on:  " + new Date(this._completedAt).toLocaleDateString();
        }
        this.toDoContainer.append(title, description, createdAt, dueDate, status, categoryId);
        if (this._status && this._completedAt) {
            this.toDoContainer.append(completedDate);
        }
        this.toDoContainer.append(statusBtn, deleteBtn);
        this.toDoContainer.classList.add("todo-container");
    }
    completeTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this._status = !this._status;
            this._completedAt = this._status ? new Date() : null;
            yield this.updateTodo(id);
        });
    }
}
//# sourceMappingURL=toDo.js.map