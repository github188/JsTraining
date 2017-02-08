
function run() {
    initDom();
}


function initDom() {
    var div, label, input, button;

    button = document.querySelector('#submit');
    button.addEventListener('click', function () {
        var userName = document.querySelector('#username');
        var password = document.querySelector('#password');
        if (!userName.value) {
            alert('请填写用户名');
            userName.focus();
            return;
        } else if (!password.value) {
            alert('请填写密码');
            password.focus();
            return;
        }

        login(userName.value, password.value);

    });
}

function login(userName, password) {
    $.ajax({
        url: "/api/login",
        type: "post",
        async: true,
        data: {
            client_type: 'web2.0',
            api_version: 6,
            user_id: userName,
            password: password
        },
        success: function (res) {
            console.log(res);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('login error.');
        }
    });
}

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



var TIMER = null;
function setTimer(callback, sleep) {
    if (!!TIMER && !callback) {
        clearTimeout(TIMER);
    }
    TIMER = setTimeout(function() {
        callback();
        setTimer(callback, sleep);
    }, sleep);
};

function testTimer() {
    var counter = 0;
    setTimer(function () {
        console.log(new Date().valueOf());
        counter++;
        if (counter > 100) {
            console.log('clear timer');
            setTimer();
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