import { Player } from "./player.js";
import { Deck } from "./deck.js"
export class Game{
    #player;
    #dealer;
    #deck;
    #plate = 0;

    constructor(player,delaer){
        this.#dealer = delaer;
        this.#player = player;
        this.#deck = new Deck();
    };
    initialize(){
        if(!this.#player.canPlay){                
            return ;
        }
        this.gameDraw(this.#player);
        this.gameDraw(this.#dealer);
        this.gameDraw(this.#player);
        this.gameDraw(this.#dealer);
        const blackJackMaker = this.checkForBlackJack()
        if(blackJackMaker === this.#player){return true};
        if(blackJackMaker === this.#dealer){return false};
    };
    gameDraw(user){
        if(!(user instanceof Player)){
            console.log("Me devi passa un Player chicco");
            return;
        }
        if(user.handPoints < 21){
            return user.playerDraw(this.#deck);
        } else if(user.handPoints > 21){
            this.checkForAces(user);
            if(this.checkBusted(user)){
                return false;
            }
            return user.playerDraw(this.#deck);
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
        this.#plate += fishValue;
        this.#player.canPlay = true;
    };
    checkForBlackJack(){
        if( this.#dealer.handPoints === 21 ){
            return this.#dealer;
        }else if(this.#player.handPoints === 21){
            this.#player.changeMoney(this.#plate *2.5);
            return this.#player;
        }
    };

    calculateWinner(){
        if(this.#player.handPoints > this.#dealer.handPoints ){
            this.#player.changeMoney(this.#plate *2);
            this.#plate=0;
            return true;
            //segnalare che hai vinto
        }else if(this.#player.handPoints < this.#dealer.handPoints ){
            this.#plate=0;
            //segnalare che hai perso
            return false;
        }
    };
    checkBusted(user){
        if(this.#player.handPoints <= 21){
            return false;
        }
        user.canPlay = false;
        return true;
    };


    get player(){
        return this.#player;
    }
    get dealer(){
        return this.#dealer;
    }
    get plate(){
        return this.#plate;
    }
    set plate(value){
        this.#plate = value;
    }
    get deck(){
        return this.#deck;
    }
}
