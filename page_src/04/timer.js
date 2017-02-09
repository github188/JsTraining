function testInterval() {
    var counter = 0;
    var interval = setInterval(function () {
        console.log(new Date().valueOf());
        counter++;
        if (counter > 100) {
            console.log('clear Interval');
            clearInterval(interval);
        }

        (function () {
            var i, j, k;
            for (i = 0; i < 99999; i++) {
                for (j = 0; j < 39999; j++) {
                    k = i * j;
                }
            }
        })()
        console.log(new Date().valueOf() + '  --  interval ' + counter + ' over.')

    }, 2000);
}


// 模拟 setInterval 的 setTimer
var TIMER = null;
function setTimer(callback, sleep) {
    TIMER = setTimeout(function () {
        callback();
        setTimer(callback, sleep);
    }, sleep);
};
function clearTimer() {
    if (!!TIMER) {
        clearTimeout(TIMER);
    }
}

// 使用 setTimer 的 测试代码
function testTimer() {
    var counter = 0;
    setTimer(function () {
        console.log(new Date().valueOf());
        counter++;
        if (counter > 100) {
            console.log('clear timer');
            clearTimer();
        }

        (function () {
            var i, j, k;
            for (i = 0; i < 99999; i++) {
                for (j = 0; j < 39999; j++) {
                    k = i * j;
                }
            }
        })()
        console.log(new Date().valueOf() + '  --  timer ' + counter + ' over.')

    }, 2000);
}