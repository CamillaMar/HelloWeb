import { Category } from "./category";
import { Todo } from "./todo";
import { TodoHandler } from "./todoHandler";

export class DataService{
    constructor(){
    }

    async getTodoById(todoId:number):Promise<Todo | undefined>{
        try {
            const response:Response = await fetch(`http://localhost:8080/api/todos/${todoId}`);
            if (!response.ok) {
                    throw new Error("HTTP error" + response.status);
            }
            const data:Todo = await response.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error("Errore di comunicazione col server" + e);
        }
    }

    async getCategoryById(categoryId:number):Promise<Category | undefined>{
        try {
            const response:Response = await fetch(`http://localhost:8080/api/categories/${categoryId}`);
            if (!response.ok) {
                throw new Error("HTTP error" + response.status);
            }
            const data: Category = await response.json();
            console.log(data);
            return data;
        } catch (e) {
            console.error("Errore di comunicazione col server" + e);
        } 
    }

    async insertTodo(todo: Todo): Promise<Todo | undefined>{
        try{
            const response:Response = await fetch("http://localhost:8080/api/todos", {
                method:'POST',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title : todo.title,
                    description: todo.description,
                    createdAt: todo.createdAt,
                    dueDate: todo.dueDate,
                    status: todo.status,
                    categoryId: todo.category,
                })
            });
            if (!response.ok) {
                throw new Error("HTTP error" + response.status);
            }
            const data:Todo = await response.json();
            todo.todoId = data.todoId;
            console.log(data);
            return data;
        } catch (e) {
            console.error("Errore di comunicazione col server" + e);
        }
    }

    async updateTodo(todo: Todo):Promise<Todo | undefined>{
        try{
            const response: Response = await fetch(`http://localhost:8080/api/todos/${todo.todoId}`, {
                method:'PUT',
                body: JSON.stringify({
                    todoId: todo.todoId,
                    title: todo.title,
                    description: todo.description,
                    createdAt: todo.createdAt,
                    dueDate: todo.dueDate,
                    completedAt: todo.completedAt,
                    status: todo.status,
                    categoryId: todo.category
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

    async deleteTodo(todo: Todo):Promise<void>{
        try{
            const response:Response = await fetch(`http://localhost:8080/api/todos/${todo.todoId}`, {
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

    async getTodosByFilter(handler: TodoHandler) :Promise<Todo[]>{
        const formData: FormData = new FormData(handler.searchForm);
        const params:URLSearchParams = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
            if (value) {
                params.append(key, value.toString());
            }
            console.log(key);
            console.log(value); 
            console.log(`http://localhost:8080/api/todos?${params.toString()}`);
        }
        

        try {
            const response = await fetch(`http://localhost:8080/api/todos?${params.toString()}`);
            if (!response.ok) {
                throw new Error("HTTP error" + response.status);
            }
            const data = await response.json();
            console.log(data);

            return data.map((item: any) => new Todo(
                item.title,
                item.description,
                item.dueDate ? new Date(item.dueDate) : null,
                item.categoryId,
                item.todoId,
                item.createdAt ? new Date(item.createdAt) : new Date(),
                item.status,
                item.completedAt ? new Date(item.completedAt) : new Date()
            ));
        } catch (e) {
            console.error("Errore di comunicazione col server" + e);
            return [];
        }
    }
}