
function run() {
    arrayTest();
    initDom();
}

function arrayTest() {
    var a = [];
    var i,j;
    for (i=0; i<10; i++) {
        a.push(i);
    }
    console.log(a);
    for (i=a.length-1; i>=0; i--) {
        a.shift();
    }
    console.log(a);
}

function initDom() {
    var div, label, input, button;

    div = document.createElement('div');
    label = document.createElement('label');
    input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.id = 'username';
    label.setAttribute('for', 'username');
    label.innerText = '用户名：';
    div.appendChild(label);
    div.appendChild(input);
    document.body.appendChild(div);

    div = document.createElement('div');
    label = document.createElement('label');
    input = document.createElement('input');
    input.setAttribute('type', 'password');
    input.id = 'password';
    label.setAttribute('for', 'password');
    label.innerText = '密码：';
    div.appendChild(label);
    div.appendChild(input);
    document.body.appendChild(div);

    button = document.createElement('button');
    button.innerText = '登录';
    button.id = 'submit';
    document.body.appendChild(button);


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

        alert('开始登录');

    });

}
