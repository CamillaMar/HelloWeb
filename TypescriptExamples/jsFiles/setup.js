let x = 3;
console.log(x);
console.log(x * x + 1);
class Example {
    name = "ciccio";
}
//
export class ExampleModule {
    #privateVariable;
    constructor() {
        this.#privateVariable = 'I am private';
    }
    privateMethod() {
        return 'Private Method Output';
    }
    publicMethod() {
        return `Public Method Output - ${this.#privateVariable}`;
    }
}
let num = 5;
let str = "5";
// if (num == str) {
//   console.log("Equal");
// } else {
//   console.log("Not Equal");
// }
const z = "Bye-bye";
