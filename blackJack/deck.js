import { Card } from "./card.js";

export class Deck{
    #cards = [];
    
    constructor(){
        ["Hearts","Diamonds","Clubs","Spades"].forEach((suite)=>{
            for(let i = 2; i <= 14; i++){
                const card = new Card(suite, i);
                this.#cards.push(card);
            }
            
        })
        this.shuffle();
    }
    get cards(){
        return this.#cards;
    };
    shuffle(){
        for(let i = this.#cards.length - 1; i > 0; i--) {
            const random = Math.floor(Math.random() * (i + 1));
            [this.#cards[i], this.#cards[random]] = [this.#cards[random],this.#cards[i]];
        }
    }
    draw(){
        if(this.#cards.length === 0){
            console.log("Deck has no cards");
            return;
        }
        return this.#cards.pop();
    }
}
