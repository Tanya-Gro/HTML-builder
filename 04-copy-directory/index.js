const fs = require('fs');
const path = require('path');

function copyDir(from, into) {
  const originFolder = path.join(__dirname, from);
  const copyFolder = path.join(__dirname, into);

  try {
    // проверяем есть ли папка назначения
    fs.stat(copyFolder, (err) => { 
      if (err) {
        // console.error('f', err.code, copyFolder);
        // папки нет. создаем ее.
        fs.mkdir(copyFolder, (err) => {
          if (err) {
            return console.error(err);
          }
          //console.log('Directory created successfully!');
        }); 
      } else {
        // папка назначения есть. очищаем ее.
        clearFolder(into);
      }
    });
    //копируем
    const files = fs.readdir(originFolder, (err, files) => {
      if (err) {
        console.error(err);
        return;
      } else if (files) {
        files.forEach((file) => {
          //console.log(`${originFolder}\\${file}`, `${copyFolder}\\${file}`);
          fs.copyFile(`${originFolder}\\${file}`, `${copyFolder}\\${file}`, (err)=> {if (err) console.error('Error copping')});
        });
      }});

    console.log('coping completed');
  } catch (err) {
    console.error('copyDir can`t copy files');
  }
}

function clearFolder(into) {
  //читаем папку
  const folderToClear = path.join(__dirname, into);
  // console.log('удаляем содержимое папки', folderToClear);
  fs.readdir(folderToClear, (err, files) => {
    if (err) {
      console.error(err);
      return;
    } else if (files) {
      // очищаем папку
      files.forEach((file) => {
        // console.log(folderToClear + file);
        fs.unlink(`${folderToClear}\\${file}`, (err) => {
          if (err) console.error('fs.unlink:', err);
        });
      })
  }});
}

copyDir('files', 'files-copy');