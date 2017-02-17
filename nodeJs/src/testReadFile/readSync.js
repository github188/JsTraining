const fs = require('fs');
const StartFile = 'files/start.txt';


let readFile = (filePath, callback) => {
    let data;
    try {
        data = fs.readFileSync(filePath, 'utf8');
    } catch(e) {
        throw e;
    }
    callback(data);
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
