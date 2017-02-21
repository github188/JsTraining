let fs = require('fs');

let co = (gen) => {
    //co 这个 Promise 的作用 是为了执行 co 时等待 Generator 结束，以及捕获 Generator 内的异常
    return new Promise(function (resolve, reject) {
        let g = gen();
        // onResolve 是为了接收 Generator 内 yield 后面 readPromise 中 读取文件后 resolve 传来的结果
        let onResolve = (result) => {
            try{
                // result 是用于给 Generator 内 yield 传过去的数据
                // gResult 是 Generator 内 yield 传来的 数据
                let gResult = g.next(result);
                // 判断 Generator 是否结束
                if (gResult.done) {
                    resolve('read files is over');
                    return;
                }
                // 递归处理 yield 后面的 Promise，继续进行异步加载
                gResult.value.then(onResolve).catch(onReject);
            } catch(e) {
                console.log('onResolve error');
                reject(e);
            }
        };
        // 捕获异常
        let onReject = (err) => {
            try {
                console.log('throw err');
                g.throw(err);
            } catch (e) {
                reject(e);
            }
        };
        onResolve();
    });
};

// 制作 读取文件的 Promise
let readPromise = (filePath) => {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath + '.txt', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
};

// 制作 连续读取文件的 Generator
function* readGen() {
    let filePath = 'start';
    while (filePath && filePath != 'done') {
        filePath = yield readPromise(filePath);
        console.log(filePath);
    }
}

// 开始运行
co(readGen).then(function (data) {
    console.log(data);
}).catch(function (err) {
    console.log('co catch error');
    console.error(err);
});

