let greeting: string = "Hello TypeScript!";
//greeting = 12;
let salute = "Bye-bye TypeScript!"; //Best practice
//salute = false;
let n: number = 3;
let answer: boolean = false;
let list = [1, 2, 3];
let list2 = [];
let z: any = 3;
z = true;
z = "ciao";
let list3: [] = [];
//list3.push(1);
let list4: number[] = [];
const w = 5;
//w = 6;
const constList = [1, 2, 3];
//constList = [3,4,5];
const constList2: readonly number[] = [2, 3, 4]; //sono costanti sia la reference che l'array
constList.push(1);
//constList2.push(1);

//function f1(z){   }
let x1: number | null = 3;
x1 = null;

function f1(p1: number | string, p2: string): number | string {
    if (Math.random() > 0.25) {
        return 25;
    } else {
        return "Pippo";
    }
}

let arrayLorenzo: (string | number)[] = ["ciao", 4]; //esempio di array di due tipi
arrayLorenzo.push(9);
arrayLorenzo.push("ciao2");

let t1: readonly [string, string, number] = ["Pippo", "Paperino", 3]; //esempio di tupla
//t1.push("Alberto");
//t1.push(true);
//t1.push(4);

let myObject: { name: string; age?: number; }
myObject = { name: "Pippo" }

type Person = {
    name: string;
    age: number;
}
let pz: Person = {
    name: "Marco",
    age: 58
}

type id = (number | string | null);
let id1: id = 32;
let id2: id = "pippo";
let id3: id = null;

type Employee = Person & { salary: number; }
let e1: Employee = {
    name: "Luca",
    age: 32,
    salary: 2000.00
}

interface Student {
    name: string;
    favouriteLanguage: string;
    study(hours: number): string;
}
let s1: Student = {
    name: "Ciccio",
    favouriteLanguage: "TypeScript",
    study: function (hours: number): string {
        return "Che faticaccia";
    },
    working: true
}

interface Student {
    working: boolean;
}

interface SeniorStudent extends Student {
    numberOfLanguages: number;
}

interface Student {
    weeksOfVacation?: number;
}