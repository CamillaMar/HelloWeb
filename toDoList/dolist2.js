class ToDoApp {
    constructor(formId, listId) {
        this.form = document.getElementById(formId);
        this.todoList = document.getElementById(listId);
        this.todos = JSON.parse(localStorage.getItem("todos")) || [];
        
        this.bindEvents();
        this.renderTodos();
    }
    
    renderTodos() {
        this.todoList.innerHTML = "";
        this.todos.forEach((todo, index) => {
            if (!todo.completed) {
                const card = document.createElement("div");
                card.className = "todo-card";

                card.appendChild(this.createInfoElement("Title", todo.title));
                card.appendChild(this.createInfoElement("Description", todo.description));
                card.appendChild(this.createInfoElement("Created at", todo.createdAt));
                card.appendChild(this.createInfoElement("Category", todo.category));

                if (todo.deadline) {
                    card.appendChild(this.createInfoElement("Deadline", todo.deadline));
                }

                const completeBtn = document.createElement("button");
                completeBtn.textContent = "Complete";
                completeBtn.setAttribute("data-index", index);

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.className = "delete-btn";
                deleteBtn.setAttribute("data-index", index);

                card.appendChild(completeBtn);
                card.appendChild(deleteBtn);

                this.todoList.appendChild(card);
            }
        });
    }
    
    bindEvents() {
        this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
        this.todoList.addEventListener("click", this.handleListClick.bind(this));
    }

    saveToLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const newTodo = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            deadline: document.getElementById("deadline").value || null,
            category: document.getElementById("category").value,
            createdAt: new Date().toLocaleDateString(),
            completed: false
        };
        this.todos.push(newTodo);
        this.saveToLocalStorage();
        this.renderTodos();
        this.form.reset();
    }

    handleListClick(event) {
        const index = event.target.dataset.index;
        if (event.target.tagName === "BUTTON") {
            if (event.target.classList.contains("delete-btn")) {
                this.todos.splice(index, 1);
            } else {
                this.todos[index].completed = true;
                this.todos[index].completedAt = new Date().toLocaleDateString();
            }
            this.saveToLocalStorage();
            this.renderTodos();
        }
    }


    createInfoElement(labelText, value) {
        const p = document.createElement("p");
        const label = document.createElement("strong");
        label.textContent = `${labelText}: `;
        p.appendChild(label);
        p.appendChild(document.createTextNode(value));
        return p;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ToDoApp("todoForm", "todoList");
});