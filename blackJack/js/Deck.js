class Deck {
    ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    suits = ['♥️', '♦️', '♣️', '♠️'];

    constructor() {
        this.deck = this.generate();
    }

    generate() {
        let tempDeck = [];
        let value = 0;
        this.suits.forEach(suit => {
            this.ranks.forEach(rank => {
                if (rank === 'A') {
                    value = 11;
                } else if (rank === 'J' || rank === 'Q' || rank === 'K') {
                    value = 10;
                } else {
                    value = parseInt(rank);
                }
                let card = new Card(suit, rank, value);
                tempDeck.push(card);
            })
        });
        return tempDeck;
    }

    shuffle() {
        for (let i = 0; i <= 380; i++) {
            let random1 = Math.floor(Math.random() * this.deck.length);
            let random2 = Math.floor(Math.random() * this.deck.length);
            let temp = this.deck[random1];
            this.deck[random1] = this.deck[random2];
            this.deck[random2] = temp;
        }
    }

    drawCard() {
        return this.deck.pop();
    }
}