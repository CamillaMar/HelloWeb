const deck = new Map([
  // Hearts
  ['hA',  11],  ['h2',  2],  ['h3',  3],  ['h4',  4],  ['h5',  5],  ['h6',  6],  ['h7',  7],
  ['h8',  8],  ['h9',  9],  ['h10', 10], ['hJ', 10], ['hQ', 10], ['hK', 10],

  // Clubs
  ['cA',  11],  ['c2',  2],  ['c3',  3],  ['c4',  4],  ['c5',  5],  ['c6',  6],  ['c7',  7],
  ['c8',  8],  ['c9',  9],  ['c10', 10], ['cJ', 10], ['cQ', 10], ['cK', 10],

  // Diamonds
  ['dA',  11],  ['d2',  2],  ['d3',  3],  ['d4',  4],  ['d5',  5],  ['d6',  6],  ['d7',  7],
  ['d8',  8],  ['d9',  9],  ['d10', 10], ['dJ', 10], ['dQ', 10], ['dK', 10],

  // Spades
  ['sA',  11],  ['s2',  2],  ['s3',  3],  ['s4',  4],  ['s5',  5],  ['s6',  6],  ['s7',  7],
  ['s8',  8],  ['s9',  9],  ['s10', 10], ['sJ', 10], ['sQ', 10], ['sK', 10],
]);
let cardKeys = Array.from(deck.keys());
let cards = deck;

// Dealer
const dealerHand = document.querySelector('.dealer-hand');
const dealerHandValueSpan = document.querySelector('.dealer .hand-value span');
let dealerCards = [];
let dealerAces = [];
let dealerCardsCount = 0;
let dealerAcesCount = 0;
let dealerHandValue = 0;
let firstDealerCard = true;
let secondDealerCard = true;
let firstDealerCardValue = 0;

// Player
const playerHand = document.querySelector('.hand-deck');
const playerHandValueSpan = document.querySelector('.player .hand-value span');
let playerCards = [];
let playerAces = [];
let playerCardsCount = 0;
let playerAcesCount = 0;
let playerHandValue = 0;

const totalFichesSpan = document.querySelector('.total-fiches span');
let totalFiches = 3000;
const betSpan = document.querySelector('.bet span');
let bet = 0;

let playerWon = false;
let isBlackjack = false;

// Buttons
const playBtn = document.querySelector('button.play');
const doubleBetBtn = document.querySelector('button.double-bet');
const dealBtn = document.querySelector('button.deal');
const clearBetsBtn = document.querySelector('button.clear-bets');
const hitBtn = document.querySelector('button.hit');
const standBtn = document.querySelector('button.stand');
const resetBtn = document.querySelector('button.reset');
const fiches = document.querySelectorAll('.fiche');

/* ===== EVENT LISTENERS ===== */

document.addEventListener('DOMContentLoaded', () => {
    totalFichesSpan.textContent = totalFiches;
    playerHandValueSpan.textContent = playerHandValue;
    betSpan.textContent = bet;
});

playBtn.addEventListener('click', () => {
    hidePlayBtn();
    showDoubleBetBtn();
    showDealBtn();
    showClearBetsBtn();
    showFicheBtns();
});

fiches.forEach(element => {
    element.addEventListener('click', () => {
        ficheValue = Number(element.value);

        if (totalFiches - ficheValue >= 0) {
            if (bet === 0) {
                makeDealBtnClickable();
                makeDoubleBetBtnClickable();
                makeClearBetsBtnClickable();
            }

            bet += ficheValue;
            totalFiches -= ficheValue;
            betSpan.textContent = bet;
            totalFichesSpan.textContent = totalFiches;
        }

        checkTotalFiches();
    });
});

doubleBetBtn.addEventListener('click', () => {
    currentBet = bet;
    const doubledBet = currentBet * 2;

    if (totalFiches - doubledBet < 0 || bet === 0) {
        renderCantDoubleBetMessage();
        return;
    }

    bet = doubledBet;
    totalFiches -= currentBet;
    betSpan.textContent = bet;
    totalFichesSpan.textContent = totalFiches;

    checkTotalFiches();
})

