import { Deck } from "./deck.js";

export class Player{
    #hand = [];
    #handPoints = 0;
    #money = 100;
    #canPlay = false;
    constructor(){
    };
    changeMoney(money){
        this.#money += money;
        return this.#money;
    };
    playerDraw(deck){
        if(!deck instanceof Deck){
            console.log("You didn't pass a deck object :P");
            return;
        }
        const card = deck.draw();
        this.#hand.push(card);
        this.#handPoints += card.points;
        return card;
    };
    get hand(){
        return this.#hand;
    };
    get handPoints(){
        return this.#handPoints;
    };
    set handPoints(points){
        this.#handPoints = points;
    };
    get money(){
        return this.#money;
    };
    get canPlay(){
        return this.#canPlay;
    };
    set canPlay(newStatus){
        if( typeof newStatus !== "boolean"){
            console.log("Ma svegliati e passa un boolean")
            return;
        }
        this.#canPlay=newStatus;
    }
    resetHand(){
        this.#hand = [];
        this.#handPoints = 0;
    };
    
}



