const fs = require('fs');
const path = require('path');

const workFolder = path.join(__dirname, 'project-dist');
const componentsFolder = path.join(__dirname, 'components');
const pathAssetsFolder = path.join(__dirname, 'assets');

(async function () {
  try{
    // 1.0 создаем папку
    fs.mkdir(workFolder, { recursive: true }, (err) => {
      if (err) {
        console.error('can`t make a PROJECT-DIST folder: ', err);
        return;
      }
    });
    // 2.0 форматируем html
    await formatHTML();
    // 3.0 бандл css
    await makeBundle();
    // 4.0 копируем папку
    fs.readdir(pathAssetsFolder, { withFileTypes: true }, getFilesInformation);
    console.log('Suссess!');
  } catch (err) {
    console.error('There is some problem: ', err);
  }
})();

async function formatHTML () {
  // читаем template.html
  let template = await fs.readFile(path.join(__dirname, 'template.html'), 'utf8');
  // получаем компоненты
  const components = fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true });
  
  const templatesArray = [...template.matchAll(/{{\s*([\w]+)\s*}}/)];

  console.log(templatesArray);

  templatesArray.forEach(async (item) => {
    try {
      const templateContent = await fs.readFile(path.join(componentsFolder, item + '.html'), 'utf8');
      template = template.replace(item, templateContent);
    } catch (err) {
      console.error(`File ${path.join(componentsFolder, item + '.html')} is not exist`)
    }
    await fs.writeFile(path.join(workFolder, 'index.html'), template);
  });
}

// function makeBundle(){
//   try {
//     //читаем папку с файлами стилей
//     const styles = await fs.readdir(stylesFolderFrom, { withFileTypes: true });
//     //создаем бандл
//     await fs.writeFile(path.join(workFolder, 'style.css'), '', 'utf8');
//     styles.forEach(async (file) => {
//       //игнорируем не файлы стилей
//       if (file.isFile() && path.extname(file.name) === '.css') {
//         //записываем в бандлер
//         await fs.appendFile(
//           path.join(workFolder, 'style.css'),
//           await fs.readFile(`${stylesFolderFrom}\\${file.name}`,
//             {encoding: 'utf8'}));
//       }
//     });
//     console.log('bundle css was created successfully');
//   } catch (err) {
//     console.error('bundle css wasn`t created:', err);
//     return;
//   }
// }

// function getFilesInformation(err, files) {
//   if (err) {
//     console.error('assets files coudn`t be copied', err);
//     return;
//   }
//   files.forEach((file) => {
//     if (!file.isFile()) return;

//     const filePath = path.join(pathAssetsFolder, file.name);
//     //const ext = path.extname(filePath);
//     fs.stat(filePath, (err, stats) => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log(`${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${Math.floor(stats.size/1.024)/1000}kb`);
//       }
//     });
//   });
// };