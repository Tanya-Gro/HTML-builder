const fs = require('fs');
const path = require('path');

const folderName = path.join(__dirname, 'secret-folder');
fs.readdir(folderName, { withFileTypes: true }, getFilesInformation);

function getFilesInformation(err, files) {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach((file) => {
    if (!file.isFile()) return;

    const filePath = path.join(folderName, file.name);
    //const ext = path.extname(filePath);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${Math.floor(stats.size/1.024)/1000}kb`);
      }
    });
  });
};