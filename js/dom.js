const b = document.querySelector("button");
console.log(b);
b.addEventListener("click", () =>  {
    console.log(this); //il this è l'oggetto che ha generato l'evento, il listener però dev'essere una funzione e non una lambda o altro
});

