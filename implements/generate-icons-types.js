require('./config');

const path = require('path');
const fs = require('fs');
const manifestFileName = path.join(global.boil.src, 'static/icons/IconsManifest.ts');
if (fs.existsSync(manifestFileName)) {
  fs.unlinkSync(manifestFileName);
}

function camelize(str) {
  const regexp = new RegExp(/([a-zA-Z]{1}[a-z]*)/g);
  let match;
  match = regexp.exec(str);
  let camilizeStr = match[0].toLowerCase();
  while ((match = regexp.exec(str)) !== null) {
    const matchStr = match[0];
    camilizeStr += matchStr.substr(0, 1).toUpperCase() + matchStr.substring(1);
  }
  return camilizeStr;
}

fs.readdir(path.join(global.boil.src, 'static/icons'), function(err, items) {
  let content = 'const icons = {';
  let declaration = 'export enum EIconNames {';
  for (var i = 0; i < items.length; i++) {
    const name = camelize(path.basename(items[i], '.svg'));
    declaration += `${name},`;
    content += `[EIconNames.${name}]: require('icons/${items[i]}'),`;
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
