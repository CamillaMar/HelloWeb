export class Tutor {
    _name;
    _isPsychologist;
    constructor(_name, _isPsychologist) {
        this._name = _name;
        this._isPsychologist = _isPsychologist;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get isPsychologist() {
        return this._isPsychologist;
    }
    set isPsychologist(isPsychologist) {
        this._isPsychologist = isPsychologist;
    }
}
