class Teacher {
    name: string;
    yearsOfExperience: number;

    constructor(name: string, yearsOfExperience: number){
        this.name = name;
        this.yearsOfExperience = yearsOfExperience;
    }

    teach(hours: number): string {
        return `${this.name} insegna per ${hours} ore.`;
    }
}