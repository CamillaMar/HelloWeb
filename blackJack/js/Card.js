class Card {
    
    constructor(suit, rank, value) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
    }

    render(forPlayer){
        const div = document.createElement("div");
        div.classList.add("card");
        const valueSuit = document.createElement("section");
        valueSuit.classList.add("value-suit");
        valueSuit.innerHTML = `<p>${this.value}<br><span>${this.suit}</span></p>`;
        const bigSuit = document.createElement("section");
        bigSuit.classList.add("big-suit");
        bigSuit.innerHTML = `<span>${this.suit}</span>`;
        div.appendChild(valueSuit);
        div.appendChild(bigSuit);
        if (forPlayer){
            document.querySelector("section.player section.hand").appendChild(div);
        } else {
            document.querySelector("section.dealer section.hand").appendChild(div);
        }
    }
}