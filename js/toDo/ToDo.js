class ToDo {
    #titolo;
    #descrizione;
    #dataCreazione;
    #dataScadenza;
    #dataCompletamento;
    #stato;
    #categoria;

    constructor(titolo, descrizione, categoria, dataScadenza = null) {
        this.#titolo = titolo;
        this.#descrizione = descrizione;
        this.#dataCreazione = new Date();
        this.#categoria = categoria;
        this.#dataScadenza = dataScadenza;
        this.#dataCompletamento = null;
        this.#stato = false;
    }
    toJSON() {
        return {
            titolo: this.titolo,
            descrizione: this.descrizione,
            dataCreazione: this.dataCreazione,
            dataScadenza: this.dataScadenza,
            dataCompletamento: this.#dataCompletamento,
            stato: this.stato,
            categoria: this.categoria
        };
    }
    static fromObject(obj) {
        return new ToDo(
            obj.titolo,
            obj.descrizione,
            obj.dataCreazione,
            obj.dataScadenza,
            obj.dataCompletamento,
            obj.stato,
            obj.categoria
        );
    }

    changeStatus(){
        stato = !this.#stato;
    }

    get titolo() {
        return this.#titolo;
    }
    set titolo(value) {
        this.#titolo = value;
    }

    get descrizione() {
        return this.#descrizione;
    }
    set descrizione(value) {
        this.#descrizione = value;
    }

    get dataCreazione() {
        return this.#dataCreazione;
    }

    get dataScadenza() {
        return this.#dataScadenza
    }
    set dataScadenza(value) {
        this.#dataScadenza = value;
    }

    get dataCompletamento() {
        return this.#dataCompletamento
    }
    set dataCompletamento(value) {
        this.#dataCompletamento = value;
    }

    get stato() {
        return this.#stato ? "completato" : "incompleto";
    }

    get categoria() {
        return this.#categoria;
    }
    set categoria(value) {
        this.#categoria = value;
    }
}