import fsPromises from 'node:fs/promises';
import fs from 'fs';

console.log('Got to line 4');
fsPromises.readFile('test.txt')
    .then(buf => {
        console.log('Promises way!');
        console.log(buf.toString())
        return buf.toString();
    })
    .catch(err => {
        console.log(err);
    })

console.log('Got to line 15');
fs.readFile('test.txt', (err, buff) => {
    console.log('Callback way!');

    if (err) {
        console.error(err)
        return;
    }

    console.log(buff.toString());
});

console.log('Got to line 26');
(async () => {
    try {
        let buf = await fsPromises.readFile('test.txt');
        // let buf2 = await fsPromises.readFile(buf.toString());
        console.log('Await syntax');
        console.log(buf.toString());
    } catch (err) {
        console.error(err);
    }
})();
