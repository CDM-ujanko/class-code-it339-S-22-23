import { parseCsvString } from "./lib/csv-helpers.js";
import { program } from "commander";
import fs from "fs";

const OPTS = ['sum', 'avr', 'min', 'max'];

program
    .command('read <file> <operation>')
    .description('Read a csv file!')
    .action((file, opt) => {
        
        console.log(file);
        fs.readFile(file, (err, buff) => {
            if (err) {
                console.error(err);
                return;
            }

            let data = parseCsvString(buff.toString());
            
            console.log(data);

            if (!OPTS.includes(opt)) {
                console.log(`Invlid operation '${opt}'`)
            }
            
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
            } else  {
                console.log(Math.min(...data));
            }
        })
    })


program.parse();