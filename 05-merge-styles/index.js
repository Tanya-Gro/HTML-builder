const fs = require('fs/promises');
const path = require('path');

const folderFrom = path.join(__dirname, 'styles');
const fileInto = path.join(__dirname, 'project-dist', 'bundle.css');

(async function () {
  try {
    // Читаем папку с файлами стилей
    const styles = await fs.readdir(folderFrom, { withFileTypes: true });

    // Создаем (или очищаем) бандл
    await fs.writeFile(fileInto, '', 'utf8');

    // Обрабатываем файлы последовательно
    for (const file of styles) {
      //игнорируем не файлы стилей
      if (file.isFile() && path.extname(file.name) === '.css') {
        const filePath = path.join(folderFrom, file.name); // Полный путь к CSS-файлу
        const cssContent = await fs.readFile(filePath, 'utf8'); // Чтение файла
        await fs.appendFile(fileInto, cssContent, 'utf8'); // Добавление содержимого в бандл
      }
    }

    console.log('bundle was created successfully');
  } catch (err) {
    console.error('bundle wasn`t created: ', err);
  }
})();