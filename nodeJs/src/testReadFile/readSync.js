const fs = require('fs');
const StartFile = 'files/start.txt';


let filePath = StartFile;
let data;
do {    
    try {
        data = fs.readFileSync(filePath, 'utf8');
    } catch(e) {
        throw e;
    }

    if (!data) {
        process.exit();
        return;
    }

    data = data.trim();
    console.log(data);
    if (data == 'done') {
        process.exit();
        return;
    }
    filePath = 'files/' + data + '.txt';
} while (data);

