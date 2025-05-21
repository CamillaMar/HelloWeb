class Task {
    constructor(title, description, creationDate, deadlineDate, completedDate, state, category) {
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.deadlineDate = deadlineDate;
        this.completedDate = completedDate;
        this.state = state;
        this.category = category;
    }

    render() {
        let allTaskSection = document.querySelector("#saved-tasks-section");
        let thisTaskSection = document.createElement("section");
        thisTaskSection.classList.add("task-section");

        let titleP = document.createElement("p");
        titleP.textContent = this.title;

        let descriptionP = document.createElement("p");
        descriptionP.textContent = this.description;

        let creationDateP = document.createElement("p");
        creationDateP.textContent = this.creationDate;

        let deadlineP = document.createElement("p");
        deadlineP.textContent = this.deadlineDate;

        let completedP = document.createElement("p");
        completedP.textContent = this.completedDate;

        let stateP = document.createElement("p");
        stateP.textContent = this.state;

        let categoryP = document.createElement("p");
        categoryP.textContent = this.category;


        thisTaskSection.append(titleP, descriptionP, creationDateP, deadlineP, completedP, stateP, categoryP);
        if (this.state !== "Completed") {
            let completeTaskButton = document.createElement("button");
            completeTaskButton.textContent = "Mark as Complete";
            completeTaskButton.addEventListener("click", () => {
                this.state = "Completed";
                saveTasks();
            })
            thisTaskSection.append(completeTaskButton, document.createElement("br"));
        }
        let deleteTaskButton = document.createElement("button");
        deleteTaskButton.textContent = "Delete Task";
        deleteTaskButton.addEventListener("click", () => {
            const index = tasks.indexOf(this);
            tasks.splice(index, 1);
            saveTasks();
        })
        thisTaskSection.append(deleteTaskButton);
        allTaskSection.appendChild(thisTaskSection);
    }
}