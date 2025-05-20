class Card{
    constructor(sign, number){
        this.sign = sign;
        this.number = number;
    }


    getValue = function(){
        if (['J', 'Q', 'K'].includes(this.number)) {
            return 10;
        }
        if(this.number === 'A'){
            return 1;
        }
        return parseInt(this.number);
    }
}