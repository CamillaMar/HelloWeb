class Player{
    constructor(){
        this.hand = new Array();
        this.playerContainer = document.createElement("div");
        this.handContainer = document.createElement("div");
        this.handContainer.classList.add("hand-container");
        this.handValueContainer = document.createElement("div"); 
        this.playerContainer.appendChild(this.handContainer);
    }

    drawCard(){
        this.hand.push(createCard());
        this.renderHand();
        
        if(this.getHandValue() > 21){
            this.playerContainer.dispatchEvent(new CustomEvent("bust"));
        }
        if(this.hasNaturalBlackjack()){
            this.playerContainer.dispatchEvent(new CustomEvent("blackjack"));
        } 
        else if(this.getHandValue() == 21){
            this.playerContainer.dispatchEvent(new CustomEvent("21"));
        }
    }
    
    renderHand(){
        this.handContainer.textContent = "";
        let isTotalHidden = false;
        this.hand.forEach(card =>{
            if(card.isHidden){
                isTotalHidden = true;
            }
            this.handContainer.appendChild(card.container);
        });
        this.handValueContainer.textContent = "Total: " + (isTotalHidden ? "??" : this.getHandValue());
        this.handContainer.appendChild(this.handValueContainer);
    }

    getHandValue(){
        let sum = 0;
        let hasA = false;
        this.hand.forEach(card =>{
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

    hasNaturalBlackjack(){
        return this.getHandValue() == 21 && this.hand.length == 2;
    }

    reset(){
        this.hand = [];
        console.log("mano del giocatore");
        console.log(this.hand);
        this.handContainer.innerText = "";
        this.handValueContainer.innerText = "";
    }
}