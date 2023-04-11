class Rectangle {
    height;
    width;

    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    area() {
        return this.height * this.width;
    }
    
    valueOf() {
        return this.area();
    }
} 

class Square extends Rectangle {
    #side;

    constructor(side) {
        super(side, side)
        this.#side = side;
    }

    valueOf() {
        return super.valueOf() + 10;
    }

    getSide() {
        this.#privateMethod();
        return this.#side;
    }

    #privateMethod() {
        console.log('I\'m a private method');
    }
}

let rect = new Rectangle(10, 5);
let rect2 = new Rectangle(11, 5);
// console.log(rect, rect.area());
// console.log(rect2, rect2.area());

console.log(rect + rect2);



// let arr = [];

// for(let i=0; i < 10; i++) {
//     arr.push(new Rectangle(i, i*i));
// }

// console.log(arr);

let square = new Square(10);
console.log(square, square.area(), square.width, square.getSide());

console.log(square + square);

