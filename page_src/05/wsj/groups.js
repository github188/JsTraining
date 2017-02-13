function showError(err) {
    alert(err);
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

function showUI(bizs, groups) {
    //
    var data = {
        accordionData: {
            "theme": "",
            "content": [],
            "options": {
                "multiple": true // 是否允许同时展开多个面板，默认为 FALSE
            },
        }
    };
    //
    var active = true;
    for (var i = 0; i < bizs.length; i++) {
        var biz = bizs[i];
        //
        var bizData = {
            title : biz.biz_name, 
            content: "",
            active : active,
        };
        //
        var html = "";
        var groupCount = 0;
        for (var j = 0; j < groups.length; j++) {
            var group = groups[j];
            if (biz.biz_guid == group.bizGuid) {
                //
                html += "<div><a href='javascript:void()'>" + group.kbName + "</a></div>";
                groupCount++;
            }
        }
        //
        if (groupCount) {
            bizData.content = html;
            data.accordionData.content.push(bizData);
            //
            active = false;
        }
    }
    //
    var $tpl = $('#my-tpl');
    tpl = $tpl.text();
    template = Handlebars.compile(tpl);
    html = template(data);

    $tpl.before(html);
}

function init() {
    var token = Cookies.get("token");
    if (!token) {
        window.location = "index.html";
        return;
    }
    //
    initBizs(token, function(bizs) {
        initGroups(token, function(groups){
            //
            showUI(bizs, groups);
        });
    });
}