const fs = require('fs');

if (process.argv.length !== 4) {
    console.log('Requires a file and an operation');
    return;
}

let opts = ['sum', 'avr', 'min', 'max'];
if (!opts.includes(process.argv[3])) {
    console.log(`The operation has to be one of '${opts.join(', ')}'`);
}

function processCsv(str) {
    let data = [];
    let rows = str.split('\r\n');
    for (let i = 0; i< rows.length; i++) {
        let numbers = rows[i].split(',');
        for(let j = 0; j < numbers.length; j++) {
            data.push(parseInt(numbers[j]))
        }
    }

    return data;
}
    

fs.watchFile(process.argv[2], (curr, prev) => {
    // if (err) {
    //     console.error(err);
    //     return;
    // }
    console.log(curr);

    let stringData = fs.readFileSync(process.argv[2]).toString();
    let data = processCsv(stringData);
    let opt = process.argv[3];
    if (opt  === 'sum') {
        let sum = 0;
        for (let i = 0; i< data.length; i++) {
            sum += data[i];
        }
        console.log(sum);
    } else if (opt  === 'avr') {
        let sum = 0;
        for (let i = 0; i< data.length; i++) {
            sum += data[i];
        }
        console.log(sum/data.length);
    } else if (opt === 'max') {
        console.log(Math.max(...data));
    } else {
        console.log(Math.min(...data));
    }
});