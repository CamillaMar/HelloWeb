class gameManagement {
    constructor(){}
    resetGame(){}
    playDealerTurn(){
        while(dealer.getHandValue() < 17) {
            dealer.drawCard()
        };
    }
    endPlayerTurn(){
        hitButton.disabled = true;
        standButton.disabled = true;
    }
}
