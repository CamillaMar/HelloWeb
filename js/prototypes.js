const obj = {
	name: 'Pippo',
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
	Developer.call(this, firstName, lastName, favouriteLanguage); //Sto passando il this di questo costruttore al costruttore Developer
	this.seniority = seniority;
	this.numOfPatterns = numOfPatterns;
}

//Architect.prototype = new Developer(); //Metodo 1
//Object.setPrototypeOf(Architect.prototype, Developer.prototype); //Metodo 2
//Architect.prototype = Object.create(Developer.prototype); //Metodo 3//
/* const newProto = Object.create(Developer.prototype)
newProto.constructor = Architect;
Architect.prototype = newProto //Metodo 3 in 2 step (3 con il ambio costruttore) */
Architect.prototype = Object.create(Developer.prototype);
Architect.prototype.constructor = Architect; //Metodo 3 più pulito

const a1 = new Architect('Mario', 'Rossi', 'Java', 10, 20);
a1.writeCode();
console.log(a1.toString());

console.log(a1.constructor);


