
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

        // login(userName.value, password.value);
        loginPromise(userName.value, password.value);
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
        success: onLogin,
        error: onAjaxError
    });
}

function onLogin(result) {
    var msg = '';
    
    if (!result) {
        msg = '服务器异常';
    } else if (result.code == 200) {
        msg = '登录成功';
    } else {
        msg = result.message + '（' + result.code + '）';
    }
    alert(msg);
    document.querySelector('#username').focus();
}

function onAjaxError(jqXHR, textStatus, errorThrown) {
    console.log('login error.');
}

//使用 Promise 方式的 ajax 代码书写方式
function loginPromise(userName, password) {
    $.ajax({
        url: "/api/login",
        type: "post",
        async: true,
        data: {
            client_type: 'web2.0',
            api_version: 6,
            user_id: userName,
            password: password
        }
    }).done(onLogin).fail(onAjaxError);
}
