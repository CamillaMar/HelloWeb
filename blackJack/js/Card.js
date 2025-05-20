class Card {

    constructor(suit, rank, value) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
        this.isHidden = false;
        this.container;
    }

    render(forPlayer) {
        const div = document.createElement("div");
        div.classList.add("card");

        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");
        div.appendChild(cardFront);

        const valueSuit = document.createElement("section");
        valueSuit.classList.add("value-suit");
        valueSuit.innerHTML = `<p>${this.rank}<br><span>${this.suit}</span></p>`;

        const bigSuit = document.createElement("section");
        bigSuit.classList.add("big-suit");
        bigSuit.innerHTML = `<div>${this.suit}</div>`;

        cardFront.appendChild(valueSuit);
        cardFront.appendChild(bigSuit);

        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");
        div.appendChild(cardBack);

        if (forPlayer) {
            document.querySelector("section.player section.hand").appendChild(div);
        } else {
            document.querySelector("section.dealer section.hand").appendChild(div);
        }
        this.container = div;
    }

    hide() {
        this.isHidden = true;
        this.container.classList.toggle("hidden", true); //toggle=
    }

    show() {
        this.isHidden = false;
        this.container.classList.toggle("hidden", false);
    }
}