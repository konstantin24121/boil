require('./config');

const path = require('path');
const fs = require('fs');
const manifestFileName = path.join(
  global.boil.src,
  'static/icons/IconsManifest.ts',
);
if (fs.existsSync(manifestFileName)) fs.unlinkSync(manifestFileName);

fs.readdir(path.join(global.boil.src, 'static/icons'), function(err, items) {
  let content = 'const icons = {';
  let declaration = 'export enum EIconNames {';
  for (var i = 0; i < items.length; i++) {
    declaration += `${path.basename(items[i], '.svg')},`;
    content += `[EIconNames.${path.basename(items[i], '.svg')}]: require('icons/${items[i]}'),`;
  }
  declaration += '}';
  content += '};export {icons};';

  fs.writeFile(manifestFileName, declaration + content, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log('Icons generated, moron');
  });
});
