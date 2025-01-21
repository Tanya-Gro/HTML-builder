const fs = require('fs');
const path = require('path');

const writeFile = path.join(__dirname, 'input.txt');
const writable = fs.createWriteStream(writeFile);

process.stdout.write('Enter the text or "EXIT" to finish\n');
process.stdin.on('data', (data) => {
  const input = data.toString().trim();
  input.toLowerCase() === 'exit' ? exit() : writable.write(input + '\n');
});

function exit() {
  process.stdout.write('Good luck!\n');
  process.exit();
}

process.on('SIGINT', exit);