import { Tutor } from "tutor"
class SpecialTutor extends Tutor {
    public static maxAge = 50;

    constructor(name: string, isPsychologist: boolean, private _numberOfClasses: number){
        super(name, isPsychologist);
    }

    static myStaticMethod(): void{

    }

    get numberOfClasses(){
        return this._numberOfClasses;
    }
    set numberOfClasses(number: number){
        this._numberOfClasses = number;
    }
}