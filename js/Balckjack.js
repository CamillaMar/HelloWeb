class Card {
    constructor(seme, valore, vista) {
        this.seme = seme;
        if (valore > 11) {
            this.valore = 10;
        } else {
            this.valore = valore;
        }
        if (vista === 12) {
            this.vista = "J"
        } else if (vista === 13) {
            this.vista = "Q"
        } else if (vista === 14) {
            this.vista = "K"
        } else if (vista === 11) {
            this.vista = "A"
        } else {
            this.vista = vista;
        }
    }
    getValue() {
        return this.valore;
    }
    getVista() {
        return this.vista;
    }
    getSeme() {
        return this.seme;
    }
    printCard() {
        console.log(
            `${this.getVista()} di: ${this.getSeme()}`);
    }
}

class Deck {
    deck = [];
    constructor() {
        ["h", "d", "c", "s"].forEach((seme) => {
            for (let valore = 2; valore <= 14; valore++) {
                const card = new Card(seme, valore, valore);
                this.deck.push(card);
            }
        })
    }

    draw() {
        const pos = Math.floor(Math.random() * this.deck.length);
        const card = this.deck[pos];
        this.deck.splice(pos,1);
        if(this.deck.length===26){
            this.deck =new Deck();
        }
        return [card.getSeme(), card.getValue(), card.getVista()]
    }
}

const deck = new Deck();
const mazzo = document.querySelector(".mazzo button");
const BetCalcP = document.querySelector(".bettingCalcZone p:nth-of-type(2)");
const InventoryCalcP = document.querySelector(".BetInventory p:nth-of-type(2)");
const buttonFish10 = document.querySelector("#fish10");
const buttonFish20 = document.querySelector("#fish20");
const buttonFish50 = document.querySelector("#fish50");
const buttonFish100 = document.querySelector("#fish100");
const playerMessagfePrompt = document.querySelector("#playerSide #messagePrompt")
const dealerMessagfePrompt = document.querySelector("#dealerSide #messagePrompt")
const playerHand = document.querySelector("#playerSide .deck");
const dealerHand = document.querySelector("#dealerSide .deck");
const resetZone = document.querySelector("#resetZone");
const stayButton = document.querySelector("#stay");
const rulesButton = document.querySelector("#rulesbutton");
const sideBar = document.querySelector(".sideBar")
const nav = document.querySelector("nav")

let rulesClosed = true;
let playerHandValue = 0;
let dealerHandValue = 0;
let playerCardsInHand = [];
let isPlayerOut = false;
let HasPlayerBet = true;
playerAddCard();
DealerAddCard(true);
playerAddCard();
DealerAddCard();
HasPlayerBet = false;
let playerWallet = {
    _playerMoney: 100,
    get playerMoney() {
        return this._playerMoney
    },

    changePLayerMoney(value){
        if ((this._playerMoney + value) < 0) {
            playerMessagfePrompt.textContent ="Non hai più soldi per scommettere"
            return;
        }
        this._playerMoney += value;
        InventoryCalcP.textContent = this._playerMoney + "€$£";
        HasPlayerBet = true;
    },

    set playerMoney(value) {
        this._playerMoney = value;
    }

}
let tableBet = {
    _bets: 0,
    get bets() {
        return this._bets
    },
    set bets(value) {
        this._bets = value;
        BetCalcP.textContent = this._bets + "€$£";
    }

}
playerWallet.playerMoney = 100;


function createResetbutton() {
    resetZone.innerHTML = "<button>PlayAgain</button>"
    const resetButton = document.querySelector("#resetZone button");
    resetButton.addEventListener("click", reset)
}

function reset() {
    playerHandValue = 0;
    dealerHandValue = 0;
    playerMessagfePrompt.textContent = "";
    dealerMessagfePrompt.textContent = "";
    playerHand.innerHTML = "";
    dealerHand.innerHTML = "";
    resetZone.innerHTML = "";
    isPlayerOut = false;
    mazzo.disabled = false;
    playerCardsInHand = [];
    playerAddCard();
    DealerAddCard(true);
    playerAddCard();
    DealerAddCard();
    HasPlayerBet = false;

}
function createCardInHtml(dove, card) {
    dove.innerHTML = dove.innerHTML + `
        <div class="card">
            <u class="${card}"></u>
            <input type="checkbox"  class="card"  >
        </div>`

}

function createHiddenCardInHtml(dove, card) {
    dove.innerHTML = dove.innerHTML + `
        <div class="card">
            <u class="${card}"></u>
            <input type="checkbox"  class="card" checked disabled>
        </div>`

}

