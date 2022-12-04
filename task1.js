import * as readline from 'node:readline';
import { stdin as input } from 'node:process';

const rl = readline.createInterface({input});
rl.on('line', (input)=> console.log(input.split('').reverse().join('')));