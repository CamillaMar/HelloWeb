class Game {

    constructor() {
        this.deck = new Deck();
        this.deck.shuffle();
        this.player = new Player();
        this.dealer = new Player();
        this.start();
        
    }

    start() {
        this.player.addCardToHand(this.deck.drawCard());
        this.player.addCardToHand(this.deck.drawCard());
        this.dealer.addCardToHand(this.deck.drawCard());
        this.dealer.addCardToHand(this.deck.drawCard());

    }

    onHit() {
        this.player.addCardToHand(this.deck.drawCard());
        console.log(this.dealer.hand);
        console.log(this.player.hand);
    }

    onStay() {
        while (this.dealer.getHandValue() < 17) {
            this.dealer.addCardToHand(this.deck.drawCard());
            console.log("Dealers hand: "+this.dealer.getHandValue());
        }
        this.checkFinalScores();
        
    }

    checkFinalScores() {
        if (this.player.getHandValue() === this.dealer.getHandValue()) {
            console.log("Hai pareggiato");
        } else if (this.dealer.getHandValue() > 21 || this.player.getHandValue() > this.dealer.getHandValue()) {
            console.log("Hai vinto!");
        } else {
            console.log("Hai perso! :c");
        }
    }
    
    hasPlayerBusted() {
        if (this.player.getHandValue() > 21) {
            console.log("Hai sballatoooo!");
            return true;
        }
        return false;
    }
}