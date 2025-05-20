class Game {

    constructor() {
        this.deck = new Deck();
        this.deck.shuffle();
        this.player = new Player();
        this.dealer = new Player();
        this.start();
        
    }

    start() {
        let card = this.deck.drawCard();
        this.player.addCardToHand(card);
        card.render(true);

        card = this.deck.drawCard();
        this.player.addCardToHand(card);
        card.render(true);

        card = this.deck.drawCard();
        this.dealer.addCardToHand(card);
        card.render(false);

        card = this.deck.drawCard();
        this.dealer.addCardToHand(card);
        card.render(false);
        

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
        this.checkFinalValues();
        
    }

    checkFinalValues() {
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