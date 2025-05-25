"use strict";
class Teacher {
    name;
    yearsOfExperience;
    constructor(name, yearsOfExperience) {
        this.name = name;
        this.yearsOfExperience = yearsOfExperience;
    }
    teach(hours) {
        return `${this.name} insegna per ${hours} ore.`;
    }
}
