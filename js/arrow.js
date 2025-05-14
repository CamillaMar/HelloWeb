const obj = { //example of an object
    name: "pippo",
    languages: ["Java", "JavaScript"],
    sayHello: function () {
        console.log(`Hello from ${this.name}`);
    },
    showLanguages: function () {
        const THIS = this;
        this.languages.forEach(
            (lan) => {
                console.log(lan);
                console.log(this.name);
            }
        );
    }
}
obj.sayHello(); //using functions inside the object
obj.showLanguages();

function globalFunction() { //example of a global function
    console.log(this);
}

globalFunction();
obj.sayHello();
const gHello = obj.sayHello; //saving a function inside a variable
console.log("!!")
gHello(); //calling a variable that contains a functions makes the function lose its context(location of the function)

function makeGreetFunction() {
    const name = "Filippo";
    const lastname = "calugli";
    return function () {  //example of a local function inside a global function
        console.log("Hello " + name+" "+lastname);
    }
}
const sayHello = makeGreetFunction(); //saving the return of a function inside a variable
sayHello();

