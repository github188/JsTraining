var UI_LOGIN = 1;
var UI_SPINNER = 2;
var UI_KBS = 3;

function switchUI(ui) {
    var spinner = document.querySelector("#paneSpinner");
    spinner.style.display = ui == UI_SPINNER ? "" : "none";
    //
    var login = document.querySelector("#paneLogin");
    login.style.display = ui == UI_LOGIN ? "" : "none";
    //
    var kbs = document.querySelector("#paneMain");
    kbs.style.display = ui == UI_KBS ? "" : "none";
}

function showError(err) {
    alert(err);
    //
    switchUI(UI_LOGIN);
}


function initBizs(token, callback) {

    //ajax by jquery
    var params = {token: token, api_version: 6};
    $.ajax({
        method: "GET",
        url: "/wizas/a/biz/user_bizs",
        data: params
    }).done(function(ret) {
        //
        if (ret.return_code == 200) {
            callback(ret.result);
        } else {
            showError(ret.return_message);
        }
        //
    }).fail(function(jqXHR, textStatus){
        showError("网络错误!\n" + textStatus);
    }).always(function(){
    });

}

function initGroups(token, callback) {

    //ajax by jquery
    var params = {token: token, api_version: 6};
    $.ajax({
        method: "GET",
        url: "/wizas/a/groups",
        data: params
    }).done(function(ret) {
        //
        if (ret.return_code == 200) {
            callback(ret.group_list);
        } else {
            showError(ret.return_message);
        }
        //
    }).fail(function(jqXHR, textStatus){
        showError("网络错误!\n" + textStatus);
    }).always(function(){
    });
}

var UserData = {
    groups: null,
    bizs: null,
    setBizs: function(bizs) {
        this.bizs = bizs;
        //
        initMainUI();
    },
    setGroups: function(groups) {
        this.groups = groups;
        //
        initMainUI();
    }
};


function headClicked(e) {
    var elem, evt = e ? e:event;
    if (evt.srcElement)  elem = evt.srcElement;
    else if (evt.target) elem = evt.target;
    //
    var head = elem;
    var bizGuid = head.id;
    var bizName = head.getAttribute("data-kbs-name");
    var ul = document.querySelector("#ul-" + bizGuid);
    var visible = ul.style.display != "none";
    if (visible) {
        ul.style.display = "none";
        head.innerText = "+" + bizName;
    } else {
        ul.style.display = "";
        head.innerText = "-" + bizName;
    }
}

function addKbs(bizGuid, name, groups) {
    var containner = document.createElement("div");
    var head = document.createElement("div");
    head.innerText = "+" + name;
    containner.appendChild(head);
    head.id = bizGuid;
    head.setAttribute("data-kbs-name", name);
    head.addEventListener("click", headClicked);
    head.style.cursor = "pointer";
    //
    var ul = document.createElement("ul");
    ul.id = "ul-" + bizGuid;
    var group;
    for (var i = 0; i < groups.length; i++) {
        group = groups[i];
        var li = document.createElement("li");
        li.innerText = group.kbName;
        ul.appendChild(li);
    }
    //
    containner.appendChild(ul);
    ul.style.display = "none";
    //
    var kbs = document.querySelector("#paneMain");
    kbs.appendChild(containner);
}

function addBiz(biz) {
    addKbs(biz.biz_guid, biz.biz_name, biz.groups);
}

function addPersonalGroups(groups) {
    addKbs("personal-notes", "个人群组", groups);
}

function initMainUI() {
    if (!UserData.bizs)
        return;
    if (!UserData.groups)
        return;
    //
    var bizMap = {};
    var biz;
    for (var i = 0; i < UserData.bizs.length; i++) {
        biz = UserData.bizs[i];
        bizMap[biz.biz_guid] = biz;
    }
    //
    var personalGroups = [];
    var group;
    for (var i = 0; i < UserData.groups.length; i++) {
        group = UserData.groups[i];
        if (!group.bizGuid) {
            personalGroups.push(group);
        } else {
            biz = bizMap[group.bizGuid];
            if (biz) {
                if (!biz.groups) {
                    biz.groups = [];
                }
                biz.groups.push(group);
            }
        }
    }
    //
    for (var i = 0; i < UserData.bizs.length; i++) {
        biz = UserData.bizs[i];
        if (!biz.groups)
            continue;
        if (biz.groups.length == 0)
            continue;
        //
        addBiz(biz);
    }
    //
    if (personalGroups.length > 0) {
        addPersonalGroups(personalGroups);
    }
    //
    switchUI(UI_KBS);
}

function initKbs(token) {
    initBizs(token, function(bizs) {
        UserData.setBizs(bizs);
    });
    initGroups(token, function(groups) {
        UserData.setGroups(groups);
    });
}


function onLogin(ret) {
    try {
        //
        if (typeof ret === 'string') {
            ret = JSON.parse(ret);
        }
        //
        if (ret.code == 200) {
            //
            $('#paneLogin').fadeOut("normal", function() {
                switchUI(UI_SPINNER);
            });
            //
            initKbs(ret.token);
            //
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
    //
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
        return false;
    } else if (!pass) {
        alert('请填写密码');
        password.focus();
        return false;
    }
    //
    var timerId = 0;
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
        stopAnimateButton(button, timerId);
    });
    //
    button.disabled = true;
    timerId = startAnimateButton(button);
    //
    return false;
}

function init() {
    //
}

function stopAnimateButton(button, timerId) {
    //
    button.value = button.getAttribute("data-org-value");
    clearInterval(timerId);
    //
}
function startAnimateButton(button) {
    //
    var orgText = button.value;
    button.setAttribute("data-org-value", orgText);
    var counter = 0;
    return setInterval(function() {
        //
        var index = counter % 3 + 1;
        //
        var suffix = "";
        for (var i = 0; i < index; i++) {
            suffix += ".";
        }
        button.value = orgText + suffix;
        //
        counter++;
        //
    }, 1000);
}