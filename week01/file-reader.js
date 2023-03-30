const fs = require('fs');

if (process.argv.length !== 3) {
    console.log('A file location is a required argument!');
    return;
}

let file = process.argv[2];
console.log(file);

// function fun() {

// }

// let f2 = () => {};

fs.readFile(file, (err, buff) => {
    if (err) {
        console.error(err);
        return;
    }

    let data = buff.toString();
    data += 'Edited: ' + (new Date).toISOString() + '\n';

    fs.writeFile(file, data, (err, buff) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('Done!');
    })
})