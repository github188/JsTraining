const fs = require('fs');

let filePath = 'start';
while (true) {
    try {
        filePath = fs.readFileSync('files/' + filePath + '.txt', 'utf8');
        console.log(filePath);
        if (filePath == 'done') {
            process.exit();
            return;
        }
    } catch (e) {
        throw e;
    }
}
