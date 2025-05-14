document.addEventListener("DOMContentLoaded", function(){
//window.addEventListener("load", function(){
    const b = document.getElementById('b1');
    let ps = document.querySelectorAll("article#a1 div section p.beautiful");
    b.onclick = handleClick;
    }
);
function handleClick(){
    alert('Hello again JavaScript');
}
var f = 10;
var x; //variable hoisting
console.log('Hello World');
console.log(x);
console.log('Che bella giornata');
x = 7;
z = 4;

function example() {
    f = 5;
    var h = 6;
}

for(var i = 0; i < 10; i++) {
    var z = 8;
}
console.log(z);
for(let i = 0; i< 10; i++) {
    let z1 = 22;
}
console.log(z1); //così mi darebbe errore

console.log(y);
let y = 3; //mi darebbe errore

const w = 6;
w = 7; //fallirebbe per il const sopra
const arr = [3, 2, 5]; //array in Java Script
arr[0] = 7;
arr = [5, 6, 7]; //questo fallisce perchè arr è costante
