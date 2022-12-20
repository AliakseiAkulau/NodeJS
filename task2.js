import fs from 'fs';
import path from "path";
import csv from 'csvtojson';
import url from 'url';
import { pipeline } from 'stream';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const csvPath = path.join(__dirname, './csv/nodejs-hw1-ex1.csv');
const txtPath = path.join(__dirname, 'result.txt');

const readStream = fs.createReadStream(csvPath);
const writeStream = fs.createWriteStream(txtPath);

const toLowerKeys = (obj) => Object.keys(obj).reduce((acc, key) => {
    acc[key.toLocaleLowerCase()] = obj[key];
    return acc
}, {});

const transform = csv().subscribe((json) => {
    toLowerKeys(json);
});

const errorHandler = (err) => {
    if (err) {
        console.error(err.message)
    }
};

pipeline(readStream, transform, writeStream, errorHandler);
