const fs = require('fs');

let data = fs.readFileSync('./text.txt');
console.log(data.toString());

fs.readFile('./text.txt', {}, (err, buff) => {
    console.log(buff.toString());
});

console.log('END!')