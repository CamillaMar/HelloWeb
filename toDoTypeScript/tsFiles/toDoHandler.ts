import { toDo } from "./toDo";

class ToDoHandler {
    private _toDos: toDo[];
    private _toDoListContainer: HTMLDivElement;
    private _form: HTMLFormElement;

    constructor() {
        this._toDos = new Array();
        this._form = <HTMLFormElement>document.querySelector("#create-form")
        this._form.addEventListener("submit", async (event) => {
            event.preventDefault();
            await this.addToDoList();
            await this.renderToDoList();
            
        });

        this._toDoListContainer = <HTMLDivElement>document.querySelector("#todo-list-container");
        this._toDoListContainer.addEventListener("click", async (event:MouseEvent) => {
            const btnId: string = <string>(<HTMLElement>event.target).dataset.id;
            const action: string = <string>(<HTMLElement>event.target).dataset.action;
            console.log(action, btnId);
            const id: number = parseInt(btnId);
            console.log(id)
            await this.editTodo(id, action);
        });
    }

    async addToDoList(): Promise<void> {
        const inputTitle: string = (<HTMLInputElement>document.querySelector("#title")).value;
        const inputDescription: string = (<HTMLInputElement>document.querySelector("#description")).value;
        const inputDueDate: string = (<HTMLInputElement>document.querySelector("#due-date")).value;
        const inputCategory: string = (<HTMLInputElement>document.querySelector("#category")).value;
        const dueDate: Date | null = inputDueDate ? new Date(inputDueDate) : null;

        const categoryId: number = parseInt(inputCategory);
        const newtoDo: toDo = new toDo(inputTitle, inputDescription, dueDate, categoryId);
        await newtoDo.insertToDo();
        console.log("porca miseria " + newtoDo.todoId);
        

        this._toDos.push(newtoDo);
        console.log("log dell'array:");
        
        console.log(JSON.stringify(this._toDos));
        console.log(this._toDos);
        

    }

 async renderToDoList() {
    this._toDoListContainer.textContent = "";
    console.log(JSON.stringify(this._toDos));
    for (const todo of this._toDos) {
        if (todo.todoId != undefined && todo.todoId !== 0) {
            console.log("questo è il todo prima di chiamare renderTodo");            
            console.log(JSON.stringify(todo));
            await todo.renderToDo(); // che togliendo l'async ci da il todoId
            this._toDoListContainer.appendChild(todo.toDoContainer);
        }
    }
}


    async editTodo(id:number, action:string):Promise<void>{
        console.log(this._toDos)
        const todo = this._toDos.find(t => t.todoId == id);
        if(!todo) return;
        
        if (action === "complete") {
            await todo.completeTodo(id);
            await todo.renderToDo();
        }
        
        if (action === "delete") {
            await todo.deleteTodo(id);
            todo.toDoContainer.remove();
            this._toDos = this._toDos.filter(t => t.todoId != id);
        }
    }


}

const handler: ToDoHandler = new ToDoHandler()