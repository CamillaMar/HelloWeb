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
        this.checkAvailableButton();
        this.resultContainer.classList.remove("result");
    }

    checkWin() {
        const playerValue = player.getHandValue();
        const dealerValue = dealer.getHandValue();
        let result;
        if (playerValue > 21){
            result = "You Busted";
        } 
        else if(player.hasNaturalBlackJack() && dealer.hasNaturalBlackJack()){
            result = "Push";   
            console.log(player.betAmount);   
            player.wallet += player.betAmount;  
        }
        else if(!player.hasNaturalBlackJack() && dealer.hasNaturalBlackJack()){
            result = "You Lost 😢";        
        }
        else if(player.hasNaturalBlackJack() && !dealer.hasNaturalBlackJack()){
            result = "You made BlackJack, You won 🏆"; 
            player.addWin(player.betAmount);       
        }
        else if(playerValue === dealerValue){
            result = "Push";
            console.log(player.betAmount);
            player.wallet += player.betAmount;
        } 
        else if(dealerValue > 21){
            result = "You won 😍"; 
            player.addWin(player.betAmount);
        }
        else if (playerValue > dealerValue){
            result = "You won";
            player.addWin(player.betAmount);
        } 
        else if (playerValue < dealerValue){
            result = "You lost";
        }
        console.log(result); 
       
        this.resultContainer.textContent = result; 
        this.resultContainer.classList.add("result");
        board.appendChild(this.resultContainer); 
        console.log(player.wallet);
        return result; 
        
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
        const buttons = betBoard.querySelectorAll("button");
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    checkAvailableButton(){
        const buttons = betBoard.querySelectorAll("button");
        buttons.forEach(button => {
            const value = parseInt(button.dataset.value);
            if (player.wallet < value) {
                button.disabled = true;
            } else {
                button.disabled = false;
            }
        });
    }
}
