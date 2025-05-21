class Game {

    constructor() {
        this.deck = new Deck();
        this.deck.shuffle();
        this.player = new Player("player");
        this.dealer = new Player("dealer");
        this.start();

    }

    start() {
        this.player.addCardToHand(this.deck.drawCard());
        this.player.addCardToHand(this.deck.drawCard());

        this.dealer.addCardToHand(this.deck.drawCard());
        this.dealer.addCardToHand(this.deck.drawCard());

        this.dealer.hideCard(1);
    }

    onHit() {
        this.player.addCardToHand(this.deck.drawCard());

        if (this.player.has21()) {
            this.onStay();
        }
        if (this.player.hasBusted()) {
            showGameResult("Busted!!!");
            this.dealer.showCard(1);
        }
    }

    onStay() {
        this.dealer.showCard(1);
        while (this.dealer.getHandValue() < 17) {
            this.dealer.addCardToHand(this.deck.drawCard());
        }
        this.checkFinalValues();

    }

    checkFinalValues() {
        if (this.player.getHandValue() === this.dealer.getHandValue()) {
            showGameResult("It's a draw");
        } else if (this.dealer.hasBusted() || this.player.getHandValue() > this.dealer.getHandValue()) {
            showGameResult("You win!");
        } else {
            showGameResult("You lose! :c");
        }
    }
}