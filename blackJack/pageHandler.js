import { Deck } from "./deck.js"
import { Game } from "./game.js";
import { Player } from "./player.js";

class PageHandler{

    #game;
    #player;
    #dealer;

    #messagePrompt

    #startButton;

    #main;

    #playerHand;
    #dealerHand;
    #totalPlayer
    #totalDealer
    #betPlate
    #playerMoney

    #utilities;

    #hitButton;
    #stayButton;
    #retryButton;

    #startRoundButton

    #fishZone;

    #fish1Button;
    #fish10Button;
    #fish20Button;
    #fish50Button;
    #fish100Button;

    constructor(){

        this.#player = new Player();
        this.#dealer = new Player();
        this.#game = new Game(this.#player,this.#dealer);

        this.#messagePrompt = document.querySelector("#MessagePrompt");

        this.#startButton = document.querySelector("#startButton");

        this.#main = document.querySelector("main");
        
        this.#playerHand = document.querySelector("#PlayerHand");
        this.#dealerHand = document.querySelector("#DealerHand");
        this.#totalPlayer = document.querySelector("#TotalPlayer")
        this.#totalDealer = document.querySelector("#TotalDealer")
        this.#betPlate = document.querySelector("#BetPlate")
        this.#playerMoney = document.querySelector("#PlayerMoney")

        this.#utilities = document.querySelector("#Utilities");

        this.#hitButton = document.querySelector("#HitButton");
        this.#stayButton = document.querySelector("#StayButton");
        this.#retryButton = document.querySelector("#RetryButton");

        this.#startRoundButton = document.querySelector("#startRoundButton");

        this.#fishZone = document.querySelector("#FishZone")

        this.#fish1Button = document.querySelector("#Fish1")
        this.#fish10Button = document.querySelector("#Fish10")
        this.#fish20Button = document.querySelector("#Fish20")
        this.#fish50Button = document.querySelector("#Fish50")
        this.#fish100Button = document.querySelector("#Fish100")

        this.#startButton.addEventListener("click",()=>{
            this.enableFishZone(); 
            this.disableStartButton()
        });

        this.#fish1Button.addEventListener("click",()=>{
            this.bet(Number(this.#fish1Button.value))
        });
        this.#fish10Button.addEventListener("click",()=>{
            this.bet(Number(this.#fish10Button.value))
        });
        this.#fish20Button.addEventListener("click",()=>{
            this.bet(Number(this.#fish20Button.value))
        });
        this.#fish50Button.addEventListener("click",()=>{
            this.bet(Number(this.#fish50Button.value))
        });
        this.#fish100Button.addEventListener("click",()=>{
            this.bet(Number(this.#fish100Button.value))
        });

        this.#startRoundButton.addEventListener("click",()=>{
            
            this.resetRound();
            const winner = this.#game.initialize();
            console.log(winner);
            this.#player.hand.forEach((card)=>{this.addCardToHand(this.#playerHand,card)})
            this.#dealer.hand.forEach((card)=>{this.addCardToHand(this.#dealerHand,card)})
            if(winner === true){this.#messagePrompt.textContent="BLACK JACK HAI VINTO"}
            if(winner === false){this.#messagePrompt.textContent="BLACK JACK DEL DEALER HAI PERSO"}
            this.disableStartRoundButton();
            this.#totalPlayer.textContent = this.#player.handPoints;
            this.#totalDealer.textContent = this.#dealer.handPoints;
        })

        this.#hitButton.addEventListener("click",()=>{
            
            if(this.#player.handPoints<21){
                const card = this.#game.gameDraw(this.#player);
                this.addCardToHand(this.#playerHand, card)
                this.#totalPlayer.textContent = this.#player.handPoints;
            }
            if(this.#player.handPoints>21){
                this.#messagePrompt.textContent = "hai sforato";
                this.disableUtilities();
                this.enableStstartRoundButton();
            }else{
                if(this.#dealer.handPoints < 17){
                const dealerCard = this.#game.gameDraw(this.#dealer);
                this.addCardToHand(this.#dealerHand, dealerCard)
                this.#totalDealer.textContent = this.#dealer.handPoints;
                if(this.#dealer.handPoints>21){
                    this.#messagePrompt.textContent = "il dealer ha sforato";
                    this.disableUtilities();                    
                }
            }
            }
            
            
        })

        this.#stayButton.addEventListener("click",()=>{
            if(this.#game.calculateWinner()){
                this.#messagePrompt.textContent =`${this.#player.handPoints} Hai vinto!, il banco aveva: ${this.#dealer.handPoints}`
                
            }else{
                this.#messagePrompt.textContent =`${this.#player.handPoints} Hai perso!, il banco aveva: ${this.#dealer.handPoints}`
                
            }
            this.#playerMoney.textContent = this.#player.money;

        })
    };

    bet(bet){
            this.#game.bet(bet); 
            this.#betPlate.textContent = this.#game.plate;
            this.#playerMoney.textContent = this.#player.money;
            this.enableAll()
    }

    addCardToHand(Hand,card){        
        console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
        
        let cardTarget = document.createElement("p");
        let cardTargetSuite = "";
        let cardTargetValue = 0;
        switch (card.suite) {
            case "Hearts":
                    cardTargetSuite= "♥"
                    cardTarget.classList.add("redSuite")
                break;
            case "Diamonds":
                    cardTargetSuite= "♦"
                    cardTarget.classList.add("redSuite")
                break;
            case "Clubs":
                    cardTargetSuite= "♣"
                    cardTarget.classList.add("blackSuite")
                break;
            case "Spades":
                    cardTargetSuite= "♠"
                    cardTarget.classList.add("blackSuite")
                break;
        
            default:
                break;
        }
        cardTargetValue = card.faceValue
        cardTarget.textContent = cardTargetSuite + " " + cardTargetValue;        
        Hand.appendChild(cardTarget);
    }

    resetRound(){
        this.#playerHand.innerHTML ="";
        this.#dealerHand.innerHTML ="";
        this.#messagePrompt.textContent ="";
        this.#dealer.resetHand();
        this.#player.resetHand();
        this.#game.plate = 0;

    };

    
    // ====UTILITIES====
    disableUtilities() {
        this.#utilities?.classList.add("disabled");
        this.#utilities?.querySelectorAll("button, input").forEach(el => el.disabled = true);
    }

    enableUtilities() {
        this.#utilities?.classList.remove("disabled");
        this.#utilities?.querySelectorAll("button, input").forEach(el => el.disabled = false);        
    }
    
    // ====START====

    disableStartButton() {
        this.#startButton?.classList.add("disabled");
        this.#startButton?.querySelectorAll("button, input").forEach(el => el.disabled = true);
    }

    enableStstartButton() {
        this.#startButton?.classList.remove("disabled");
        this.#startButton?.querySelectorAll("button, input").forEach(el => el.disabled = false);        
    }
    
    // ====START ROUNF====

    disableStartRoundButton() {
        this.#startRoundButton?.classList.add("disabled");
        this.#startRoundButton?.querySelectorAll("button, input").forEach(el => el.disabled = true);
    }

    enableStstartRoundButton() {
        this.#startRoundButton?.classList.remove("disabled");
        this.#startRoundButton?.querySelectorAll("button, input").forEach(el => el.disabled = false);        
    }

    // ====HANDS====
    disableHands() {
        this.#playerHand?.classList.add("disabled");
        this.#dealerHand?.classList.add("disabled");
    }

    enableHands() {
        this.#playerHand?.classList.remove("disabled");
        this.#dealerHand?.classList.remove("disabled");
    }

    // ====MAIN====
    disableMain() {
        this.#main?.classList.add("disabled");
    }

    enableMain() {
        this.#main?.classList.remove("disabled");
    }

    // ====ACTION BUTTONS====
    disableActionButtons() {
        this.#hitButton.disabled = true;
        this.#stayButton.disabled = true;
        this.#startButton.disabled = true;
        this.#retryButton.disabled = true;
    }

    enableActionButtons() {
        this.#hitButton.disabled = false;
        this.#stayButton.disabled = false;
        this.#startButton.disabled = false;
        this.#retryButton.disabled = false;
    }

    // ====FISH====
    disableFishZone() {
        this.#fishZone?.classList.add("disabled");
    }

    enableFishZone() {
        this.#fishZone?.classList.remove("disabled");
    }

    disableFishButtons() {
        this.#fish1Button.disabled = true;
        this.#fish10Button.disabled = true;
        this.#fish20Button.disabled = true;
        this.#fish50Button.disabled = true;
        this.#fish100Button.disabled = true;
    }

    enableFishButtons() {
        this.#fish1Button.disabled = false;
        this.#fish10Button.disabled = false;
        this.#fish20Button.disabled = false;
        this.#fish50Button.disabled = false;
        this.#fish100Button.disabled = false;
    }

    disableAll() {
        this.disableUtilities();
        this.disableHands();
        this.disableMain();
        this.disableActionButtons();
        this.disableFishZone();
        this.disableFishButtons();
        this.disableStartRoundButton(); 
    }

    enableAll() {
        this.enableUtilities();
        this.enableHands();
        this.enableMain();
        this.enableActionButtons();
        this.enableFishZone();
        this.enableFishButtons();   
        this.enableStstartRoundButton ();    
    }
}

const PH = new PageHandler();
