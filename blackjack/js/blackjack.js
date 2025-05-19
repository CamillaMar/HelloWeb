
let playerSum = 0;
let dealerSum = 0;

const choices = document.querySelector(".choices");

const suits = ['hearts', 'diams', 'clubs', 'spades'];
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
let cards = suits.flatMap(suit => ranks.map(rank => ({suit,rank})));

const suitsImg = {
    "hearts": "❤",
    "diams": "♦",
    "clubs": "♣",
    "spades": "♠"
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

const shuffled = shuffle(cards);

const playerHand = document.querySelector(".player-hand");
const dealerHand = document.querySelector(".dealer-hand");
const dealerPoints = document.querySelector(".dealer-points > p");
const playerPoints = document.querySelector(".player-points > p");
const endMessage = document.querySelector(".end-message");

let playButton = document.querySelector(".play-button");
let hitMeButton = null;

function chooseAceValue(){
  //TODO
}

function endGame(message){
  const p = document.createElement("p");
  endMessage.appendChild(p);
  p.textContent = message
  endMessage.style.visibility = "visible";
  const restartButton = document.createElement("button");
  restartButton.textContent = "PLAY AGAIN";
  restartButton.addEventListener("click",()=>{
    location.reload();
  });
  endMessage.appendChild(restartButton);
}

function giveCardToDealer(){
  const cardGiven = shuffled[0];
  shuffled.shift();
  
  const cardContainer = document.createElement("div");
  cardContainer.classList = "card-container";

  const card = document.createElement("div");
  card.classList = "card is-flipped";
  const cardFront = document.createElement("div");
  cardFront.classList = "card-face card-front " + cardGiven.suit;
  cardFront.setAttribute("data-card", cardGiven.rank);

  const span = document.createElement("span");
  const cardGivenSuit = cardGiven.suit;
  span.textContent = suitsImg[cardGivenSuit];

  const cardBack = document.createElement("div");
  cardBack.classList = "card-face back";

  cardFront.appendChild(span);
  card.appendChild(cardFront);
  card.appendChild(cardBack);
  cardContainer.appendChild(card);
  dealerHand.appendChild(cardContainer);
  
  if(cardGiven.rank === "J" |cardGiven.rank === "Q" | cardGiven.rank === "K"){
    dealerSum += 10;
  } else if (cardGiven.rank === "A") {
    chooseAceValue();
  } else {
    dealerSum += cardGiven.rank;
  }

  return card;
}

function giveCardToPlayer(){
  const cardGiven = shuffled[0];
  shuffled.shift();
  
  const cardContainer = document.createElement("div");
  cardContainer.classList = "card-container";

  const card = document.createElement("div");
  card.classList = "card is-flipped";
  const cardFront = document.createElement("div");
  cardFront.classList = "card-face card-front " + cardGiven.suit;
  cardFront.setAttribute("data-card", cardGiven.rank);

  const span = document.createElement("span");
  const cardGivenSuit = cardGiven.suit;
  span.textContent = suitsImg[cardGivenSuit];

  const cardBack = document.createElement("div");
  cardBack.classList = "card-face back";

  cardFront.appendChild(span);
  card.appendChild(cardFront);
  card.appendChild(cardBack);
  cardContainer.appendChild(card);
  playerHand.appendChild(cardContainer);
  
  if(cardGiven.rank === "J" |cardGiven.rank === "Q" | cardGiven.rank === "K"){
    playerSum += 10;
  } else if (cardGiven.rank === "A") {
    chooseAceValue();
  } else {
    playerSum += cardGiven.rank;
  }
  playerPoints.textContent = playerSum;
  
  if(playerSum>21){
    endGame("YOU LOST");
  } else if(playerSum == 21 & dealerSum < 21){
    endGame("YOU WON");
  }

  return card;
}

function startGame(){

  let firstDealer = giveCardToDealer();
  setTimeout(()=> firstDealer.classList.toggle("is-flipped"));

  let firstPlayer = giveCardToPlayer();
  setTimeout(()=> firstPlayer.classList.toggle("is-flipped"));
  let secondDealer = giveCardToDealer();

  let secondPlayer = giveCardToPlayer();
  setTimeout(()=> secondPlayer.classList.toggle("is-flipped"));

  hitMeButton = document.createElement("button");
  hitMeFace = document.createElement("span");
  hitMeFace.textContent = "HIT ME";
  hitMeFace.classList.add("button-face");
  hitMeButton.classList.add("hit-me");
  hitMeButton.addEventListener("click", function(){
    let nextCard = giveCardToPlayer();
    setTimeout(()=> nextCard.classList.toggle("is-flipped"))
  });
  hitMeButton.appendChild(hitMeFace);

  const stayButton = document.createElement("button");
  stayFace = document.createElement("span");
  stayFace.textContent = "STAY";
  stayFace.classList.add("button-face");
  stayButton.classList.add("stay");
  stayButton.addEventListener("click",()=>{
    secondDealer.classList.toggle("is-flipped");
    if(dealerSum>playerSum){
      endGame("YOU LOST");
    } else {
      endGame("YOU WON");
    }
  });
  stayButton.appendChild(stayFace);

  const concedeButton = document.createElement("button");
  concedeButton.classList.add("concede");
  concedeFace = document.createElement("span");
  concedeFace.textContent = "CONCEDE";
  concedeFace.classList.add("button-face");
  concedeButton.addEventListener("click",()=>{
    location.reload()
  });
  concedeButton.appendChild(concedeFace);

  choices.removeChild(playButton);
  choices.appendChild(hitMeButton);
  choices.appendChild(stayButton);
  choices.appendChild(concedeButton);
}

playButton.addEventListener("click", function(){
  startGame();
})