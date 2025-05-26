class Actor {
    #hand;
    #score;
    #limit;
    #idTable;
    
    constructor(limit, idTable){
        this.#hand = [];
        this.#score = 0;
        this.#limit = limit;
        this.#idTable = idTable;
    }
    
    calculateScore(){
        this.#score = 0;
        let aces = 0;
        this.#hand.forEach(card =>{
            console.log(card);
            if(card.getNumber() === 'A'){
                aces++;
            }
            this.#score += card.getValue();
        });
        if(aces > 0 && (this.#score + 10) <= 21){
            this.#score += 10;
        }
    }

    resetHand(){
        this.#hand = [];
    }

    addCard(card){
        this.#hand.push(card);
        this.calculateScore();
    }
    
    isLimitReached(){
        return this.#score >= this.#limit;
    }
    hasBusted(){
        return this.#score > this.#limit;
    }
    
    getHand(){
        return this.#hand;
    }
    getScore(){
        return this.#score;
    }
    setScore(score){
       this.#score = score;
    }
    getLimit(){
        return this.#limit;
    }
    getIdTable(){
        return this.#idTable;
    }
}