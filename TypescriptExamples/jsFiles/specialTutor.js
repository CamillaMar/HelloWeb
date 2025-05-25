import { Tutor } from "tutor";
class SpecialTutor extends Tutor {
    _numberOfClasses;
    static maxAge = 50;
    constructor(name, isPsychologist, _numberOfClasses) {
        super(name, isPsychologist);
        this._numberOfClasses = _numberOfClasses;
    }
    static myStaticMethod() {
    }
    get numberOfClasses() {
        return this._numberOfClasses;
    }
    set numberOfClasses(number) {
        this._numberOfClasses = number;
    }
}
