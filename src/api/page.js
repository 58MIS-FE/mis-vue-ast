import fs from 'fs';
import path from 'path';
import copydirectory from 'copydirectory';
import { getTemplate, writeFile } from './utils';

function createTemp(currentDir, cb) {
    fs.mkdir(currentDir, function(err) {
        if (err) {
            console.log('创建文件夹出错！');
        } else {
            copydirectory(path.resolve(__dirname, '../../boilerplates'), currentDir, function() {
                console.log(33);
                cb && cb();
            });
        }
    });

}

createTemp('/Users/liushaohua/Documents/DATA/mis-vue-ast/lib/api/dd', function() {
    create({
        'sourcePath': '/Users/liushaohua/Documents/DATA/mis-vue-ast/lib/api/dd/common',
        'filePath': 'index.js',
        'componentName': 'abc'
    });
});

function create(payload) {
    var template = getTemplate('components.create');
    var source = template(payload);
    var filePath = path.join(payload.sourcePath, payload.filePath);
    console.log(filePath, source, 'ddd');
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