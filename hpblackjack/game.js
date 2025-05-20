const board = document.getElementById("board");
const start = document.getElementById("start");
const player = new Player();
const dealer = new Player();
const hitButton = document.createElement("button");
const standButton = document.createElement("button");
hitButton.textContent = "HIT";
standButton.textContent = "STAY";
const gameManagement = new GameManagement();
const deck = new Deck();

const betBoard = document.createElement("div");
["10", "20", "50", "100"].forEach(val => {
    const btn = document.createElement("button");
    btn.textContent = val;
    btn.dataset.value = val;
    betBoard.appendChild(btn);
});

betBoard.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON") {
        const amount = parseInt(event.target.dataset.value);
        player.bet(amount);
        const buttons = betBoard.querySelectorAll("button");
        [10, 20, 50, 100].forEach(val => {
            if(player.wallet < val){
                event.target.disabled = true; 
            }
        })
        console.log(player.wallet);
    }
});

hitButton.addEventListener("click", () => {
    player.drawCard(deck);
});

standButton.addEventListener("click", () => {
    gameManagement.endPlayerTurn();
    gameManagement.playDealerTurn(deck);
});

player.playerContainer.addEventListener("bust", () => {
    gameManagement.endPlayerTurn();
    gameManagement.checkWin();
});

player.playerContainer.addEventListener("blackjack", () => {
    gameManagement.endPlayerTurn();
    gameManagement.playDealerTurn(deck);
});

player.playerContainer.addEventListener("21", () => {
    gameManagement.endPlayerTurn();
    gameManagement.playDealerTurn(deck);
});

start.addEventListener("click", () => {
    gameManagement.resetGame();
    console.log(deck.cards.length);
    deck.createDeck();
    deck.shuffleDeck();
    board.appendChild(betBoard);
    board.append(dealer.playerContainer, player.playerContainer, hitButton, standButton);
    dealer.drawCard(deck);
    dealer.drawCard(deck);
    dealer.hand[1].hide();
    dealer.renderHand();
    player.drawCard(deck);
    player.drawCard(deck);
    console.log(deck.cards.length);
});

