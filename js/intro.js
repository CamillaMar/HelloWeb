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