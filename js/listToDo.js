const b = document.querySelector("#send");
b.addEventListener("click", () =>{
    createTodo();
    localStorage.setItem("todoList",JSON.stringify(todoList));
});

const todoList = [];

function createTodo(){
    const newTodo = {
        title: document.querySelector("#title").value,
        description: document.querySelector("#description").value,
        creationDate: new Date(),
        expireDate: document.querySelector("#expire-date").value,
        completionDate: null,
        category: document.querySelector("#category").value,
        completed: document.querySelector("#completed").checked
    };

    if (newTodo.done) {
        newTodo.completionDate = newTodo.creationDate;
    }

    todoList.push(newTodo);
}
