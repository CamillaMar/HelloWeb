class DataManager{

    static loadData(key = "list"){
        return DataManager.nullToEmptyArray(JSON.parse(sessionStorage.getItem(key)));
    }
    static saveData(data, key = "list"){
        const list = DataManager.loadData(key);
        list.push(data);
        sessionStorage.setItem(key, JSON.stringify(list));
    }

    static nullToEmptyArray(value){
        return value ? value : [];
    }
    static createToDo(){
        debugger;
        const obj = new ToDo(
            document.querySelector("#input-titolo").value,
            document.querySelector("#input-descrizione").value,
            document.querySelector("#input-categoria").value,
            document.querySelector("#input-data-scadenza").value
        )
        return obj;
    }
}

