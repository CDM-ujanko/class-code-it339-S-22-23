// import { sum, avg } from "./math.js";

// console.log(sum([12, 44, 55, 46]));
// console.log(avg([12, 44, 55, 46]));

import * as math from "./math.js";

import {default as def, test2 as t2} from "./default-export.js"
import { bob } from "./lib/modules.js";

console.log(math.sum([12, 44, 55, 46]));
console.log(math.avg([12, 44, 55, 46]));

def();
t2();