const fs = require('fs');
const path = require('path');

const folderFrom = path.join(__dirname, 'styles');
const fileInto = path.join(__dirname, 'project-dist', 'bundle.css');

(async function () {
  try {
    //читаем папку с файлами стилей
    const styles = await fs.readdir(folderFrom, { withFileTypes: true });
    //создаем бардлер
    await fs.writeFile(fileInto, '', 'utf8');
    styles.forEach(async (file) => {
      //игнорируем не файлы стилей
      if (file.isFile() && path.extname(file.name) === '.css') {
        //записываем в бандлер
        await fs.appendFile(
          fileInto,
          await fs.readFile(`${folderFrom}\\${file.name}`,
            {encoding: 'utf8'}));
      }
    });
    console.log('bundle was created successfully');
  } catch (err) {
    console.error('bundle wasn`t created:', err);
  }
})();