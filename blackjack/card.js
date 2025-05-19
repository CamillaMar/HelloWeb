class Card{
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
        this.isHidden = false;
        this.hisRed = false;
        this.container = document.createElement("div");
        this.container.innerText = value + suit;
        this.container.classList.add("card");
    }

    getNumericValue(){
        if(cardValues.indexOf(this.value) >= 10){
            return 10;
        }
        if(this.value == 'A'){
            return 11;
        }
        return cardValues.indexOf(this.value) + 1;
    }

    hide(){
        this.isHidden = true;
        this.container.classList.add("cover");
        this.container.innerText = "??";
    }

    show(){
        this.isHidden = false;
        this.container.classList.remove("cover");
        this.container.innerText = this.value + this.suit;
    }

    makeRed(){
        this.hisRed = true;
        this.container.classList.add("red");
    }
}