import { ToDo } from "/js/todo.js";

let inputTitle = document.querySelector("#title");
let inputDescription = document.querySelector("#description");
let inputDeliveryDate = document.querySelector("#deliveryDate");
let selectCategory = document.querySelector("select");
const today = new Date().toISOString().slice(0, 10);//mette in formato compatibile 
document.querySelector("#deliveryDate").setAttribute("min" ,today);
const form = document.querySelector("form");
const buttonShowToDo = document.querySelector("#showTODO");
const body = document.querySelector("body");
const toDoContainer = document.createElement("article");
const toDoClearer = document.querySelector("#toDoClearer");
let arrOfTodos;
body.insertBefore(toDoContainer, document.querySelector("script"));

if (localStorage.length ===0) {
    arrOfTodos=[];
} else {
    const rawObjects=JSON.parse(localStorage.getItem("arrOfTodos"));
    //arrOfTodos = rawObjects;
    arrOfTodos = rawObjects.map(o =>{ 
        const deliveryDate = new Date(o.deliveryDate);
        const creationDate = new Date(o.creationDate);
        return new ToDo(o.title, o.description, deliveryDate, o.category, creationDate )}
    )
}


form.addEventListener("submit",e =>{
    e.preventDefault();//browser ignora l evento
    const task = new ToDo(inputTitle.value, inputDescription.value, inputDeliveryDate.value, selectCategory.value);
    console.log(task);
    console.log(arrOfTodos);
    arrOfTodos.push(task);
    localStorage.setItem("arrOfTodos", JSON.stringify(arrOfTodos));
    alert("Dati salvati");
})
buttonShowToDo.addEventListener("click", () => {
    toDoContainer.innerHTML="";
    arrOfTodos.forEach(element => {
        console.log(typeof element);
        element.render(toDoContainer, arrOfTodos);
    });
});
toDoClearer.addEventListener("click",()=>{
    localStorage.clear();
    toDoContainer.innerHTML="";
    arrOfTodos.length=0; //svuota array esistente
})

