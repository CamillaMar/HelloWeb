const board = document.getElementById("board");
const start = document.getElementById("start");
const player = new Player();
const dealer = new Player();
const hitButton = document.createElement("button");
const standButton = document.createElement("button");
hitButton.textContent = "HIT";
standButton.textContent = "STAY";

start.addEventListener("click", () => {
    const deck = new Deck();
    deck.createDeck();
    deck.shuffleDeck();
    hitButton.addEventListener("click", () => {
        player.drawCard(deck);
    });
    standButton.addEventListener("click", () => {
        endPlayerTurn();
    });
    board.append(player.playerContainer, dealer.playerContainer);
    dealer.drawCard(deck);
    dealer.drawCard(deck);
    player.drawCard(deck);
    player.drawCard(deck);
});

