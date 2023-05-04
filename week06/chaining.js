import fs from 'fs';
import fsP from 'node:fs/promises';

fs.readFile('location.txt', (err, buff) => {
    if (err) {
        console.error(err)
        return;
    }

    let location = buff.toString();
    console.log('I have the location', location);

    fs.readFile(location, (err, buff) => {
        // let location = 'New location!'
        if (err) {
            console.error(err)
            return;
        }

        console.log('I read the second file!', buff.toString());
    })

    // setTimeout(() => {
    //     console.log(location);
    // }, 1000)
});

fsP.readFile('location.txt')
    .then((buff) => {
        console.log('Promise content of location', buff.toString());
        return fsP.readFile(buff.toString());
    })
    .then((buff) => {
        console.log('Promise: Content of second file', buff.toString());
    })
    .catch((err) => {
        console.error(err);
    });

try {
    // I can name variables what ever I want!
    let buff = await fsP.readFile('location.txt');
    console.log('Await content of location', buff.toString());
    let buff2 = await fsP.readFile(buff.toString());
    console.log('Await: Content of second file', buff2.toString());
} catch(err) {
    console.error(err);
}
