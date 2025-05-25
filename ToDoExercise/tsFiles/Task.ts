class Task {
    title: string;
    description: string;
    creationDate: string;
    deadlineDate: string | null;
    completedDate: string | null;
    state: string;
    category: string;

    constructor(title: string, description: string, creationDate: string,
        deadlineDate: string | null, completedDate: string | null, state: string,
        category: string) {
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.deadlineDate = deadlineDate;
        this.completedDate = completedDate;
        this.state = state;
        this.category = category;
    }

    get isActive() {
        return (this.state.toLowerCase() === "in progress");
    }

    render(): void {
        let allTaskSection = document.querySelector("#saved-tasks-section")!;
        let thisTaskSection = document.createElement("section");
        thisTaskSection.classList.add("task-section");

        let titleP = document.createElement("p");
        titleP.textContent = this.title;

        let descriptionP = document.createElement("p");
        descriptionP.textContent = this.description;

        let creationDateP = document.createElement("p");
        creationDateP.textContent = "Created on " + this.creationDate;

        let deadlineP = document.createElement("p");
        if (this.deadlineDate != null) {
            deadlineP.textContent = "Deadline: " + this.deadlineDate;
        }

        let stateP = document.createElement("p");
        if (this.state == "Completed") {
            stateP.textContent = this.state + " on " + this.completedDate;
        }
        else {
            stateP.textContent = this.state;
        }

        let categoryP = document.createElement("p");
        categoryP.textContent = this.category;


        thisTaskSection.append(titleP, descriptionP, creationDateP, deadlineP, stateP, categoryP);
        if (this.state !== "Completed") {
            let completeTaskButton = document.createElement("button");
            completeTaskButton.textContent = "Mark as Complete";
            completeTaskButton.addEventListener("click", () => {
                this.state = "Completed";
                this.completedDate = new Date().toLocaleString();
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