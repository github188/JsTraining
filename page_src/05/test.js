
function run() {
    initDom();
}

var loginLayer, bizListLayer;

var token, bizList, groupList;

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

        var options = {
            url: "/api/login",
            type: "post",
            data: {
                client_type: 'web2.0',
                api_version: 6,
                user_id: userName.value,
                password: password.value
            }
        }
        getData(options, onLogin);
    });
}

function getData(options, callback) {
    $.ajax(options).done(callback).fail(onAjaxError);
}

function onLogin(result) {
    var msg = '';

    if (!result) {
        msg = '服务器异常';
    } else if (result.code == 200) {
        token = result.token;
        getBizList();
        getGroupList();
        return;
    } else {
        msg = result.message + '（' + result.code + '）';
    }
    alert(msg);
    document.querySelector('#username').focus();
}

function onAjaxError(jqXHR, textStatus, errorThrown) {
    console.log('Ajax error.');
}

function getBizList() {
    var options = {
        url: "/wizas/a/biz/user_bizs",
        type: "get",
        data: {
            api_version: 6,
            token: token
        }
    }
    getData(options, function (result) {
        if (result && result.return_code == 200) {
            bizList = result.result;
        }
        showBizList();
    });
}

function getGroupList() {
    var options = {
        url: "/wizas/a/groups",
        type: "get",
        data: {
            api_version: 6,
            token: token
        }
    }

    getData(options, function (result) {
        if (result && result.return_code == 200) {
            groupList = result.group_list;
        }
        showBizList();

    });
}

function showBizList() {
    if (!bizList || !groupList) {
        return;
    }
    loginLayer = document.querySelector('#login-layer');
    bizListLayer = document.querySelector('#biz-list');
    loginLayer.style.display = 'none';

    var bizMap = {}, groupMap = {}, biz, group,
        i, j;

    bizList.unshift({
        biz_guid: 'personal',
        biz_name: '个人群组'
    });
    for (i = 0; i < bizList.length; i++) {
        biz = bizList[i];
        bizMap[biz.biz_guid] = biz;
    }


    for (i = 0; i < groupList.length; i++) {
        group = groupList[i];
        if (group.bizGuid) {
            biz = bizMap[group.bizGuid];
        } else {
            biz = bizMap.personal;
        }
        if (biz) {
            if (!biz.groupList) {
                biz.groupList = [];
            }
            biz.groupList.push(group);
        }

    }
    makeBizList();

}

function makeBizList() {
    var i;

    for (i = 0; i < bizList.length; i++) {
        if (bizList[i].groupList) {
            makeBizItem(bizList[i]);
        }        
    }
}

function makeBizItem(biz) {
    var container, p, div,
        i;

    container = document.createElement('div');
    container.className = 'biz';
    p = document.createElement('p');
    p.innerText = biz.biz_name;
    container.appendChild(p);
    div = document.createElement('div');
    div.className = 'group-list';
    for (i = 0; i < biz.groupList.length; i++) {
        div.appendChild(makeGroupItem(biz.groupList[i]));
    }
    container.appendChild(div);
    bizListLayer.appendChild(container);
}

function makeGroupItem(group) {
    var container = document.createElement('span');
    container.className = 'group';
    container.innerText = group.kbName;
    return container;
}