import { Game } from "./game.js";
let game = new Game();
let player = game.player;
let dealer = game.dealer;
let deck = game.deck;
let plate = game.plate;

const playerhand = document.querySelector("#playerHand");
const bet10 = document.querySelector("#bet10");

bet10.addEventListener("click", ()=> {
    game.bet(10)
    //show button start
});
const Start = document.querySelector("#start");
Start.addEventListener("click", ()=> {
    game.initialize()
    player.hand.forEach((card)=>{
        let cardTarget = document.createElement("div");
        let cardTargetSuite = document.createElement("p");
        let cardTargetValue = document.createElement("p");

        cardTargetSuite.textContent = card.suite
        cardTargetValue.textContent = card.faceValue

        cardTarget.appendChild(cardTargetSuite);
        cardTarget.appendChild(cardTargetValue);
        playerHand.appendChild(cardTarget);
    })
});
