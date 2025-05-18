function Card(sign, number, value){
    this.sign = sign;
    this.number = number;
    this.value = value;
}

const player = {
    hand: [],
    score: 0,
    limit: 21,
    state
};

const cpu = {
    hand: [],
    score: 0,
    limit: 17,
    state
};


card.prototype.getValue = function(){
    if (['J', 'Q', 'K'].includes(this.number)) {
        return 10;
    }
    if(this.number === 'A'){
        return 0;
    }
    return parseInt(this.number);
}

let signs = ['♠', '♥', '♦', '♣'];
let numbers = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
let deck = [];
let turn = false;
const ventuno = 21;

function start(){
    player.score = 0;
    cpu.score= 0;

    if(deck.length === 0){
        createDeck();
    }
    shuffleDeck();
    dealStartingHands();
    calculateScore(player);
    calculateScore(cpu);
    if(cpuScore === 21){
        return alert("Il banco vince sempre!");
    }
    if(playerScore === 21){
        return alert("Hai vinto!");
    }
    

}

function createDeck(){
    deck = [];
    signs.forEach(sign =>{
        numbers.forEach(number =>{
            deck.push(new Card(sign, number))
        })
    });
    return deck;
}

function shuffleDeck(){
    for(let i = 0; i < 1000 && deck.length > 1; i++){
        const r1 = Math.floor(Math.random() * deck.length);
        const r2 = Math.floor(Math.random() * deck.length);
        const temp = deck[r1];
        deck[r1] = deck[r2];
        deck[r2] = temp;
    } 
}

function dealStartingHands(){
    player.hand = [];
    cpu.hand = [];
    dealCard(player);
    dealCard(cpu);
    dealCard(player);
    dealCard(cpu);
}

function dealCard(gambler){
    if(deck.length === 0){
        createDeck();
        shuffleDeck();
    }
    gambler.hand.push(deck.pop());
    calculateScore(gambler);
}

function calculateScore(gambler){
    gambler.score = 0;
    let aces = 0;
    gambler.hand.forEach(card =>{
        if(card.number === 'A'){
            aces++;
        }
        gambler.score += card.getValue();
    });
    if(aces > 0){
        gambler.score += (gambler.score + aces-1) < 11 ? 11 + aces-1 : aces;
    }
    if(gambler.score > ventuno){
        gambler.state = "bust";
    }
}