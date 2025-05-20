const b1 = document.querySelector("#start");
b1.addEventListener("click", () =>{
    start();
});

const b2 = document.querySelector("#hit");
b2.disabled = true;
b2.addEventListener("click", () =>{
    hit();
});

const b3 = document.querySelector("#stand");
b3.disabled = true;
b3.addEventListener("click", () =>{
    stand();
});

const player = {
    hand: [],
    score: 0,
    limit: 21,
    idTable: "tablePlayer"
};

const cpu = {
    hand: [],
    score: 0,
    limit: 17,
    idTable: "tableCpu"
};



let signs = ['♠', '♥', '♦', '♣'];
let numbers = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
let deck = [];

function start(){
    b2.disabled = false;
    b3.disabled = false;

    player.score = 0;
    cpu.score= 0;

    if(deck.length === 0){
        createDeck();
    }
    shuffleDeck();
    dealStartingHands();
    calculateScore(player);
    calculateScore(cpu);
    if(cpu.score === 21){
        return calculateWinner();
    }
    if(player.score === 21){
        return calculateWinner();
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
    renderHand(gambler);
    renderScore(gambler);
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
        calculateWinner();
        return;
    }
    if(gambler.score >= gambler.limit){
        stand();
    }
}

function stand(){
    playCpu();
    return;
}

function hit(gambler){
    dealCard(gambler);
    if(gambler.score >= gambler.limit){
        stand();
    }
    return;
}

function playCpu(){
    while(cpu.score < cpu.limit){
        hit(cpu);
    }
    calculateWinner();
}

function calculateWinner(){
    b2.disabled = false;
    b3.disabled = false;
    if(player.score > 21){
        return alert("Hai sballato! Hai perso");
    }
    if(cpu.score > 21){
        return alert("Il banco ha sballato! Hai vinto!");
    }
    if(player.score > cpu.score){
        return alert("hai vinto!");
    }
    return alert("Il banco vince sempre!");
}

function renderHand(gambler){
    const handSpace = document.querySelector(`#${gambler.idTable} [name="hand"]`);
    handSpace.textContent = "";
    gambler.hand.forEach(card => {
        handSpace.textContent += card.sign + card.number + "  ";
    })
}
function renderScore(gambler){
    const scoreSpace = document.querySelector(`#${gambler.idTable} [name="score"]`);
    scoreSpace.textContent = gambler.score;
}