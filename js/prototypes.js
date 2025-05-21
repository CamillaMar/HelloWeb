const obj = {
    name: 'pippo',
    age: 20
};

console.log(obj.constructor == Object);
console.log(obj.__proto__ == Object.prototype);
console.log(obj.toString());
console.log(obj.__proto__.toString());

function Developer(firstName, lastName, favouriteLanguage) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.favouriteLanguage = favouriteLanguage;
}

const d1 = new Developer('Ciccio', 'Pasticcio', 'JavaScript');
console.log(d1.constructor == Developer);
console.log(d1.__proto__ == Developer.prototype);
console.log(Developer.prototype.constructor == Developer);
console.log(d1.__proto__.__proto__ == Object.prototype);
console.log(d1.toString());

Developer.prototype.writeCode = function() {
    console.log(`${this.firstName} sta scrivendo codice`);
}

Developer.prototype.toString = function() {
    return `${this.firstName} ${this.lastName} ${this.favouriteLanguage}`;
}

d1.writeCode();
console.log(d1.toString());

function Architect(firstName, lastName, favouriteLanguage, seniority, numOfPatterns) {
    Developer.call(this, firstName, lastName, favouriteLanguage); // come super() in Java
    this.seniority = seniority;
    this.numOfPatterns = numOfPatterns;
}

// Architect.prototype = new Developer(); // Metodo 1 (potrebbe creare confusione)
// Object.setPrototypeOf(Architect.prototype, Developer.prototype); // Metodo 2 (modifica il prototype)

// Metodo 3 (metodo migliore, cambia la variabile del prototipo)
// const newProto = Object.create(Developer.prototype);
// newProto.constructor = Architect;
// Architect.prototype = newProto; 
Architect.prototype = Object.create(Developer.prototype);
Architect.prototype.constructor = Architect;

const a1 = new Architect('Mario', 'Rossi', 'Java', 10, 20);
a1.writeCode();
console.log(a1.toString());

console.log(a1.constructor);
console.log(d1.constructor);