class Player {

    constructor(className) {
        this.hand = [];
        this.className = className; //"player" o "dealer" per prendere la playerSection
        this.playerSection = document.querySelector("." + className);
        this.handValueText = document.createElement("p"); //testo per visualizzare il valore totale di una mano
        this.handValueText.classList.add("hand-value");
        this.playerSection.appendChild(this.handValueText);
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
        return handValue;
    }

    has21() {
        return this.getHandValue() == 21;
    }

    hasBusted() {
        return this.getHandValue() > 21;
    }

    addCardToHand(card) {
        this.hand.push(card);
        card.render(this.className == "player");
        this.renderHandValue();
    }

    hideCard(positionIndex) {
        this.hand[positionIndex].hide();
        this.renderHandValue();
    }

    showCard(positionIndex) {
        this.hand[positionIndex].show();
        this.renderHandValue();
    }

    hasHiddenCards() {
        return this.hand.some(card => card.isHidden);
        //some=se un qualsiasi elemento dell'array rispetta il predicate
    }

    renderHandValue() {
        let handValue = this.getHandValue();
        this.handValueText.textContent = this.hasHiddenCards() ? "??" : handValue;;
    }
}