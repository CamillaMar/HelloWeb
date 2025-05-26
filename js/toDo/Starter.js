document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#save-button").addEventListener("click", () => {
        const data = DataManager.createToDo();
        DataManager.saveData(data, "list");
        debugger;
        UI.renderTable(DataManager.loadData(), "todo-container");
    });
});