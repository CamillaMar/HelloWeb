export class Todos {
    #title;
    #description;
    #deadline;
    #isCompleted;
    #category;
    #creationDate;

   constructor(title, description,deadline,isCompleted,category,creationDate){
    this.#title = title;
    this.#description = description;
    this.#deadline = deadline;
    this.#isCompleted = isCompleted;
    this.#category = category;
    this.#creationDate = creationDate;
   }

   toJSON() {
        return {
        title: this.title,
        description: this.description,
        deadline: this.deadline,
        completed: this.completed,
        category: this.category
        }
    }

    get title(){
        return this.#title;
    }

    get description(){
        return this.#description;}

    get deadline(){
        return this.#deadline;}  
        
    get isCompleted(){
        return this.#isCompleted;}
        
    get category(){
        return this.#category;}
    
    get creationDate(){
        return this.#creationDate;}  
}