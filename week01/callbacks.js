// function fun() {
//     console.log(this);
//     console.log('fun got called');
// }
//
// let arrowFun = () => {
//     console.log(this);
//     console.log('arrowFun got called');
// }
//
// fun();
// arrowFun();
//
// console.log('Global this', this);

let myCallback = () => {
    console.log('myCallback got called!');
}

setTimeout(myCallback, 3000);
console.log('The log after the timeout');