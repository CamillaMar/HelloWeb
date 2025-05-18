const board = document.querySelector("#game-board");
const start = document.querySelector("#start");
const player = new Player();
const computer = new Player();
const hitBtn = document.createElement("button");
const standBtn = document.createElement("button");
const resultContainer = document.createElement("div");
const endGame = document.createElement("div");
board.appendChild(resultContainer);

player.playerContainer.addEventListener("bust", () =>{
    endGame.textContent = "You Busted LOSER BUUUUUUUUUUUUU";
    endPlayerTurn();
});

player.playerContainer.addEventListener("blackjack", () =>{
    endGame.textContent = "bella per te";
    endPlayerTurn();
    console.log("DEBUG BLACKJACK");
    console.log(computer.hand[1]); 
    playDealerTurn();
});

player.playerContainer.addEventListener("21", () =>{
    endGame.textContent = "hai fatto 21, mo aspetta di vedere cosa fa il computer mica è finita eh";
    endPlayerTurn();
    playDealerTurn();
});

hitBtn.classList.add("hit-button");
hitBtn.textContent = "hit";
hitBtn.addEventListener("click", () =>{
    console.log("il giocatore sta pescando");
    console.log(player.hand);
    player.drawCard();
});

standBtn.classList.add("stand-button");
standBtn.textContent = "stand";
standBtn.addEventListener("click", () =>{
    endPlayerTurn();
    playDealerTurn();
})

start.addEventListener("click", () => {
    reset();
    resultContainer.classList.remove("result-board");
    
    board.append(computer.playerContainer, player.playerContainer, hitBtn, standBtn, endGame);

    computer.drawCard();
    computer.drawCard();
    console.log("cpu", computer.hand);
    computer.hand[1].hide();
    computer.renderHand();

    player.drawCard();
    player.drawCard();
    console.log("player", player.hand);

})

const suits = ['♠', '♥', '♦', '♣'];
const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function createCard(){
    const randSuit = suits[Math.floor(Math.random() * suits.length)];
    const randValue = cardValues[Math.floor(Math.random() * cardValues.length)];
    const card = new Card(randSuit, randValue);
    if(randSuit == '♥' || randSuit == '♦'){
        card.makeRed();
    }
    console.log(card);    
    return card;
}

function playDealerTurn(){
    computer.hand[1].show();
    computer.renderHand();
    while (computer.getHandValue() < 17) {
        computer.drawCard();
    }
    setTimeout(() => {
        checkWin();
    }, 1000);
}

function endPlayerTurn(){
    hitBtn.disabled = true;
    standBtn.disabled = true;
}

function checkWin(){
    const plHandValue = player.getHandValue();
    const cpuHandValue = computer.getHandValue();
    let result;
    if(cpuHandValue > 21){
        result = "win";
    }
    else if(computer.hasNaturalBlackjack() && player.hasNaturalBlackjack()){
        result = "push";
    }
    else if(!computer.hasNaturalBlackjack() && player.hasNaturalBlackjack()){
        result = "win";
    }
    else if(computer.hasNaturalBlackjack() && !player.hasNaturalBlackjack()){
        result = "loss";
    }
    else if(cpuHandValue > plHandValue){
        result = "loss";
    }
    else if(cpuHandValue == plHandValue){
        result = "push";
    }
    else {
        result ="win";
    }

    resultContainer.textContent = result;
    resultContainer.classList.add("result-board");
    board.appendChild(resultContainer);
}

function reset(){
    computer.reset();
    player.reset();
    hitBtn.disabled = false;
    standBtn.disabled = false;
    endGame.textContent = "";
    resultContainer.textContent = "";
}