const obj = {
    name: "pippo",
    languages:["Java","JavaScript"],
    sayHello: function(){
        console.log(`Hello from ${this.name}`);
    },
    showLanguages: function(){
        const THIS = this
        this.languages.forEach(
            (lan)=>{
                console.log(lan);
                console.log(this.name);
            }
        );
    }
}
obj.sayHello();
obj.showLanguages();
// this 🔫👮
function globalFunction(){
    console.log(this);
}
globalFunction();
obj.sayHello();
const gHello= obj.sayHello;
gHello();

function makeGreetFunction(){
    const name = "Filippo";
    const lastname = "calugli";
    return function(){
        console.log("Hello "+ name);
    }
}
const sayHello = makeGreetFunction();
sayHello();

