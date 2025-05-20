class Deck{
    static suits = ['♠️', '♥️', '♦️', '♣️'];
    static cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    constructor(){
        this.cards = new Array();
    }
    
    createDeck(){
        for(let suit of Deck.suits) {
            for(let value of Deck.cardValues){
                this.cards.push(new Card(suit, value));
                this.cards.push(new Card(suit, value));
                this.cards.push(new Card(suit, value));
                this.cards.push(new Card(suit, value));
            }
        }
    }

    shuffleDeck(){
        for(let i = this.cards.length - 1; i>0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            console.log(i, j);
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
            console.log(i, j);
        }
    }
}
