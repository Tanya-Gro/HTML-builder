const fs = require('fs');
const path = require('path');

const writeFile = path.join(__dirname, 'input.txt');
const writable = fs.createWriteStream(writeFile);

process.stdout.write('Enter the text or "q" for exit\n');
process.stdin.on('data', (data) => {
  const input = data.toString().trim();
  input === 'q' || input === 'Q' ? exit() : writable.write(input + '\n');
});

function exit() {
  process.stdout.write('See you)\n');
  process.exit();
}