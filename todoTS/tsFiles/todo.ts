export class Todo{
    private _todoId: number;
    private _title: string;
    private _description: string;
    private _createdAt: Date;
    private _dueDate: Date | null;
    private _status: boolean;
    private _category: number;
    private _completedAt: Date | null;
    todoContainer: HTMLDivElement;

    constructor(title:string, description:string, dueDate: Date | null, category:number, todoId:number = 0, createdAt:Date = new Date(), status:boolean = false, completedAt:Date = new Date()){
        this._todoId = todoId;
        this._title = title;
        this._description = description;
        this._createdAt = createdAt;
        this._dueDate = dueDate;
        this._status = status;
        this._category = category;
        this._completedAt = completedAt;
        this.todoContainer = document.createElement("div");
    }

    get title(){
        return this._title;
    }
    set title(title){
        this._title = title;
    }
    get description(){
        return this._description;
    }
    set description(description){
        this._description = description;
    }
    get createdAt(){
        return this._createdAt;
    }
    set createdAt(createdAt){
        this._createdAt = createdAt;
    }
    get dueDate(){
        return this._dueDate;
    }
    set dueDate(dueDate){
        this._dueDate = dueDate;
    }
    get status(){
        return this._status;
    }
    set status(status){
        this._status = status;
    }
    get category(){
        return this._category;
    }
    set category(category){
        this._category = category;
    }
    get completedAt(){
        return this._completedAt;
    }
    set completedAt(completedAt){
        this._completedAt = completedAt;
    }
    get todoId(){
        return this._todoId;
    }
    set todoId(todoId){
        this._todoId = todoId;
    }

    async getTodoById(todoId:number):Promise<any>{
        try {
            const response:Response = await fetch(`http://localhost:8080/api/todos/${todoId}`);
            if (!response.ok) {
                    throw new Error("HTTP error" + response.status);
            }
            const data:Todo = await response.json();
            console.log(data);
            return data;
        } catch (e:any) {
            console.error("Errore di comunicazione col server" + e);
        }
    }

    async getCategoryById(categoryId:number):Promise<any>{
        try {
            const response:Response = await fetch(`http://localhost:8080/api/categories/${categoryId}`);
            if (!response.ok) {
                throw new Error("HTTP error" + response.status);
            }
            const data:any = await response.json();
            console.log(data);
            return data;
        } catch (e:any) {
            console.error("Errore di comunicazione col server" + e);
        } 
    }

    async insertTodo(): Promise<any>{
                try{
            const response:Response = await fetch("http://localhost:8080/api/todos", {
                method:'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title : this._title,
                    description: this._description,
                    createdAt: this._createdAt,
                    dueDate: this._dueDate,
                    status: this._status,
                    categoryId: this._category,
                })
            });
            if (!response.ok) {
                throw new Error("HTTP error" + response.status);
            }
            const data:Todo = await response.json();
            this._todoId = data.todoId;
            console.log(data);
            return data;
        } catch (e:any) {
            console.error("Errore di comunicazione col server" + e);
        }
    }

    async updateTodo():Promise<any>{
        try{
            const response: Response = await fetch(`http://localhost:8080/api/todos/${this._todoId}`, {
                method:'PUT',
                body: JSON.stringify({
                    todoId: this._todoId,
                    title: this._title,
                    description: this._description,
                    createdAt: this._createdAt,
                    dueDate: this._dueDate,
                    completedAt: this._completedAt,
                    status: this._status,
                    categoryId: this._category
                }),
                headers:  {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error("HTTP error" + response.status + response.statusText);
            }
            const data:Todo = await response.json();
            console.log(data);
            return data;
        } catch (e:any) {
            console.error("Errore di comunicazione col server" + e);
        }
    }

    async deleteTodo():Promise<void>{
        try{
            const response:Response = await fetch(`http://localhost:8080/api/todos/${this._todoId}`, {
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

    async renderTodo():Promise<void>{
        this.todoContainer.textContent = "";
        const categoryName:any = await this.getCategoryById(this._category);

        const cardTitle:HTMLHeadingElement = document.createElement("h2");
        const cardDescription:HTMLParagraphElement = document.createElement("p");
        const creationDate:HTMLParagraphElement = document.createElement("p");
        const deadline:HTMLParagraphElement = document.createElement("p");
        const cardStatus:HTMLParagraphElement = document.createElement("p");
        const cardCategory:HTMLElement = document.createElement("strong");
        const statusBtn:HTMLButtonElement = document.createElement("button");
        const deleteBtn:HTMLButtonElement = document.createElement("button");

        cardTitle.textContent = "Title:     " + this._title;
        cardDescription.textContent = "Description:     " + this._description;
        creationDate.textContent = "Creation date:    " + (this._createdAt ? this._createdAt.toLocaleDateString() : "");
        deadline.textContent = "Due date:   " + (this._dueDate ?  new Date(this._dueDate).toLocaleDateString() : "No due date");
        cardStatus.textContent = "Status:   " + (this._status ? "Completed" : "Not completed");
        cardCategory.textContent = "Category: " + categoryName.categoryName;

        statusBtn.textContent = !this._status ? "Completed" : "Uncompleted";
        statusBtn.setAttribute("data-action", "complete");
        statusBtn.setAttribute("data-id", this._todoId.toString());
        statusBtn.id = `status-btn-${this._todoId}`;
    
        deleteBtn.textContent = "Delete Todo";
        deleteBtn.setAttribute("data-action", "delete");
        deleteBtn.setAttribute("data-id", this._todoId.toString());
        deleteBtn.id = `delete-btn-${this._todoId}`;

        const completedDate = document.createElement("p");
        if (this._status && this._completedAt) {
            completedDate.classList.add("completed-date");
            completedDate.textContent = "Completed on:  " + new Date(this._completedAt).toLocaleDateString();
        }
        
        this.todoContainer.append(cardTitle, cardDescription, creationDate, deadline, cardCategory, cardStatus);
        
        if (this._status && this._completedAt) {
            this.todoContainer.append(completedDate);
        }
    
        this.todoContainer.append(statusBtn, deleteBtn);
        this.todoContainer.classList.add("todo-container");
    }

    async completeTodo():Promise<void>{
        this._status = !this._status;
        this._completedAt = this._status ? new Date() : null;
        await this.updateTodo();
    }
}