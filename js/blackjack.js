const b1 = document.querySelector("#start");
b1.addEventListener("click", () =>{
    start();
});

const b2 = document.querySelector("#hit");
b2.addEventListener("click", () =>{
    hit();
});

const b3 = document.querySelector("#stand");
b3.addEventListener("click", () =>{
    stand();
});

const player = {
    hand: [],
    score: 0,
    limit: 21,
    state: "play-turn"
};

const cpu = {
    hand: [],
    score: 0,
    limit: 17,
    state: "wait-turn"
};

function Card(sign, number){
    this.sign = sign;
    this.number = number;
}

Card.prototype.getValue = function(){
    if (['J', 'Q', 'K'].includes(this.number)) {
        return 10;
    }
    if(this.number === 'A'){
        return 1;
    }
    return parseInt(this.number);
}

let signs = ['♠', '♥', '♦', '♣'];
let numbers = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
let deck = [];

function start(){
    player.score = 0;
    cpu.score= 0;
    player.state = "play-turn";
    cpu.state = "wait-turn";

    if(deck.length === 0){
        createDeck();
    }
    shuffleDeck();
    dealStartingHands();
    calculateScore(player);
    calculateScore(cpu);
    if(cpu.score === 21){
        return alert("Il banco vince sempre!");
    }
    if(player.score === 21){
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
    if(aces > 0 && (gambler.score + 10) <= 21){
        gambler.score += 10;
    }
    if(gambler.score > 21 ){
        gambler.state = "bust";
        if(player.state === "bust"){
            calculateWinner();
        }
    }
}

function stand(){
    if(player.state === "play-turn"){
        player.state = "stand";
        playCpu();
    }
    return;
}

function hit(){
    if(player.state === "play-turn"){
        dealCard(player);
        if(player.score === player.limit){
           stand();
        }
    }
    return;
}

function playCpu(){
    cpu.state = "play-turn";
    while(cpu.score < cpu.limit){
        dealCard(cpu);
    }
    calculateWinner();
}

function calculateWinner(){
    if(player.state === "bust"){
        return alert("Hai sballato! Hai perso");
    }
    if(cpu.state === "bust"){
        return alert("Il banco ha sballato! Hai vinto!");
    }
    if(player.score < cpu.score){
        return alert("Il banco vince sempre!");
    }
    return alert("hai vinto!");
}