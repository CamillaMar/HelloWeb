abstract class Shape {
    constructor(private _color: string, private _height: number, private _width: number){}

    abstract area(): number;

    showDescrption(): void {
        console.log(`Una figura di colore ${this._color}`);
    }


}

class Circle extends Shape {
    constructor(color: string, height: number, width: number, private _radius: number){
        super(color, height, width);
    }

    area(): number {
        return Math.PI * this._radius * this._radius;
    }
}