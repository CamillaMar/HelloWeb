class Persona{
    constructor(firstName, lastName, age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

};
Persona.prototype.saluta = function pippo(){
    console.log(`Sono ${this.firstName} e ti saluto`);
};
console.log(Persona.prototype);
console.log(Persona.prototype.constructor);

function Police(firstName, lastName, age, yearsOfService){
    new Persona(this, firstName, lastName, age);
    this.yearsOfService = yearsOfService;
};
// Metodo 3 (metodo migliore, cambia la variabile del prototipo)
const newProto = Object.create(Persona.prototype);
newProto.constructor = Police();
Police.prototype = newProto; 
let poliziotto = new Police("Pippo", "Pippis",1,30);

console.log(poliziotto);

console.log(poliziotto.constructor);
poliziotto.saluta();