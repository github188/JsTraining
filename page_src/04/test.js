
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

        login(userName, password);

    });
}

function login(userName, password) {
    $.ajax({
		url: "/api/login",
		type: "get",
		async: true,
		data: {
            client_type: 'web2.0',
            api_version: 6,
            user_id: userName,
            password: password
        },
		success: function(res) {
			console.log(res);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('login error.');
		}
	});
}