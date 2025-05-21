

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

for (let i = 0; i < tasks.length; i++) {
    task = Object.assign(new Task(), tasks[i]);
    tasks[i] = task;
    task.render();
}

console.log(tasks);

function onSubmit() {
    let newTask = createTask();
}

function createTask() {
    let title = document.querySelector("#title").value;
    let description = document.querySelector("#description").value;
    let category = document.querySelector("#category").value;
    let deadline = document.querySelector("#deadline").value;
    if (title === "" || description === "") {
        alert("Title and description are mandatory!");
        return;
    }
    let task = new Task(title, description, new Date().toLocaleString(), deadline.toLocaleString(), "", "In Progress", category);
    tasks.push(task);
    saveTasks();
    return task;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    location.reload();
}

