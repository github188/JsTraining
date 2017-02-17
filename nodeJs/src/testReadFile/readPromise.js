const fs = require('fs');
const StartFile = 'files/start.txt';

let readFile = function (filePath) {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
    return promise;
}

let onRead = (data) => {
    let txt = data.trim();
    console.log(txt);
    if (txt == 'done') {
        process.exit();
        return null;
    }
    readFile('files/' + txt + '.txt').then(onRead).catch(onErr);
}

let onErr = (e) => {
    throw e;
};

readFile(StartFile).then(onRead).catch(onErr);

