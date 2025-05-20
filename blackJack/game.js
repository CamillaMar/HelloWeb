import { Player } from "./player.js";
class Game{
    #player;
    #dealer;
    #deck;
    #plate = 0;

    constructor(){
        this.#dealer = new Player();
        this.#player = new Player();
        this.#deck = new Deck();
    };
    initialize(){
        if(!this.#player.canPlay){
            return ; //segnalare che deve bettare 
        }
        this.gameDraw(this.#player);
        this.gameDraw(this.#dealer);
        this.gameDraw(this.#player);
        this.gameDraw(this.#dealer);
        this.checkForBlackJack();
        return ;
    };
    gameDraw(user){
        if(!user instanceof Player){
            console.log("Me devi passa un Player chicco");
            return;
        }
        if(user.handPoints < 21){
            user.playerDraw(this.#deck);
        } else if(user.handPoints > 21){
            this.checkForAces(user);
            if(this.checkBusted(user)){
                //segnalare che ha bustato
                return ;
            }
            user.playerDraw(this.#deck);
        }
    }
    checkForAces(user){
        user.hand.forEach(card => {
            if(user.handPoints <= 21){
                return;
            }
            if(card.points === 11){
                user.handPoints -= 10;
                card.points = 1;
            }
        });
    }
    bet(fishValue){
        if(this.#player.money < fishValue){
            return; //segnalare che non ha abbastanza soldi
        }
        this.#player.changeMoney(-fishValue);
        this.#plate += fishValue*2;
        this.#player.canPlay(true);
    };
    checkForBlackJack(){
        if( this.#dealer.handPoints === 21 ){
            //segnalare che hai perso con blackjack
            this.resetRound();
        }else if(this.#player.handPoints === 21){
            this.#player.changeMoney(this.#plate *2.5);
            //segnalare che hai vinto con blackjack
            this.resetRound();
        }
    };

    calculateWinner(){
        if(this.#player.handPoints > this.#dealer.handPoints ){
            //segnalare che hai vinto
            this.#player.changeMoney(this.#plate);
        }else if(this.#player.handPoints < this.#dealer.handPoints ){
            //segnalare che hai perso
        }
        this.resetRound();
    };
    checkBusted(user){
        if(this.#player.handPoints <= 21){
            return false;
        }
        user.canPlay = false;
        return true;
    };
    resetRound(){
        this.#dealer.resetHand();
        this.#player.resetHand();
        this.#plate = 0;
        this.#player.canPlay(false);
    };
}
