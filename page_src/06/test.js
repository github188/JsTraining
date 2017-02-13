
function run() {
    initDom();
}

var loginLayer, bizListLayer, button, loader;

var token, bizList, groupList;

function initDom() {
    button = $('#submit');
    loader = $('#loader');
    button.bind('click', onSubmit);
}

function onSubmit() {
    var userName = $('#username');
    var password = $('#password');
    if (!userName.val()) {
        alert('请填写用户名');
        userName.focus();
        return;
    } else if (!password.val()) {
        alert('请填写密码');
        password.focus();
        return;
    }


    if (button.hasClass('disabled')) {
        return;
    }
    button.addClass('disabled');
    loader.addClass('active');
    var options = {
        url: "/api/login",
        type: "post",
        data: {
            client_type: 'web2.0',
            api_version: 6,
            user_id: userName.val(),
            password: password.val()
        }
    }
    remote(options, function (result) {
        setTimeout(function () {
            onLogin(result);
        }, 1000);
    });
}


function remote(options, callback) {

    $.ajax(options).done(callback).fail(onAjaxError);
}

function onLogin(result) {
    button.removeClass('disabled');
    loader.removeClass('active');

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
    button.removeClass('disabled');
    loader.removeClass('active');
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
    remote(options, function (result) {
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

    remote(options, function (result) {
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
    
    loginLayer = $('#login-layer');
    bizListLayer = $('#biz-list');
    
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

    loginLayer.fadeOut('slow', function() {
        bizListLayer.addClass('active');
    });
}

function makeBizList() {
    var i;

    for (i = 0; i < bizList.length; i++) {
        if (bizList[i].groupList) {
            makeBizItem(bizList[i]);
        }
    }

    bizListLayer.on('click', '.switch-btn', function(e) {
        var btn = $(e.target);
        var biz = btn.parents('.biz');
        var groupList = $('.group-list', biz);

        if (biz.hasClass('expand')) {
            biz.removeClass('expand');
            groupList.fadeOut(200);

        } else {
            biz.addClass('expand');
            groupList.fadeIn(200);
        }
        
    });
}

function makeBizItem(biz) {
    var container, p, span, div,
        i;

    container = $('<div>');
    container.addClass('biz');
    p = $('<p>');
    p.addClass('biz-title')
    span = $('<span class="switch-btn"><span class="collapse">-</span><span class="expand">+</span></span>');
    p.append(span);
    span = $('<span>');
    span.text(biz.biz_name);
    p.append(span);
    container.append(p);
    div = $('<div>');
    div.addClass('group-list');
    for (i = 0; i < biz.groupList.length; i++) {
        div.append(makeGroupItem(biz.groupList[i]));
    }
    container.append(div);
    bizListLayer.append(container);
}

function makeGroupItem(group) {
    var container = $('<span>');
    container.addClass('group');
    container.text(group.kbName);
    return container;
}