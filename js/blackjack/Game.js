class Game{
    #UI;
    #player;
    #house;
    #deck;
    
    constructor(){
        this.#UI = new UI();
        this.#player = new Actor(21, "tablePlayer");
        this.#house = new Actor(17, "tableCpu");
        this.#deck = new Deck();
        Game.#buttonsInit(this);
    }

    static #buttonsInit(gameObject){
        const startButton = document.querySelector("#start");

        const cloneStartButton = startButton.cloneNode(true);
        startButton.parentNode.replaceChild(cloneStartButton, startButton);

        cloneStartButton.addEventListener("click", () =>{
            gameObject.start();
        });

        const hitButton = document.querySelector("#hit");

        const cloneHitButton = hitButton.cloneNode(true);
        hitButton.parentNode.replaceChild(cloneHitButton, hitButton);

        cloneHitButton.disabled = true;
        cloneHitButton.addEventListener("click", () =>{
            gameObject.hit(gameObject.getPlayer());
        });

        const standButton = document.querySelector("#stand");

        const cloneStandButton = standButton.cloneNode(true);
        standButton.parentNode.replaceChild(cloneStandButton, standButton);

        cloneStandButton.disabled = true;
        cloneStandButton.addEventListener("click", () =>{
            gameObject.stand(gameObject.getPlayer());
        });

        const resetButton = document.querySelector("#reset");

        const cloneResetButton = resetButton.cloneNode(true);
        resetButton.parentNode.replaceChild(cloneResetButton, resetButton);

        cloneResetButton.addEventListener("click", () =>{
            Game.resetGame();
        });
    }

    start(){
        document.querySelector("#hit").disabled = false;
        document.querySelector("#stand").disabled = false;
       
        this.#player.setScore(0);
        this.#house.setScore(0);

        if(this.#deck.isEmpty()){
            this.#deck = new Deck();
        }
        this.#deck.shuffle();
        this.dealStartingHands();
        if(this.#house.getScore() === 21){
            return this.calculateWinner();
        }
        if(this.#player.getScore() === 21){
            return this.calculateWinner();
        }
    }

    dealStartingHands(){
        this.#player.resetHand();
        this.#house.resetHand();
        this.dealCard(this.#player);
        this.dealCard(this.#house);
        this.dealCard(this.#player);
        this.dealCard(this.#house);
    }

    dealCard(actor){
        actor.addCard(this.#deck.draw());
        this.#UI.renderHand(actor);
        this.#UI.renderScore(actor);
    }

    stand(actor){
        if(actor === this.#player){
            this.playCpu();
        }else{
            this.calculateWinner();
        }
    }

    hit(actor){
        this.dealCard(actor);
        if(actor.isLimitReached()){
            if(actor.hasBusted()){
                this.calculateWinner();
                return;
            }
            this.stand(actor);
        }
    }

    playCpu(){
        while(!this.#house.isLimitReached()){
            this.hit(this.#house);
        }
    }

    calculateWinner(){
        document.querySelector("#hit").disabled = true;
        document.querySelector("#stand").disabled = true;

        if(this.#player.getScore() > 21){
            return this.triggerAlert("Hai sballato! Hai perso");
        }
        if(this.#house.getScore() > 21){
            return this.triggerAlert("Il banco ha sballato! Hai vinto!");
        }
        if(this.#player.getScore() > this.#house.getScore()){
            return this.triggerAlert("hai vinto!");
        }
        return this.triggerAlert("Il banco vince sempre!");
    }

    triggerAlert(msg){
        setTimeout(function() {
            alert(msg);
        }, 1);
    }

    static resetGame(){
        new Game();
    }

    getPlayer(){
        return this.#player;
    }
}

