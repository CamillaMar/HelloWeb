"use strict";
var _a;
let storageTasks = JSON.parse((_a = localStorage.getItem("tasks")) !== null && _a !== void 0 ? _a : "[]");
let tasks = [];
storageTasks.forEach(storageTask => {
    let newTask = new Task(storageTask.title, storageTask.description, storageTask.creationDate, storageTask.deadlineDate, storageTask.completedDate, storageTask.state, storageTask.category);
    tasks.push(newTask);
    newTask.render();
});
console.log(tasks);
function onSubmit() {
    createTask();
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
    let task = new Task(title, description, new Date().toLocaleString(), deadline ? new Date(deadline).toLocaleString() : null, null, "In Progress", category);
    tasks.push(task);
    saveTasks();
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    location.reload();
}
function renderActiveTasks() {
    let allTaskSection = document.querySelector("#saved-tasks-section");
    allTaskSection.replaceChildren(); //svuota la section
    let activeTasks = [];
    tasks.forEach(task => {
        if (task.isActive) {
            activeTasks.push(task);
            task.render();
        }
    });
    if (activeTasks.length === 0) {
        allTaskSection.textContent = "There are no active tasks";
    }
}
//# sourceMappingURL=reminder.js.map