'use strict'

let co = (gen) => {
    //co 这个 Promise 的作用 是为了执行 co 时等待 Generator 结束，以及捕获 Generator 内的异常
    return new Promise(function (resolve, reject) {
        let g = gen();
        // onResolve 是为了接收 Generator 内 yield 后面 readPromise 中 读取文件后 resolve 传来的结果
        let onResolve = (result) => {
            try {
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
            } catch (e) {
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

var pool_01 = {
    getConnection: function (fun) {
        setTimeout(function () {
            fun.call({id: 100}, connect_01);
        }, 100);
    }
};

var connect_01 = {};
function set01() {
    console.log(this);
    console.log('----------------');
    connect_01.beginTransaction = (fun) => {
        function callback() {
            fun.call({id: 103});
        }
        callback.call({id: 104});
    };
}
set01();

this.id = 11111111;

class WizDbTransaction {
    constructor(pool) {
        this.pool = pool;
    }

    //
    beginTransaction() {
        console.log('id 00: ' + (this && this.id));
        return new Promise((resolve, reject) => {
            this.pool.getConnection((connection) => {
                console.log('id 01: ' + this.id);
                this.connection = connection;
                this.connection.beginTransaction(err => {
                    console.log('id 02: ' + this.id);
                    resolve();
                });
            });
            //
        });
    }
}


// test01.beginTransaction.call(pool_01).then();
// test01.beginTransaction.call({id: 500, pool: pool_02}).then();
// test01.beginTransaction().then();
function operate() {
    return new Promise((resolve, reject) => {
        co(function*() {
            let test01 = new WizDbTransaction(pool_01);
            test01.id = 999;
            console.log(this);
            console.log('========');
            try {
                yield test01.beginTransaction();
            } catch(e) {
                reject(e);
            }
            console.log('***************');
            try {
                yield test01.beginTransaction.call();
            } catch(e) {
                reject(e);
            }

            resolve();

        }).catch((err) => {
            reject(err);
        });
    });
}
function start() {
    return new Promise((resolve, reject) => {
        co(function*() {
            yield operate();
            resolve();
        }).catch((err) => {
            reject(err);
        });
    });
}

setTimeout(function() {
    start();
}, 100);

module.exports = {};
