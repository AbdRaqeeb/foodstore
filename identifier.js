/**
 * Generate mongoose ID for seeding database
 * Generate reference strings for orders
 * Generated references are written to a file 'ref.txt' in root directiory
 * Generated mongoose id are written to a file 'id.txt' in root directiory
 *
 * Run "node indentifier.js"
 **/
import fs from 'fs';
import mongoose from 'mongoose';
import colors from 'colors';
import cryptoRandomString from "crypto-random-string";

const arr = [];
const ref = [];

const getId = () => {
    let id;
    let rf;
    for (let i = 0; i < 61; i++) {
        id = new mongoose.Types.ObjectId();
        arr.push(id);
        rf = cryptoRandomString({length: 15, type: 'distinguishable'});
        ref.push(rf);
    }
};


getId();

const data = arr.join('\n\n');

const references = ref.join('\n\n');


fs.writeFile('id.txt', data, (err) => {
    if (err) return console.log(err);
    console.log('Ids generated successfully'.inverse.green);
});

fs.writeFile('ref.txt', references, (err) => {
    if (err) return console.log(err);
    console.log('Refs generated successfully'.inverse.green);
});
