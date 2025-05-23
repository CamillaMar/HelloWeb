import { Todo } from "./todo.js";

class TodoHandler{
    private _todos:Todo[];
    private _todoListContainer: HTMLDivElement;
    private _form: HTMLFormElement;

    constructor(){
        this._todos = new Array();
        this._todoListContainer = <HTMLDivElement>document.querySelector("#todo-list-container");
        this._form = <HTMLFormElement>document.querySelector("#create-form");
        this._form.addEventListener("submit", async (event) =>{
            event.preventDefault();
                await this.addTodoToList();

                console.log(this._todos);
                this.renderTodoList();
        });
    }

    async addTodoToList():Promise<void>{
        const inputTitle:string = (<HTMLInputElement>document.querySelector("#title")).value;
        const inputDescription:string = (<HTMLTextAreaElement>document.querySelector("#description")).value;
        const inputDueDate:string = (<HTMLDataElement>document.querySelector("#due-date")).value;
        const selectedCategory:string = (<HTMLSelectElement>document.querySelector("#category")).value;

        const dueDate: Date | null = inputDueDate ? new Date(inputDueDate) : null;
        const categoryId : number = parseInt(selectedCategory)

        const newTodo:Todo = new Todo(inputTitle, inputDescription, dueDate, categoryId);
        await newTodo.insertTodo();
        this._todos.push(newTodo);
    }
    
    renderTodoList(){
        this._todoListContainer.textContent = "";
        this._todos.forEach(todo =>{ 
            todo.renderTodo(todo.todoId);
            this._todoListContainer.appendChild(todo.todoContainer);
        });
        console.log(this._todos);
    }

}

const handler:TodoHandler = new TodoHandler();