let x = 3;
console.log(x);
console.log(x * x + 1);
class Example {
  private name: string = "ciccio";
}

//
export class ExampleModule {
  #privateVariable: string;

  constructor() {
    this.#privateVariable = 'I am private';
  }

  private privateMethod(): string {
    return 'Private Method Output';
  }

  publicMethod(): string {
    return `Public Method Output - ${this.#privateVariable}`;
  }
}

let num: number = 5;
let str: string = "5";

// if (num == str) {
//   console.log("Equal");
// } else {
//   console.log("Not Equal");
// }

const z = "Bye-bye"