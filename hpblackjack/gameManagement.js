class GameManagement {
    constructor() { 
        this.resultContainer = document.createElement("div");
    }
    resetGame() {
        dealer.resetPlayer();
        player.resetPlayer();
        hitButton.disabled = false;
        standButton.disabled = false;
        this.resultContainer.textContent = "";
    }

    checkWin() {
        const playerValue = player.getHandValue();
        const dealerValue = dealer.getHandValue();
        let result;
        if(dealerValue > 21){
            result = "You won 😍";
        }
        else if (playerValue > 21){
            result = "You Busted";
        } 
        else if(player.hasNaturalBlackJack() && dealer.hasNaturalBlackJack()){
            result = "Push";        
        }
        else if(!player.hasNaturalBlackJack() && dealer.hasNaturalBlackJack()){
            result = "You Lost 😢";        
        }
        else if(player.hasNaturalBlackJack() && !dealer.hasNaturalBlackJack()){
            result = "You made BlackJack, You won 🏆";        
        }
        else if(playerValue === dealerValue){
            result = "Push";
        } 
        else if (playerValue > dealerValue){
            result = "You won";
        } 
        else if (playerValue < dealerValue){
            result = "You lost";
        }
        console.log(result); 
       
        this.resultContainer.textContent = result; 
        this.resultContainer.classList.add("result");
        board.appendChild(this.resultContainer); 
    } 

    playDealerTurn(deck) {
        console.log("turno del dealer");
        console.log(dealer.getHandValue());
        dealer.hand[1].show();
        dealer.renderHand();
        while (dealer.getHandValue() < 17) {
            dealer.drawCard(deck);
        };
        this.checkWin();
    }

    endPlayerTurn() {
        hitButton.disabled = true;
        standButton.disabled = true;
    }

    
}
