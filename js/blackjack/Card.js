class Card {
    static signs = ['♠', '♥', '♦', '♣'];
    static numbers = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    
    #sign;
    #number;

    constructor(sign, number) {
        this.#sign = sign;
        this.#number = number;
    }

    getValue() {
        if (['J', 'Q', 'K'].includes(this.#number)) {
            return 10;
        }
        if (this.#number === 'A') {
            return 1;
        }
        return parseInt(this.#number);
    }
    
    getSign() {
        return this.#sign;
    }
    setSign(newSign){
        this.#sign = newSign;
    }

    getNumber() {
        return this.#number;
    }
    setNumber(newNumber){
        this.#number = newNumber;
    }
}
