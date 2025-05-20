let game = new Game();
console.log(game);

let hitButton = document.createElement("button");
hitButton.textContent = "hit";

let stayButton = document.createElement("button");
stayButton.textContent = "stay";

document.querySelector("main section.buttons").appendChild(hitButton);
document.querySelector("main section.buttons").appendChild(stayButton);


hitButton.addEventListener("click", () => {
    game.onHit();
    if (game.hasPlayerBusted()) {
        hitButton.disabled = true;
        stayButton.disabled = true;
    }
});

stayButton.addEventListener("click", () => {
    hitButton.disabled = true;
    stayButton.disabled = true;
    game.onStay();
});

