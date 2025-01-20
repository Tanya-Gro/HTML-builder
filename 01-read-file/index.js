const fs = require('fs');
const path = require('path');

const fileToRead = path.join(__dirname, 'text.txt');
const readeble = fs.createReadStream(fileToRead, 'utf-8');

readeble.on('data', (chunk) => console.log(chunk));
readeble.on('error', (err) => console.error(err));
