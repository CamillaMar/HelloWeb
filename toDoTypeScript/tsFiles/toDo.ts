import { Category } from "./category";

export class toDo {
    private _todoId: number;
    private _title: string;
    private _description: string;
    private _createdAt: Date;
    private _dueDate: Date | null;
    private _completedAt: Date | null;
    private _status: boolean;
    private _categoryId: number;
    toDoContainer: HTMLDivElement;

      constructor(title:string, description:string, dueDate: Date | null, category:number, todoId:number = 0, 
                 createdAt:Date = new Date(), status:boolean = false, completedAt:Date = new Date()){
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
    get todoId(){
        return this._todoId;
    }
    set todoId(todoId){
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

    set description (description) {
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

    async insertToDo(): Promise<toDo | undefined> {
        try {
            const response: Response = await fetch("http://localhost:8080/api/todos", {
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
            const data:toDo = await response.json();
            this._todoId = data.todoId;
            console.log("data " + data.todoId);
            console.log(this);
            return data;
        } catch (e) {
            console.error("Errore di comunicazione col server" + e);
        }
    }

    async getCategoryById(categoryId: number): Promise<Category | undefined> {
        try {
            const response: Response = await fetch(`http://localhost:8080/api/categories/${categoryId}`);
            if (!response.ok) {
                throw new Error("HTTP error" + response.status);
            }
            const data: Category = await response.json();
            // this._todoId = data.todoId;
            return data;
        } catch (e: any) {
            console.error("Errore di comunicazione col server" + e);
        }
    }

     async updateTodo(todoId:number):Promise<toDo | undefined>{
        try{
            const response: Response = await fetch(`http://localhost:8080/api/todos/${todoId}`, {
                method:'PUT',
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
                headers:  {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error("HTTP error" + response.status + response.statusText);
            }
            const data:toDo = await response.json();
            return data;
        } catch (e:any) {
            console.error("Errore di comunicazione col server" + e);
        }
    }

    async deleteTodo(todoId:number):Promise<void>{
        try{
            const response:Response = await fetch(`http://localhost:8080/api/todos/${todoId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error("HTTP error" + response.status + response.statusText);
            }
        } catch (e:any) {
            console.error("Errore di comunicazione col server" + e);
        }
    }


     async renderToDo(): Promise<void> {
        console.log("appena dentro il renderTodo");
        console.log(this._todoId);
        
        this.toDoContainer.textContent = "";
        const title: HTMLHeadingElement = document.createElement("h2");
        const description: HTMLParagraphElement = document.createElement("p");
        const createdAt: HTMLParagraphElement = document.createElement("p");
        const dueDate: HTMLParagraphElement = document.createElement("p");
        const status: HTMLParagraphElement = document.createElement("p");
        const categoryId: HTMLParagraphElement = document.createElement("p");
        const category:any = await this.getCategoryById(this._categoryId);
        const statusBtn:HTMLButtonElement = document.createElement("button");
        const deleteBtn:HTMLButtonElement = document.createElement("button");

        title.textContent = "Title: " + this._title + " " + this._todoId + " " + this.todoId;
        description.textContent = "Description: " + this._description;
        createdAt.textContent = "Created At: " + this._createdAt.toLocaleDateString();
        dueDate.textContent = "Due Date: " + (this._dueDate ? new Date(this._dueDate).toLocaleDateString() : "No dueDate");
        status.textContent = "Status: " + (this.status ? "Completed" : "No Completed");
        categoryId.textContent = "Category: " + this.categoryId;

        statusBtn.textContent = !this._status ? "Completed" : "Uncompleted";
        statusBtn.setAttribute("data-action", "complete");
        statusBtn.setAttribute("data-id", `${this._todoId}`);
        statusBtn.id = `status-btn-${this.todoId}`;

        deleteBtn.textContent = "Delete Todo";
        deleteBtn.setAttribute("data-action", "delete");
        deleteBtn.setAttribute("data-id", `${this._todoId}`);
        deleteBtn.id = `delete-btn-${this.todoId}`;

        const completedDate = document.createElement("p");
        if (this._status && this._completedAt) {
            completedDate.classList.add("completed-date");
            completedDate.textContent = "Completed on:  " + new Date(this._completedAt).toLocaleDateString();
        }

        this.toDoContainer.append(title, description,createdAt,dueDate,status,categoryId);
         if (this._status && this._completedAt) {
            this.toDoContainer.append(completedDate);
        }
    
        this.toDoContainer.append(statusBtn, deleteBtn);
        this.toDoContainer.classList.add("todo-container");

        
    }
     async completeTodo(id:number):Promise<void>{
        this._status = !this._status;
        this._completedAt = this._status ? new Date() : null;
        await this.updateTodo(id);
    }
}