function calculateHandValue(cards) {
    playerHandValue = 0;
    let aceCount = 0;

    cards.forEach((card) => {
        playerHandValue += parseInt(card);
        if (card === 11) aceCount++;
    });

    while (playerHandValue > 21 && aceCount > 0) {
        playerHandValue -= 10; // treat one Ace as 1 instead of 11
        aceCount--;
    }
}

function isBlackJack(cards) {
    if (cards.length !== 2) return false;

    return (cards.includes(11) && cards.includes(10));
}

function playerAddCard() {
    if (HasPlayerBet === true) {
        if (isBlackJack(playerCardsInHand)) {
            playerMessagfePrompt.textContent = "BLACKJACK!";
            mazzo.disabled = true;
            stayButton.disabled = true;
            playerWallet.playerMoney = tableBet.bets * 3 + playerWallet.playerMoney;
            tableBet.bets = 0;
            createResetbutton();
            return;
        }
        const card = deck.draw();
        const cardVal = card[1];
        const cardClass = card[0] + card[2];
        createCardInHtml(playerHand, cardClass);
        playerCardsInHand.push(cardVal);
        calculateHandValue(playerCardsInHand);
        playerMessagfePrompt.textContent = "Hai: " + playerHandValue;
        whoWins();
    } else {
        alert("prima devi puntare")
    }
}

function whoWins() {
    if (playerHandValue > 21) {
        tableBet.bets = 0;
        createResetbutton();
        playerMessagfePrompt.textContent = `${playerHandValue} Hai Sforato!`;
        mazzo.disabled = true;
        return;
    }
}


function DealerAddCard(check) {
    if (HasPlayerBet === true) {
        if (isPlayerOut === true) { return }
        if (dealerHandValue >= 17) {
            dealerMessagfePrompt.textContent = "Il banco sta!";
            return;
        }
        const card = deck.draw();
        const cardVal = card[1];
        const cardClass = card[0] + card[2]
        if (dealerHandValue + cardVal > 21) {
            dealerMessagfePrompt.textContent = "Il banco ha sforato!"
            createResetbutton();
        }
        dealerHandValue += parseInt(cardVal);
        
        if (check) {
            createHiddenCardInHtml(dealerHand, cardClass)
        } else {
            createCardInHtml(dealerHand, cardClass);
        }
    }


}

function uncheckDealerHiddenCard(){
    const dealerCard = document.querySelector("#dealerSide .deck input");
    console.log(dealerCard);
    dealerCard.disabled = false;
    dealerCard.checked = false;
    dealerCard.disabled = true;
}

mazzo.addEventListener("click", () => {
    playerAddCard();
    if (!isPlayerOut) { 
        DealerAddCard(); 
    }


})

stayButton.addEventListener("click", () => {
    if (HasPlayerBet === true) {
        uncheckDealerHiddenCard();
        if (playerHandValue <= dealerHandValue) {
            playerMessagfePrompt.textContent = "Hai perso, il banco ha: " + dealerHandValue;
            tableBet.bets = 0;
            createResetbutton();
        } else {
            playerMessagfePrompt.textContent = "Hai vinto, il banco ha: " + dealerHandValue;
            playerWallet.playerMoney = tableBet.bets * 2 + playerWallet.playerMoney;
            tableBet.bets = 0;
            createResetbutton();
        }
    } else {
        alert("prima devi puntare")
    }
});

buttonFish10.addEventListener("click", () => {
    if (playerWallet.playerMoney < 10) { 
        playerMessagfePrompt.textContent ="Non hai più soldi per scommettere"; 
        return;
    }
    playerWallet.changePLayerMoney(-10);
    tableBet.bets += 10;
})
buttonFish20.addEventListener("click", () => {
    if (playerWallet.playerMoney < 20) { 
        playerMessagfePrompt.textContent ="Non hai più soldi per scommettere"; 
        return;
    }
    playerWallet.changePLayerMoney(-20);
    tableBet.bets += 20;
})
buttonFish50.addEventListener("click", () => {
    if (playerWallet.playerMoney < 50) { 
        playerMessagfePrompt.textContent ="Non hai più soldi per scommettere"; 
        return;
    }
    playerWallet.changePLayerMoney(-50);
    tableBet.bets += 50;
    
})
buttonFish100.addEventListener("click", () => {
    if (playerWallet.playerMoney < 100) { 
        playerMessagfePrompt.textContent ="Non hai più soldi per scommettere"; 
        return;
    }
    playerWallet.changePLayerMoney(-100);
    tableBet.bets += 100;
})

rulesButton.addEventListener("click", () => {
    nav.classList.toggle("closed");
});
