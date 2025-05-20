class UI{
    #HandDivName;
    #ScoreDivName;

    constructor(HandDivName = "hand", ScoreDivName = "score"){
        this.#HandDivName = HandDivName;
        this.#ScoreDivName = ScoreDivName;
    }

    renderHand(actor){
        const handSpace = document.querySelector(`#${actor.getIdTable()} [name=${this.#HandDivName}]`);
        handSpace.textContent = "";
        actor.getHand().forEach(card => {
            handSpace.textContent += card.getSign() + card.getNumber() + "  ";
        })
    };
    
    renderScore(actor){
        const scoreSpace = document.querySelector(`#${actor.getIdTable()} [name=${this.#ScoreDivName}]`);
        scoreSpace.textContent = actor.getScore();
    };
}





