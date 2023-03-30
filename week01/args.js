// console.log(process.argv);

// let x = 6;
// let m = "aaa 'dpiaj' dd";
// let logic = false;

// let arr = [];
// let obj = {}

if (process.argv.length !== 3) {
    console.log('Name is a required argument!');
    return;
}

// console.log('Hello ' + process.argv[2] + ' nice to meet you!');
console.log(`Hello ${process.argv[2]} nice to meet you!`);


