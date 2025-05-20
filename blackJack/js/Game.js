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
    }

    onStay() {
        
    }

}