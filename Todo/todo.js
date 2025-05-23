class Todo{
    completedAt;

    constructor(title, description, dueDate, category){
        this.title = title;
        this.description = description;
        this.createdAt = new Date();
        this.dueDate = dueDate;
        this.isCompleted = false;
        this.category = category;
        this.todoContainer = document.createElement("div");
    }

    async getTodoById(todoId){
        try {
            const response = await fetch(`http://localhost:8080/api/todos/${todoId}`);
            if (!response.ok) {
                throw new Error("HTTP error" + response.status);
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error("Errore di comunicazione col server" + e);
        } 
    }

    async getCategoryById(categoryId){
        try {
            const response = await fetch(`http://localhost:8080/api/categories/${categoryId}`);
            if (!response.ok) {
                throw new Error("HTTP error" + response.status);
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error("Errore di comunicazione col server" + e);
        } 
    }

    async insertTodo(){
        try {
            const response = await fetch("http://localhost:8080/api/todos", {
                method:'POST',
                body: JSON.stringify({
                    title : this.title,
                    description: this.description,
                    createdAt: this.createdAt,
                    dueDate: this.dueDate,
                    status: this.isCompleted,
                    categoryId: this.category,
                }), 
                headers:  {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error("HTTP error" + response.status);
            }
            const data = await response.json();
            console.log(data);
            this.todoId = data.todoId;
            return data;
        } catch (e) {
            console.error("Errore di comunicazione col server" + e);
        }
    }

    async updateTodo(todoId){
        const todo = await this.getTodoById(todoId);
        
        try{
            const response = await fetch(`http://localhost:8080/api/todos/${todoId}`, {
                method:'PUT',
                body: JSON.stringify({
                    todoId: todoId,
                    title: this.title,
                    description: this.description,
                    createdAt: this.createdAt,
                    dueDate: this.dueDate,
                    completedAt: this.completedAt,
                    status: this.isCompleted,
                    categoryId: this.category
                }),
                headers:  {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error("HTTP error" + response.status + response.statusText);
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error("Errore di comunicazione col server" + e);
        }
    }

    async deleteTodo(todoId){
        const todo = await this.getTodoById(todoId);
        
        try{
            const response = await fetch(`http://localhost:8080/api/todos/${todoId}`, {
                method:'DELETE',
                headers:  {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error("HTTP error" + response.status + response.statusText);
            }
            
        } catch (e) {
            console.error("Errore di comunicazione col server" + e);
        }
    }

    async getTodosByFilter(param, value) {
        try {
            const response = await fetch("http://localhost:8080/api/todos?" + param + "=" + value);
            if (!response.ok) {
                throw new Error("HTTP error" + response.status);
            }
            const data = await response.json();
            return data;
        } catch (e) {
            console.error("Errore di comunicazione col server" + e);
        }
    }

    async renderTodo(id){
        this.todoContainer.textContent = "";
        const categoryName = await this.getCategoryById(this.category);

        const cardTitle = document.createElement("h2");
        const cardDescription = document.createElement("p");
        const creationDate = document.createElement("p");
        const deadline = document.createElement("p");
        const cardStatus = document.createElement("p");
        const statusBtn = document.createElement("button");
        const cardCategory = document.createElement("strong");
        const deleteBtn = document.createElement("button");
        
        cardTitle.textContent = "Title: " + this.title;
        cardDescription.textContent = "Description: " + this.description;
        creationDate.textContent = "Creation date: " + this.createdAt.toLocaleDateString();
        deadline.textContent = "Due date: " + (this.dueDate ?  new Date(this.dueDate).toLocaleDateString() : "No due date");
        cardStatus.textContent = "Status: " + (this.isCompleted ? "Completed" : "Not completed");
        cardCategory.textContent = "Category: " + categoryName.categoryName;
        
        statusBtn.textContent = !this.isCompleted ? "Mark as completed" : "Mark as uncompleted";
        statusBtn.dataset.value = id;
        statusBtn.setAttribute("data-action", "complete");
        statusBtn.setAttribute("data-id", id);

        
        deleteBtn.textContent = "Delete Todo";
        deleteBtn.dataset.value = id;
        deleteBtn.textContent = "Delete Todo";
        deleteBtn.setAttribute("data-action", "delete");
        deleteBtn.setAttribute("data-id", id);
        
        const completedDate = document.createElement("p");
        if (this.isCompleted && this.completedAt) {
            completedDate.classList.add("completed-date");
            completedDate.textContent = "Completion date: " + new Date(this.completedAt).toLocaleDateString();
        }

        this.todoContainer.append(cardTitle, cardDescription, creationDate, deadline, cardCategory, cardStatus);
        
        if (this.isCompleted && this.completedAt) {
            this.todoContainer.append(completedDate);
        }
    
        this.todoContainer.append(statusBtn, deleteBtn);
    }

    async completeTodo(id){
        this.isCompleted = !this.isCompleted;
        this.completedAt = this.isCompleted ? new Date() : null;
        await this.updateTodo(id);
    }
}