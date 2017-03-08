"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
// Observable class extensions
require('rxjs/add/observable/of');
// Observable operators
require('rxjs/add/operator/catch');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
var wiz_service_1 = require('./wiz.service');
var userInfo_1 = require('./data-model/userInfo');
var bizInfo_1 = require('./data-model/bizInfo');
var WizGroupListComponent = (function () {
    function WizGroupListComponent(wizService) {
        this.wizService = wizService;
    }
    WizGroupListComponent.prototype.ngOnChanges = function (changes) {
        if (changes['userInfo'].currentValue) {
            this.getBizList();
            this.getGroupList();
        }
    };
    WizGroupListComponent.prototype.ngOnInit = function () {
    };
    WizGroupListComponent.prototype.getBizList = function () {
        var _this = this;
        this.wizService.getBizList({
            token: this.userInfo.token
        })
            .then(function (bizList) {
            _this.bizList = bizList;
            _this.merge();
        });
    };
    WizGroupListComponent.prototype.getGroupList = function () {
        var _this = this;
        this.wizService.getGroupList({
            token: this.userInfo.token
        })
            .then(function (groupList) {
            _this.groupList = groupList;
            _this.merge();
        });
    };
    WizGroupListComponent.prototype.merge = function () {
        if (!this.bizList || !this.groupList ||
            this.bizList.length == 0 || this.groupList.length == 0) {
            return;
        }
        var bizMap = {}, biz, group, i;
        var personalBiz = new bizInfo_1.BizInfo();
        personalBiz.biz_guid = 'personal';
        personalBiz.biz_name = '个人群组';
        this.bizList.unshift(personalBiz);
        for (i = 0; i < this.bizList.length; i++) {
            biz = this.bizList[i];
            bizMap[biz.biz_guid] = biz;
        }
        for (i = 0; i < this.groupList.length; i++) {
            group = this.groupList[i];
            if (group.bizGuid) {
                biz = bizMap[group.bizGuid];
            }
            else {
                biz = bizMap['personal'];
            }
            if (biz) {
                if (!biz.groupList) {
                    biz.groupList = [];
                }
                biz.groupList.push(group);
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', userInfo_1.UserInfo)
    ], WizGroupListComponent.prototype, "userInfo", void 0);
    WizGroupListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wiz-group-list',
            templateUrl: './wiz-group-list.component.html',
        }), 
        __metadata('design:paramtypes', [wiz_service_1.WizService])
    ], WizGroupListComponent);
    return WizGroupListComponent;
}());
exports.WizGroupListComponent = WizGroupListComponent;
//# sourceMappingURL=wiz-group-list.component.js.map