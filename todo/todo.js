export class Todo{
     
    constructor(id, title, description, dueDate, category, creationDate, isCompleted){
        this.id = id; 
        this.title = title; 
        this.description = description;
        this.dueDate = dueDate;  
        this.category = category;
        this.creationDate = creationDate; 
        this.isCompleted = isCompleted; 
    }  

    render(){
        const todosContainer = document.querySelector("#todosContainer");
        const div = document.createElement("div");
        const title = document.createElement("h3");
        title.textContent = this.title;
        const description = document.createElement("p");
        description.textContent = this.description; 
        const dueDate = document.createElement("div");
        dueDate.textContent = this.dueDate; 
        const category = document.createElement("div");
        category.textContent = this.category; 
        const creationDate = document.createElement("div");
        creationDate.textContent = this.creationDate;
        const isCompleted = document.createElement("div");
        isCompleted.textContent = this.isCompleted; 
        div.appendChild(title);
        div.appendChild(description);
        div.appendChild(dueDate);
        div.appendChild(category);
        div.appendChild(creationDate);
        div.appendChild(isCompleted);
        todosContainer.appendChild(div);
    }
}

