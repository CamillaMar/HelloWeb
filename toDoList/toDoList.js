document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todoForm");
  const todoList = document.getElementById("todoList");

  const showCompletedBtn = document.createElement("button");
  showCompletedBtn.textContent = "Mostra completate";
  form.parentNode.insertBefore(showCompletedBtn, form.nextSibling);

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

 // variabile per vedere se è completata
  let showingCompleted = false;

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
      if (showingCompleted ? todo.completed : !todo.completed) {
        const card = document.createElement("div");
        card.className = "todo-card";

        const title = document.createElement("h3");
        title.textContent = todo.title;

        const description = document.createElement("p");
        description.textContent = todo.description;

        const createdAt = document.createElement("p");
        const createdAtLabel = document.createElement("strong");
        createdAtLabel.textContent = "Creato il: ";
        createdAt.appendChild(createdAtLabel);
        createdAt.appendChild(document.createTextNode(todo.createdAt));

        const category = document.createElement("p");
        const categoryLabel = document.createElement("strong");
        categoryLabel.textContent = "Categoria: ";
        category.appendChild(categoryLabel);
        category.appendChild(document.createTextNode(todo.category));

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(createdAt);

        if (todo.deadline) {
          const deadline = document.createElement("p");
          const deadlineLabel = document.createElement("strong");
          deadlineLabel.textContent = "Scadenza: ";
          deadline.appendChild(deadlineLabel);
          deadline.appendChild(document.createTextNode(todo.deadline));
          card.appendChild(deadline);
        }

        card.appendChild(category);

        // Bottone "Segna come completato" solo se sto mostrando i non completati
        if (!todo.completed) {
          const button = document.createElement("button");
          button.textContent = "Segna come completato";
          button.setAttribute("data-index", index);
          card.appendChild(button);
        } else {
          // Mostra la data di completamento se è completato
          const completedAt = document.createElement("p");
          const completedAtLabel = document.createElement("strong");
          completedAtLabel.textContent = "Completato il: ";
          completedAt.appendChild(completedAtLabel);
          completedAt.appendChild(document.createTextNode(todo.completedAt));
          card.appendChild(completedAt);

        }

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
      completedAt: null,
      completed: false,
    };

    todos.push(newTodo);
    saveTodos();
    renderTodos();
    form.reset();
  });

  todoList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const index = e.target.dataset.index;
      todos[index].completed = true;
      todos[index].completedAt = new Date().toLocaleDateString();
      saveTodos();
      renderTodos();
    }
  });

  // Gestione click sul bottone "Mostra completate"
  showCompletedBtn.addEventListener("click", () => {
    showingCompleted = !showingCompleted;
    showCompletedBtn.textContent = showingCompleted ? "Mostra da fare" : "Mostra completate";
    renderTodos();
  });

  renderTodos();
});
