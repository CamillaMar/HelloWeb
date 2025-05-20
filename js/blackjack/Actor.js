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
    gambler.hand.forEach(card =>{
        if(card.number === 'A'){
            aces++;
        }
        gambler.score += card.getValue();
    });
    if(aces > 0 && (gambler.score + 10) <= 21){
        gambler.score += 10;
    }
    if(gambler.score > 21 ){
        calculateWinner();
        return;
    }
    if(gambler.score >= gambler.limit){
        stand();
    }
}



    getHand(){
        return this.#hand;
    }
    getScore(){
        return this.#score;
    }
    setScore(score){
       this.score = new Score();
    }
    getLimit(){
        return this.#limit;
    }
    idTable(){
        return this.#idTable;
    }
}