const p1 = {
    name: "Pippo",
    lastname: "de Pippis",
    age: 27,
    isMale: true,
    doWork: function (h) {
        console.log(this.name + " lavora per " + h + " ore");
    }
};
const ps = [
    {
        name: "Pippo",
        lastname: "de Pippis",
        age: 27,
        isMale: true
    },
    {
        name: "Gibbo",
        lastname: "Gibbis",
        age: 27,
        isMale: true
    }
];
p1.doWork(10);
p1.nickName = "Turing";

//creiamo dei costruttori
function Developer(name, lastname, nickName, age, isMale) {
    this.name = name;
    this.lastname = lastname;
    this.nickName = nickName;
    this.age = age;
    this.isMale = isMale;

}
Developer.prototype.doWork = function (h) {
    console.log(`Lo sviluppatore ${this.name} lavora per ${h} ore`);
}

const dev = new Developer("Ciccio", "Pasticcio", "gino", 99, true);
console.log(p1.constructor);
console.log(dev.constructor);
const dev2 = Developer("Camilla", "Mila", "Cam", 103, false);
//console.log(dev2.name);
console.log(global.name);
dev.doWork(10);

console.log("_____________");
console.log(dev.__proto__);
console.log(Object.getPrototypeOf(dev));
console.log(dev.__proto__ == Object.getPrototypeOf(dev));
console.log(dev.__proto__ == Developer.prototype);
console.log("_____________");

dev.doWork(10);
const devVoid = new Developer("armando");
console.log(devVoid);
undefined = 3;
const arr = [1, 2, 3];
console.log(arr[3]);
console.log(dev.laurea);
const s = "";
const d = 0;
console.log(s == d);
const myObject = { nome: "Pippolo", cognome: "de Pippoli" };
console.log(myObject == true);
console.log(s === d);