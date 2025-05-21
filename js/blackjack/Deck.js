class Deck{
    static #standardDeck;
    #cards;
    
    constructor(){
        if(!Deck.#standardDeck){
            Deck.#createDeck();
        }
        this.#cards = Deck.#copyStandardDeck();
    }
    
    static #createDeck(){
        Deck.#standardDeck = [];
        Card.signs.forEach(sign =>{
            Card.numbers.forEach(number =>{
                Deck.#standardDeck.push(new Card(sign, number))
            })
        });
    }

    shuffle(){
        for(let i = 0; i < 1000 && this.#cards.length > 1; i++){
            const r1 = Math.floor(Math.random() * this.#cards.length);
            const r2 = Math.floor(Math.random() * this.#cards.length);
            const temp = this.#cards[r1];
            this.#cards[r1] = this.#cards[r2];
            this.#cards[r2] = temp;
        } 
    }

    draw(){
        console.log("this.#cards");
        console.log(this.#cards);
        if(this.isEmpty()){
            this.#cards = Deck.#copyStandardDeck();
            this.shuffle();
        }
        const card = this.#cards.pop();
        return card;
    }

    isEmpty(){
        return this.#cards.length === 0;
    }

    static #copyStandardDeck(){
        let copyDeck = [];
        Deck.#standardDeck.forEach(card => {
            copyDeck.push(new Card(card.getSign(), card.getNumber()));
        });
        return copyDeck;
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