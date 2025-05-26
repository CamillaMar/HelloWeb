import { Todo } from "./todo.js";
import { SearchTodo } from "./searchTodo.js";
import { DataService } from "./dataService.js";

export class TodoHandler{
    private _todos:Todo[];
    private _todoListContainer: HTMLDivElement;
    private _form: HTMLFormElement;
    private _searchForm: HTMLFormElement;
    private _dataService: DataService;

    constructor(){
        this._todos = new Array();
        this._dataService = new DataService();

        this._form = <HTMLFormElement>document.querySelector("#create-form");
        this._form.addEventListener("submit", async (event) =>{
            event.preventDefault();

            await this.addTodoToList();
            this.renderTodoList();
        });

        this._todoListContainer = <HTMLDivElement>document.querySelector("#todo-list-container");
        this._todoListContainer.addEventListener("click", async (event:MouseEvent) => {
            const btnId: string = <string>(<HTMLElement>event.target).dataset.id;
            const action: string = <string>(<HTMLElement>event.target).dataset.action;
            const id: number = parseInt(btnId);

            const todo = this._todos.find(t => t.todoId == id);

            if(todo != undefined && action == "complete"){
                await this.editTodo(todo);
            }
            if(todo != undefined && action == "delete"){
                await this.removeTodo(todo);
            }
        });

        this._searchForm = document.getElementById('search-form') as HTMLFormElement;
        this._searchForm.addEventListener('submit', async (e) => {
            e.preventDefault();   

            await this.addFilteredTodo();
            this.renderTodoList();
        });
    }

    async addTodoToList():Promise<void>{
        const inputTitle:string = (<HTMLInputElement>document.querySelector("#title")).value;
        const inputDescription:string = (<HTMLTextAreaElement>document.querySelector("#description")).value;
        const inputDueDate:string = (<HTMLInputElement>document.querySelector("#due-date")).value;
        const selectedCategory:string = (<HTMLSelectElement>document.querySelector("#category")).value;

        const dueDate: Date | null = inputDueDate ? new Date(inputDueDate) : null;
        const categoryId : number = parseInt(selectedCategory);

        const newTodo:Todo = new Todo(inputTitle, inputDescription, dueDate, categoryId);
        
        await this._dataService.insertTodo(newTodo);
        this._todos.push(newTodo);
    }
    
    renderTodoList(){
        this._todoListContainer.textContent = "";
        this._todos.forEach(todo =>{ 
            if(todo.todoId != undefined){
                todo.renderTodo();
                this._todoListContainer.appendChild(todo.todoContainer);
            }
        });
    }

    async editTodo(todo: Todo):Promise<void>{
        if(!todo) return;
        
        await todo.completeTodo();
        await todo.renderTodo();
    }

    async removeTodo(todo: Todo):Promise<void>{
        if(!todo) return;

        await this._dataService.deleteTodo(todo);
        todo.todoContainer.remove();
        this._todos = this._todos.filter(t => t.todoId != todo.todoId);
    }

    async addFilteredTodo(): Promise<void>{
        this._todos.length = 0;
        const todos = await this._dataService.getTodosByFilter(this);
        todos.forEach(todo =>{
            this._todos.push(todo);
        })
    }

    get searchForm(){
        return this._searchForm;
    }
}

const handler:TodoHandler = new TodoHandler();

document.addEventListener("DOMContentLoaded", () => {
    const inputDueDate: HTMLElement = <HTMLElement>document.querySelector("#due-date");
    const today: string = new Date().toISOString().split("T")[0];
    inputDueDate.setAttribute("min", today);
});