clearBetsBtn.addEventListener('click', () => {
    totalFiches += bet;
    bet = 0;

    betSpan.textContent = bet;
    totalFichesSpan.textContent = totalFiches;

    makeFicheBtnsClickable();
    makeDealBtnNotClickable();
    makeDoubleBetBtnNotClickable();
    makeClearBetsBtnNotClickable();
});

dealBtn.addEventListener('click', () => {
    hideFicheBtns();
    hideClearBetsBtn();
    hideDealBtn();
    hideDoubleBetBtn();
    
    showHitBtn();
    showStandBtn();

    dealInitialCards();
});

hitBtn.addEventListener('click', () => {
    if (cards.size === 0) {
        hideBtnsAndShowResetBtn();
    }

    if(isBlackjack){
        isBlackjack = false;
        playerHand.classList.remove('glow');
    }

    const randomCard = pickRandomCard();
    dealCardToPlayer(randomCard[0], randomCard[1], false);
});

standBtn.addEventListener('click', () => {
    makeHitBtnNotClickable();
    makeStandBtnNotClickable();
    makeDoubleBetBtnNotClickable();
    dealerPlays();
});

resetBtn.addEventListener('click', () => {
    hideResetBtn();
    showPlayBtn();
    removeOutcomeMessage();
    resetGameBoard();
    newGame();
});

/* ===== PLAYER ===== */

function dealCardToPlayer(card, value, showBack) {
    playerCards[playerCardsCount] = dealCard(card, showBack);
    playerHand.appendChild(playerCards[playerCardsCount]);

    playerHandValue += value;

    if (playerHandValue > 21) {
        checkHandForAces(playerCards, true);
    }

    playerHandValueSpan.textContent = playerHandValue;
    playerCardsCount++;
    
    if (playerHandValue > 21) {
        renderBustedDiv();
    }
}

function checkTotalFiches() {
    if(totalFiches === 0) {
        makeFicheBtnsNotClickable();
        doubleBetBtn.classList.remove('clickable');
        doubleBetBtn.classList.add('not-clickable');
    }
}

function checkBlackjack() {
    if (playerHandValue === 21) {
        isBlackjack = true;
        playerHand.classList.add('glow');
    }
}

/* ===== DEALER ===== */

function dealCardToDealer(card, value, showBack) {
    dealerCards[dealerCardsCount] = dealCard(card, showBack)
    dealerHand.appendChild(dealerCards[dealerCardsCount]);
    dealerCardsCount++;
    dealerHandValue += value;
    
    if (dealerHandValue > 21) {
        checkHandForAces(dealerCards, false);
    }

    if (firstDealerCard) {
        firstDealerCardValue = value;
        dealerHandValueSpan.textContent = firstDealerCardValue;
        firstDealerCard = false;
    } else if (secondDealerCard) {
        dealerHandValueSpan.textContent = firstDealerCardValue;
        secondDealerCard = false;
    } else {
        dealerHandValueSpan.textContent = dealerHandValue;
    }
}

function dealerPlays() {
    dealerCards[dealerCardsCount-1].querySelector('input').setAttribute('checked', '');
    dealerHandValueSpan.textContent = dealerHandValue;
    checkDealerHandValue();
}

function checkDealerHandValue() {
    if (dealerHandValue < playerHandValue) {
        setTimeout(() => {
            const c = pickRandomCard();
            dealCardToDealer(c[0], c[1], false);
            checkDealerHandValue();
        }, 1500);
    } else {
        checkScore();
    }
}

/* ===== GAME ===== */

function dealInitialCards() {
    setTimeout(() => {
        const c = pickRandomCard();
        //dealCardToPlayer(c[0], c[1], false);
        dealCardToPlayer('hA', 11, false);
    }, 500);

    setTimeout(() => {
        const c = pickRandomCard();
        dealCardToDealer(c[0], c[1], false);
    }, 1000);

    setTimeout(() => {
        const c = pickRandomCard();
        //dealCardToPlayer(c[0], c[1], false);
        dealCardToPlayer('h10', 10, false);
        checkBlackjack();
    }, 1500);

    setTimeout(() => {
        const c = pickRandomCard();
        dealCardToDealer(c[0], c[1], true);
    }, 2000);

    setTimeout(() => {
        makeHitBtnClickable();
        makeStandBtnClickable();
    }, 2000);
}

