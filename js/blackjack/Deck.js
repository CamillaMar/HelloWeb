class Deck{
    static #standardDeck;
    #cards;
    constructor(){
        if(!standardDeck){
            createDeck();
        }
        this.#cards = standardDeck;
    }
    
    static #createDeck(){
        this.standardDeck = [];
        Card.signs.forEach(sign =>{
            Card.numbers.forEach(number =>{
                this.standardDeck.push(new Card(sign, number))
            })
        });
    }
    shuffleDeck(){
        for(let i = 0; i < 1000 && this.#cards.length > 1; i++){
            const r1 = Math.floor(Math.random() * this.#cards.length);
            const r2 = Math.floor(Math.random() * this.#cards.length);
            const temp = this.#cards[r1];
            this.#cards[r1] = this.#cards[r2];
            this.#cards[r2] = temp;
        } 
    }

    draw(){
        const card = this.#cards.pop();
        return card;
    }

    static getStandardDeck(){
        if(!standardDeck){
            createDeck();
        }
        return standardDeck;
    }
    //questo metodo non dovrebbe essere mai usato essendo che nessuno deve poter vedere le carte
    getCards(){
        return this.#cards;
    }
}