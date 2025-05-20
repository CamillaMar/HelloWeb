let game = new Game();
console.log(game);

let hitButton = document.createElement("button");
hitButton.textContent = "hit";

let stayButton = document.createElement("button");
stayButton.textContent = "stay";

document.body.appendChild(hitButton);
document.body.appendChild(stayButton);

hitButton.addEventListener("click", () => {
    game.onHit();
    console.log(game);
});

stayButton.addEventListener("click", () => {
    hitButton.disabled = true;
    stayButton.disabled = true;
    game.onStay();
});

