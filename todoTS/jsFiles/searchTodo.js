export class SearchTodo {
    _searchForm;
    _filteredTodos;
    constructor() {
        this._searchForm = document.getElementById('search-form');
        this._filteredTodos = new Array();
    }
    async getTodosByFilter() {
        const formData = new FormData(this._searchForm);
        const params = new URLSearchParams();
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
            return data;
        }
        catch (e) {
            console.error("Errore di comunicazione col server" + e);
        }
    }
    async addFilteredTodo() {
        const todos = await this.getTodosByFilter();
        this._filteredTodos.push(todos);
    }
}
//# sourceMappingURL=searchTodo.js.map