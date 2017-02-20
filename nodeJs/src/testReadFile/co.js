const fs = require('fs');

let co = (gen) => {
    return new Promise((resolve, reject) => {
        let g = gen();

        let onResolve = (data) => {
            try {
                let gResult = g.next(data);
                if (gResult.done) {
                    resolve();
                    return;
                }
                gResult.value.then(onResolve).catch(onReject);
            } catch (e) {
                reject(e);
            }
        };

        let onReject = (err) => {
            try {
                g.throw(err);
            } catch (e) {
                reject(e);
            }
        };

        onResolve();

    });
};

function readFilePromise(file) {
    let promise = new Promise((resolve, reject) => {
        fs.readFile('files/' + file + '.txt', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
    return promise;
}

function* readFileGen() {
    let f = 'start';
    while (f != 'done') {
        f = yield readFilePromise(f);
        console.info('file: ' + f);
    }
}

co(readFileGen).then(function (data) {
    console.info('read over...' + data);
    process.exit();
}).catch(function (err) {
    console.info('co error....');
    console.error(err);
});