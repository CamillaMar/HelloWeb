"use strict";
let greeting = "Hello TypeScript!";
//greeting = 12;
let salute = "Bye-bye TypeScript!"; //Best practice
//salute = false;
let n = 3;
let answer = false;
let list = [1, 2, 3];
let list2 = [];
let z = 3;
z = true;
z = "ciao";
let list3 = [];
//list3.push(1);
let list4 = [];
const w = 5;
//w = 6;
const constList = [1, 2, 3];
//constList = [3,4,5];
const constList2 = [2, 3, 4]; //sono costanti sia la reference che l'array
constList.push(1);
//constList2.push(1);
//function f1(z){   }
let x1 = 3;
x1 = null;
function f1(p1, p2) {
    if (Math.random() > 0.25) {
        return 25;
    }
    else {
        return "Pippo";
    }
}
let arrayLorenzo = ["ciao", 4]; //esempio di array di due tipi
arrayLorenzo.push(9);
arrayLorenzo.push("ciao2");
let t1 = ["Pippo", "Paperino", 3]; //esempio di tupla
//t1.push("Alberto");
//t1.push(true);
//t1.push(4);
let myObject;
myObject = { name: "Pippo" };
let pz = {
    name: "Marco",
    age: 58
};
let id1 = 32;
let id2 = "pippo";
let id3 = null;
let e1 = {
    name: "Luca",
    age: 32,
    salary: 2000.00
};
let s1 = {
    name: "Ciccio",
    favouriteLanguage: "TypeScript",
    study: function (hours) {
        return "Che faticaccia";
    },
    working: true
};
