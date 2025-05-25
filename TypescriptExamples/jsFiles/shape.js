"use strict";
class Shape {
    _color;
    _height;
    _width;
    constructor(_color, _height, _width) {
        this._color = _color;
        this._height = _height;
        this._width = _width;
    }
    showDescrption() {
        console.log(`Una figura di colore ${this._color}`);
    }
}
class Circle extends Shape {
    _radius;
    constructor(color, height, width, _radius) {
        super(color, height, width);
        this._radius = _radius;
    }
    area() {
        return Math.PI * this._radius * this._radius;
    }
}