function dealCard(card, showBack) {
    if (cards.size === 0) {
        return;
    }

    cards.delete(card);
    cardKeys = Array.from(deck.keys());
    
    return renderCard(card, showBack);
}

function renderCard(card, showBack) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card');

    const input = document.createElement('input');
    input.type = 'checkbox';
    if (!showBack) {
        input.setAttribute('checked', '');
    }

    const u = document.createElement('u');
    u.classList.add(card);
    
    const b = document.createElement('b');
    b.classList.add('red');
    
    cardContainer.appendChild(input);
    cardContainer.appendChild(u);
    cardContainer.appendChild(b);

    return cardContainer;
}

function pickRandomCard() {
    const randomIndex = Math.floor(Math.random() * cards.size);
    const randomCard = cardKeys[randomIndex];
    const randomCardValue = cards.get(randomCard);
    cardKeys = Array.from(deck.keys());
    return [randomCard, randomCardValue];
}

function checkHandForAces(cards, isPlayer) {
    const regex = new RegExp('[hdcs]A');
    
    cards.forEach(card => {
        const u = card.querySelector('u');
        if (regex.test(u.className)) {
            if (isPlayer) {
                if (!playerAces.includes(u.className)) {
                    playerHandValue -= 10
                    playerAces[playerAcesCount] = u.className;
                    playerAcesCount++;
                }
            } else {
                if (!dealerAces.includes(u.className)) {
                    dealerHandValue -= 10
                    dealerAces[dealerAcesCount] = u.className;
                    dealerAcesCount++;
                }
            }
        }
    });
}

function checkScore() {
    if (dealerHandValue >= playerHandValue && dealerHandValue <= 21) {
        renderLoserDiv();
    } else {
        playerWon = true;
        renderWinnerDiv();
        hideBtnsAndShowResetBtn();

        if (isBlackjack) {
            totalFiches += (bet * 2.5);
        } else {
            totalFiches += (bet*2);
        }
        
        totalFichesSpan.textContent = totalFiches;
    }
}

function newGame() {
    playerWon = false;
    isBlackjack = false;
    bet = 0;
    betSpan.textContent = 0;
    cards = deck;
    dealerCardsCount = 0;
    dealerAcesCount = 0;
    dealerHandValue = 0;
    dealerHandValueSpan.textContent = 0;
    firstDealerCard = true;
    secondDealerCard = true;
    firstDealerCardValue = 0;
    playerCardsCount = 0;
    playerAcesCount = 0;
    playerHandValue = 0;
    playerHandValueSpan.textContent = 0;
    dealerCards = [];
    dealerAces = [];
    playerCards = [];
    playerAces = [];
}

function resetGameBoard() {
    document.querySelectorAll('.dealer-hand .card').forEach(card => {
        card.remove();
    });

    document.querySelectorAll('.player-hand .hand-deck .card').forEach(card => {
        card.remove();
    });
}

/* ===== BUTTONS ===== */

// Clickable/NotClickable
function makeFicheBtnsClickable() {
    fiches.forEach(element => {
        element.classList.remove('not-clickable');
        element.classList.add('clickable');
    });
}
function makeFicheBtnsNotClickable() {
    fiches.forEach(element => {
        element.classList.remove('clickable');
        element.classList.add('not-clickable');
    });
}

function makeDealBtnClickable() {
    dealBtn.classList.remove('not-clickable');
    dealBtn.classList.add('clickable');
}
function makeDealBtnNotClickable() {
    dealBtn.classList.remove('clickable');
    dealBtn.classList.add('not-clickable');
}

function makeDoubleBetBtnClickable() {
    doubleBetBtn.classList.remove('not-clickable');
    doubleBetBtn.classList.add('clickable');
}
function makeDoubleBetBtnNotClickable() {
    doubleBetBtn.classList.remove('clickable');
    doubleBetBtn.classList.add('not-clickable');
}

