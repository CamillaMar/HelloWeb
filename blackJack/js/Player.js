class Player {

    constructor() {
        this.hand = [];
    
    }

    getHandValue() {
        let containsAce = false;
        let handValue = 0;
        this.hand.forEach(card => {
            handValue += card.value;
            if (card.rank === 'A') {
                containsAce = true;
            }
        })
        if (handValue > 21 && containsAce) {
            handValue -= 10; 
        }
    }

    addCardToHand(card) {
        this.hand.push(card);
    }
}