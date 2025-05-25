let storageTasks: any[] = JSON.parse(localStorage.getItem("tasks") ?? "[]");
let tasks: Task[] = [];

storageTasks.forEach(storageTask => {
    let newTask: Task = new Task(storageTask.title, storageTask.description, storageTask.creationDate, storageTask.deadlineDate, storageTask.completedDate, storageTask.state, storageTask.category);
    tasks.push(newTask);
    newTask.render();
});

console.log(tasks);

function onSubmit(): void {
    createTask();
}

function createTask(): void {
    let title = (document.querySelector("#title")! as HTMLInputElement).value;
    let description = (document.querySelector("#description")! as HTMLInputElement).value;
    let category = (document.querySelector("#category")! as HTMLInputElement).value;
    let deadline = (document.querySelector("#deadline")! as HTMLInputElement).value;
    if (title === "" || description === "") {
        alert("Title and description are mandatory!");
        return;
    }
    let task = new Task(
        title,
        description,
        new Date().toLocaleString(),
        deadline ? new Date(deadline).toLocaleString() : null,
        null,
        "In Progress",
        category);
    tasks.push(task);
    saveTasks();
}

function saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    location.reload();
}

function renderActiveTasks(): void {
    let allTaskSection = document.querySelector("#saved-tasks-section")!;
    allTaskSection.replaceChildren(); //svuota la section
    let activeTasks: Task[] = [];
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