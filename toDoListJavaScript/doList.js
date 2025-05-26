document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todoForm")
    const toDoList = document.getElementById("todoList")

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    let showingCompleted = false;

    function saveToDoList() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function renderTodos() {
        todoList.innerHTML = "";

        todos.forEach((todo, index) => {
            if (!todo.completed) {
                const card = document.createElement("div");
                card.className = "todo-card";

                const title = document.createElement("p")
                const titleLabel = document.createElement("strong");
                titleLabel.textContent = "Title: ";
                title.appendChild(titleLabel);
                title.appendChild(document.createTextNode(todo.title));

                const description = document.createElement("p");
                const descriptionLabel = document.createElement("strong");
                descriptionLabel.textContent = "Description: ";
                description.appendChild(descriptionLabel);
                description.appendChild(document.createTextNode(todo.description));

                const createdAt = document.createElement("p");
                const createdAtLabel = document.createElement("strong");
                createdAtLabel.textContent = "Created at: ";
                createdAt.appendChild(createdAtLabel);
                createdAt.appendChild(document.createTextNode(todo.createdAt));

                const category = document.createElement("p");
                const categoryLabel = document.createElement("strong");
                categoryLabel.textContent = "Category: ";
                category.appendChild(categoryLabel);
                category.appendChild(document.createTextNode(todo.category));

                card.appendChild(title);
                card.appendChild(description);
                card.appendChild(createdAt);

                if (todo.deadline) {
                    const deadline = document.createElement("p");
                    const deadlineLabel = document.createElement("strong");
                    deadlineLabel.textContent = "Deadline: ";
                    deadline.appendChild(deadlineLabel);
                    deadline.appendChild(document.createTextNode(todo.deadline));
                    card.appendChild(deadline);
                }
                const button = document.createElement("button");
                button.textContent = "Complete";
                button.setAttribute("data-index", index);

                const buttonDelete = document.createElement("button");
                buttonDelete.textContent = "Delete";
                buttonDelete.className = "delete-btn"
                buttonDelete.setAttribute("data-index", index);


                card.appendChild(category);
                card.appendChild(button);
                card.appendChild(buttonDelete);
                todoList.appendChild(card);
            }
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const newTodo = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            deadline: document.getElementById("deadline").value || null,
            category: document.getElementById("category").value,
            createdAt: new Date().toLocaleDateString(),
        };

        todos.push(newTodo);
        saveToDoList();
        renderTodos();
    });



    todoList.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (e.target.tagName === "BUTTON") {
            if (e.target.className === "delete-btn") {
                todos.splice(index, 1);
            } else {
                todos[index].completed = true;
                todos[index].completedAt = new Date().toLocaleDateString();
            }
            saveToDoList();
            renderTodos();
        }
    });
});