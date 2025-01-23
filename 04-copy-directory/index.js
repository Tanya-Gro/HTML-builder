const fs = require('fs/promises');
const path = require('path');

const originFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

(async () => {
  try {
    // Проверяем существование папки назначения
    try {
      await fs.stat(copyFolder); // Проверяем, существует ли папка
      const files = await fs.readdir(copyFolder); // Считываем файлы
      // Очищаем папку, удаляя все файлы внутри
      await Promise.all(
        files.map((file) =>
          fs.rm(path.join(copyFolder, file), { recursive: true, force: true })
        )
      );
    } catch (err) {
      // Если папки нет, создаем ее
      if (err.code === 'ENOENT') {
        await fs.mkdir(copyFolder, { recursive: true });
      } else {
        throw err; // Перебрасываем ошибку, если это что-то другое
      }
    }

    // Читаем файлы из исходной папки
    const filesToCopy = await fs.readdir(originFolder);

    // Копируем каждый файл в папку назначения
    await Promise.all(
      filesToCopy.map((file) =>
        fs.copyFile(
          path.join(originFolder, file),
          path.join(copyFolder, file)
        )
      )
    );

    console.log('Files was copyed succesfully!');
  } catch (err) {
    console.error('Files caudn`t be copyed:', err);
  }
})();