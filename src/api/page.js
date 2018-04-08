import fs from 'fs';
import path from 'path';
import copydirectory from 'copydirectory';
import { getTemplate, writeFile } from './utils';

function create(payload) {
    var template = getTemplate('indexHTML.create');
    var source = template(payload);
    var filePath = path.join(payload.sourcePath, payload.filePath);
    writeFile(filePath, source);

    if (payload.css) {
        let cssFilePath = filePath;
        var en = extname(filePath);

        if (en) {
            cssFilePath = filePath.slice(0, filePath.lastIndexOf(en));
        }

        cssFilePath = cssFilePath + '.css';
        writeFile(cssFilePath, `\r\n.normal {\r\n}\r\n`);
    }
}


export function createTemp(currentDir, changDirName, config, cb) {
    fs.mkdir(currentDir, function(err) {
        if (err) {
            console.log('创建文件夹出错！');
        } else {
            copydirectory(path.resolve(__dirname, '../../boilerplates'), currentDir, function() {
                create(Object.assign({
                    'sourcePath': path.join(currentDir, '/' + changDirName)
                }, config));
                cb && cb();
            });
        }
    });
}