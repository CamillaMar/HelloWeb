let game = new Game();

let hitButton = document.createElement("button");
hitButton.textContent = "hit";

let centralSection = document.createElement("div");
centralSection.textContent = " Choose your next move!";

let restartButton = document.createElement("button");
restartButton.textContent = "Restart game";
restartButton.addEventListener("click", () => {
    location.reload();
})

let stayButton = document.createElement("button");
stayButton.textContent = "stay";

document.querySelector("main section.buttons").appendChild(hitButton);
document.querySelector("main section.buttons").appendChild(centralSection);
document.querySelector("main section.buttons").appendChild(stayButton);


hitButton.addEventListener("click", () => {
    game.onHit();
});

stayButton.addEventListener("click", () => {
    game.onStay();
});

function showGameResult(resultString) {
    hitButton.disabled = true;
    stayButton.disabled = true;
    let resultText = document.createElement("div");
    resultText.classList.add("result");
    resultText.textContent = resultString;
    centralSection.textContent = "";
    centralSection.appendChild(resultText);
    centralSection.appendChild(restartButton);
}


