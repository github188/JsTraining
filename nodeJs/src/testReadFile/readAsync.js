const fs = require('fs');
const StartFile = 'files/start.txt';

let readFile = (filePath, callback) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            throw err;            
        } else {
            callback(data);
        }
    });
}

let onRead = (data) => {
    let txt = data.trim();
    console.log(txt);
    if (txt == 'done') {
        process.exit();
        return;
    }
    readFile('files/' + txt + '.txt', onRead);
}

readFile(StartFile, onRead);