function makeClearBetsBtnClickable() {
    clearBetsBtn.classList.remove('not-clickable');
    clearBetsBtn.classList.add('clickable');
}
function makeClearBetsBtnNotClickable() {
    clearBetsBtn.classList.remove('clickable');
    clearBetsBtn.classList.add('not-clickable');
}

function makeHitBtnClickable() {
    hitBtn.classList.remove('not-clickable');
    hitBtn.classList.add('clickable');
}
function makeHitBtnNotClickable() {
    hitBtn.classList.remove('clickable');
    hitBtn.classList.add('not-clickable');
}

function makeStandBtnClickable() {
    standBtn.classList.remove('not-clickable');
    standBtn.classList.add('clickable');
}
function makeStandBtnNotClickable() {
    standBtn.classList.remove('clickable');
    standBtn.classList.add('not-clickable');
}

// Hide/Show
function showFicheBtns() {
    fiches.forEach(element => {
        element.classList.remove('hidden');
        element.classList.add('visible');
    });
}
function hideFicheBtns() {
    fiches.forEach(element => {
        element.classList.remove('visible');
        element.classList.add('hidden');
    });
}
function showDoubleBetBtn() {
    doubleBetBtn.classList.remove('hidden');
    doubleBetBtn.classList.add('visible');
}
function hideDoubleBetBtn() {
    doubleBetBtn.classList.remove('visible');
    doubleBetBtn.classList.add('hidden');
}
function showDealBtn() {
    dealBtn.classList.remove('hidden');
    dealBtn.classList.add('visible');
}
function hideDealBtn() {
    dealBtn.classList.remove('visible');
    dealBtn.classList.add('hidden');
}
function showClearBetsBtn() {
    clearBetsBtn.classList.remove('hidden');
    clearBetsBtn.classList.add('visible');
}
function hideClearBetsBtn() {
    clearBetsBtn.classList.remove('visible');
    clearBetsBtn.classList.add('hidden');
}
function showHitBtn() {
    hitBtn.classList.remove('hidden');
    hitBtn.classList.add('visible');
}
function hideHitBtn() {
    hitBtn.classList.remove('visible');
    hitBtn.classList.add('hidden');
}
function showStandBtn() {
    standBtn.classList.remove('hidden');
    standBtn.classList.add('visible');
}
function hideStandBtn() {
    standBtn.classList.remove('visible');
    standBtn.classList.add('hidden');
}
function showResetBtn() {
    resetBtn.classList.remove('hidden');
    resetBtn.classList.add('visible');
}
function hideResetBtn() {
    resetBtn.classList.remove('visible');
    resetBtn.classList.add('hidden');
}
function hideBtnsAndShowResetBtn() {
    hideHitBtn();
    hideDoubleBetBtn();
    hideStandBtn();
    showResetBtn();
}
function showPlayBtn() {
    playBtn.classList.remove('hidden');
    playBtn.classList.add('visible');
}
function hidePlayBtn() {
    playBtn.classList.remove('visible');
    playBtn.classList.add('hidden');
}

/* ===== GAME OUTCOME MESSAGES ===== */

function renderLoserDiv() {
    const div = document.createElement('div');
    div.classList.add('dealer-won');
    div.textContent = 'LOSER!';
    document.querySelector('main').appendChild(div);

    hideBtnsAndShowResetBtn();
}
function renderWinnerDiv() {
    const div = document.createElement('div');
    div.classList.add('player-won');
    div.textContent = 'WINNER!';
    document.querySelector('main').appendChild(div);

    hideBtnsAndShowResetBtn();
}
function renderBustedDiv() {
    const div = document.createElement('div');
    div.classList.add('dealer-won');
    div.textContent = 'BUSTED!';
    document.querySelector('main').appendChild(div);

    hideBtnsAndShowResetBtn();
}

function removeLoserOrBustedDiv() {
    document.querySelector('.dealer-won').remove();
}
function removeWinnerDiv() {
    document.querySelector('.player-won').remove();
}
function removeOutcomeMessage() {
    if (playerWon) {
        removeWinnerDiv();
    } else {
        removeLoserOrBustedDiv();
    }
}