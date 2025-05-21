class Developer {
    constructor(firstName, lastName, favouriteLanguage) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.favouriteLanguage = favouriteLanguage;
    }

    writeCode() {
        console.log(`${this.firstName} sta scrivendo codice`);
    }

    toString() {
        return `${this.firstName} ${this.lastName} ${this.favouriteLanguage}`;
    }
}

class Architect extends Developer {
    // Variabili private, iniziano con # (dal 2022 RECENTISSIMA)
    #seniority; 
    #numOfPatterns;

    constructor(firstName, lastName, favouriteLanguage, seniority, numOfPatterns) {
        super(firstName, lastName, favouriteLanguage);
        this.#seniority = seniority;
        this.#numOfPatterns = numOfPatterns;
    }

    writeCode() {
        console.log(`${this.firstName} fa scrivere codice ad altri`);
    }

    design() {
        console.log(`${this.firstName} scrive l'architettura dell'applicazione`);
    }
}