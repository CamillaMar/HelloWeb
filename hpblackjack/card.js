class Card{
    constructor(suit, value){
        this.suit = suit; 
        this.value = value;
        this.isHidden = false;
        this.cardContainer = document.createElement("div");
        this.cardContainer.innerText = suit + value; 
        this.cardContainer.classList.add("card"); 
    }
    getNumericValue(){
        if(Deck.cardValues.indexOf(this.value) >= 10){
            return 10; 
        }
        if(this.value == "A"){
            return 11; 
        }
        return Deck.cardValues.indexOf(this.value) + 1;
    }

    hide(){
        this.isHidden = true;
        this.cardContainer.classList.add("cover");
        this.cardContainer.innerText ="??";
    }
    show(){
        this.isHidden = false;
        this.cardContainer.classList.remove("cover");
        this.cardContainer.innerText = this.suit + this.value ;
    }
}
