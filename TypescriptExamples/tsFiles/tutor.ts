export class Tutor {
    constructor(private _name: string, private _isPsychologist: boolean){ }

    get name(){
        return this._name;
    }
    set name(name){
        this._name = name;
    }

    get isPsychologist(){
        return this._isPsychologist;
    }
    set isPsychologist(isPsychologist){
        this._isPsychologist = isPsychologist;
    }
}