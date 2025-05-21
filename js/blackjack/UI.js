class UI{
    #HandDivName;
    #ScoreDivName;
    static #styleIsAlreadyInitialized

    constructor(HandDivName = "hand", ScoreDivName = "score"){
        this.#HandDivName = HandDivName;
        this.#ScoreDivName = ScoreDivName;
        if(!UI.#styleIsAlreadyInitialized)
        {
            console.log("HO STAMPATO TUTTO");
            this.initPageStyle();
        }
        UI.#styleIsAlreadyInitialized = true;
    }

    initPageStyle(){
        // Add Bootstrap container and title
        const container = document.createElement('div');
        container.classList.add('container', 'text-center');
        document.body.prepend(container);

        const title = document.createElement('h1');
        title.textContent = 'Blackjack';
        title.classList.add('text-primary');
        container.appendChild(title);

        // Move all other content into the container
        const elements = Array.from(document.body.children).slice(1);
        elements.forEach(el => container.appendChild(el));

        // Style table
        const tables = document.querySelectorAll('[name="table"]');
        tables.forEach(table => {
            table.classList.add('panel', 'panel-default');
            const tableHeading = table.querySelector('[name="table-owner"]');
            tableHeading.classList.add('panel-heading');

            const tableContent = table.querySelector('[name="table-content"]');
            tableContent.classList.add('panel-body');

            const tableHand = table.querySelector('[name="hand"]');
            tableHand.classList.add('well', 'well-sm');
        })

        // Style buttons
        const buttonGroup = document.querySelector('[name="buttons"]');
        buttonGroup.classList.add('btn-group', 'btn-group-lg');
        buttonGroup.setAttribute('role', 'group');
        buttonGroup.setAttribute('aria-label', 'Game Controls');

        const buttons = {
            '#start': 'btn btn-success',
            '#hit': 'btn btn-warning',
            '#stand': 'btn btn-info',
            '#reset': 'btn btn-danger'
        };

        for (const [selector, classes] of Object.entries(buttons)) {
            const button = document.querySelector(selector);
            if (button) {
                button.className = classes;
            }
        }
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





