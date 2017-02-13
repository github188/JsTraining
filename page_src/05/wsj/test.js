
function onLogin(ret) {
    try {
        //
        if (typeof ret === 'string') {
            ret = JSON.parse(ret);
        }
        //
        if (ret.code == 200) {
            //
            Cookies.set("token", ret.token);
            //
            window.location = "groups.html";
        } else {
            alert("登录失败\n" + ret.message);
        }
        //
    } catch (err) {
        console.log(err);
        alert("发生错误 :\n" + err);
        console.log(text);
    }
}

function doLogin() {
    var userName = document.querySelector('#username');
    var password = document.querySelector('#password');
    var button = document.querySelector('#login');
    //
    var userId = userName.value;
    var pass = password.value;
    //
    if (!userId) {
        alert('请填写用户名');
        userName.focus();
        return;
    } else if (!pass) {
        alert('请填写密码');
        password.focus();
        return;
    }
    //
    //ajax by jquery
    var params = {user_id: userId, password: pass};
    $.ajax({
        method: "POST",
        url: "/api/login",
        data: params
    }).done(function(ret) {
        onLogin(ret);
    }).fail(function(jqXHR, textStatus){
        alert("网络错误!\n" + textStatus);
    }).always(function(){
        button.disabled = false;
    });
    //
    button.disabled = true;

}

function init() {

    var button = document.querySelector('#login');
    button.addEventListener('click', doLogin);
    //
}