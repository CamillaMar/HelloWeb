export class Card {
    #suite;
    #points;
    #faceValue;
    constructor(suite, faceValue) {
        this.#suite = suite;
        switch (faceValue) {
            case 11:
                this.#faceValue = "J";
                this.#points = 10;
                break;
            case 12:
                this.#faceValue = "Q";
                this.#points = 10;
                break;
            case 13:
                this.#faceValue = "K";
                this.#points = 10;
                break;
            case 14:
                this.#faceValue = "A";
                this.#points = 11;
                break;
            default:
                this.#points = faceValue;
                this.#faceValue = faceValue;
                break;
        }
    }
    get points(){
        return this.#points;
    };
    set points(points){
        this.#points = points;
    }
    get suite(){
        return this.#suite;
    };
    get faceValue(){
        return this.#faceValue;
    };

}