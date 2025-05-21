const board = document.getElementById("board");
const start = document.getElementById("start");
const player = new Player();
const dealer = new Player();
dealer.playerContainer.id = "dealer";
const btnContainer = document.createElement("div");
btnContainer.classList.add("btn-container");
const hitButton = document.createElement("button");
const standButton = document.createElement("button");
hitButton.textContent = "HIT";
standButton.textContent = "STAY";
const gameManagement = new GameManagement();
const deck = new Deck();

const betBoard = document.createElement("div");
betBoard.classList.add("bet-board");
["10", "20", "50", "100"].forEach(val => {
    const btn = document.createElement("button");
    btn.classList.add("bet-btn");
    btn.textContent = val;
    btn.dataset.value = val;
    betBoard.appendChild(btn);
});
betBoard.appendChild(player.walletContainer);

betBoard.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON") {
        const amount = parseInt(event.target.dataset.value);
        player.bet(amount);
        gameManagement.checkAvailableButton();
        console.log(player.wallet);
    }
});

hitButton.addEventListener("click", () => {
    if(player.betAmount == 0){
        alert("Devi puntare, prima di giocare")
    } else{
        player.drawCard(deck);
    }
    
});

standButton.addEventListener("click", () => {
    if(player.betAmount == 0){
        alert("Devi puntare, prima di giocare")
    } else{
        gameManagement.endPlayerTurn();
        gameManagement.playDealerTurn(deck);
    }
});

player.playerContainer.addEventListener("bust", () => {
    gameManagement.endPlayerTurn();
    gameManagement.checkWin();
});

player.playerContainer.addEventListener("blackjack", () => {
     if(player.betAmount == 0){
        alert("Devi puntare, prima di giocare")
    } else{
        gameManagement.endPlayerTurn();
        gameManagement.playDealerTurn(deck);
    }
});

player.playerContainer.addEventListener("21", () => {
   if(player.betAmount == 0){
        alert("Devi puntare, prima di giocare")
    } else{
        gameManagement.endPlayerTurn();
        gameManagement.playDealerTurn(deck);
    }
});

start.addEventListener("click", () => {

    gameManagement.resetGame();
    console.log(deck.cards.length);
    deck.createDeck();
    deck.shuffleDeck();
    board.appendChild(betBoard);
    btnContainer.append(hitButton, standButton);
    board.append(dealer.playerContainer, player.playerContainer, btnContainer);
    dealer.drawCard(deck);
    dealer.drawCard(deck);
    dealer.hand[1].hide();
    dealer.renderHand();
    player.drawCard(deck);
    player.drawCard(deck);

    console.log(deck.cards.length);
});

