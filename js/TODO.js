
export class ToDo {
    title;
    description;
    creationDate;//auto
    deliveryDate;//auto
    category;
    isCompleted;
    constructor(title, descrition, deliveryDate, category,  creationDate =  new Date()) {
        this.title =title;
        this.description = descrition;
        this.creationDate = creationDate;
        this.deliveryDate = deliveryDate;
        this.category = category;
        this.isCompleted = false;
        //this.toDoDiv = document.createElement("div");

    }
    toggleIsCompleted(statusBtn){
        this.isCompleted === true?this.isCompleted=false:this.isCompleted=true;
        statusBtn.textContent = this.isCompleted ? "Mark as UnCompleted" : "Mark as Completed";

    };
    toString(){
        console.log(this.title);
        console.log(this.category);
        console.log(this.description);
        console.log(this.creationDate);
        console.log(this.deliveryDate);
        this.isCompleted?console.log("Status: Completed"):console.log("Status: Uncompleted");
    };
    fillCategories(tagCategory) {
        tagCategory.innerHTML = "";
        const original = document.querySelector("#originalSelect");
        Array.from(original.options).forEach(opt => {
            if (opt.disabled) return;
            const clone = opt.cloneNode(true);
            if (clone.value === this.category) {
                clone.selected = true;
            }
            tagCategory.appendChild(clone);
        });
    }
    render(parent, arrOfTodos) {

        const container = document.createElement("div");
        container.classList.add("singleToDo");

        const title = document.createElement("input");
        title.classList.add("titleToDo");
        title.value = this.title;
        title.disabled = true;

        const category=document.createElement("select");
        category.classList.add("categoryToDo");
        const opt = document.createElement("option");
        opt.textContent = this.category;
        category.appendChild(opt);
        category.disabled = true;

        const desc = document.createElement("textArea");
        desc.textContent = this.description;
        desc.classList.add("descriptionToDo");
        desc.disabled = true;

        const butModify = document.createElement("button");
        butModify.textContent = "Modifica";
        butModify.classList.add("btModify","visible");

        const btConfirmChanges = document.createElement("button");
        btConfirmChanges.classList.add("btConfirmChanges", "hidden");
        btConfirmChanges.textContent="Conferma";


        const divGrid=document.createElement("div");
        divGrid.classList.add("divGrid");
        const meta = document.createElement("small");
        meta.textContent = 
        `Creato: ${this.creationDate.toLocaleString()} • ` +
        `Consegna: ${this.deliveryDate.toLocaleString()}`;
        meta.classList.add("metaToDo");

        const statusBtn = document.createElement("button");
        statusBtn.classList.add("btToggleStatus")
        statusBtn.textContent = this.isCompleted ? "Mark as UnCompleted" : "Mark as Completed";
        statusBtn.addEventListener("click", () => this.toggleIsCompleted(statusBtn));
        const removeToDo = document.createElement("button");
        removeToDo.classList.add("btRemoveToDo");
        
        removeToDo.innerText="Remove To Do";
        removeToDo.addEventListener("click", ()=>{
            container.remove();
            console.log("rimosso to do");
            const indexThisToDO = arrOfTodos.findIndex(toDo => toDo.title===this.title);
            arrOfTodos.splice(indexThisToDO, 1);
            localStorage.setItem("arrOfTodos", JSON.stringify(arrOfTodos));

        })
        butModify.addEventListener("click", ()=>{
            desc.disabled=false;
            title.disabled=false;
            category.disabled=false;
            butModify.classList.add("hidden");
            butModify.classList.remove("visible");
            btConfirmChanges.classList.add("visible");
            btConfirmChanges.classList.remove("hidden");
            this.fillCategories(category);

        })
        btConfirmChanges.addEventListener("click", ()=>{
            desc.disabled=true;
            title.disabled=true;
            category.disabled=true;
            butModify.classList.remove("hidden");
            butModify.classList.add("visible");
            btConfirmChanges.classList.add("hidden");
            btConfirmChanges.classList.remove("visible");
            this.title = title.value;
            this.description=desc.value;
            this.category=category.value;
            localStorage.setItem("arrOfTodos", JSON.stringify(arrOfTodos));

        })

        divGrid.appendChild(meta);
        divGrid.appendChild(statusBtn);
        divGrid.appendChild(removeToDo);

        container.appendChild(title);
        container.appendChild(category);
        container.appendChild(desc);
        container.appendChild(butModify);
        container.appendChild(btConfirmChanges);

        container.appendChild(divGrid);
        parent.appendChild(container);
        
    }
}