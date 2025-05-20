class Player {
    constructor(){
        this.hand = new Array();
        this.playerContainer = document.createElement("div");
        this.playerContainer.classList.add("player-container");
        this.handContainer = document.createElement("div");
        this.handContainer.classList.add("hand-container");
        this.handValueContainer = document.createElement("div");
        this.playerContainer.appendChild(this.handContainer);
    }

    drawCard(deck){
        this.hand.push(deck.removeCard());
        this.renderHand();
    }
    renderHand(){
        this.handContainer.textContent = "";
        this.hand.forEach(card => {
            this.handContainer.appendChild(card.cardContainer);
        });

        this.handValueContainer.textContent = `total: ${this.getHandValue()}`;
        this.playerContainer.appendChild(this.handValueContainer);
    }

    getHandValue(){
        let sum = 0;
        let hasA = false;
        this.hand.forEach(card => {
            if(card.value == 'A'){
                hasA = true;
            }
            sum += card.getNumericValue();
        });
        if(sum > 21 && hasA){
            sum -= 10;
        }
        return sum;
    }

    hasNaturalBlackJack(){
        return this.getHandValue() == 21 && this.hand.length == 2;
    }
}