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
var WizLoginComponent = (function () {
    function WizLoginComponent(wizService) {
        this.wizService = wizService;
    }
    WizLoginComponent.prototype.ngOnInit = function () {
        this.userId = '';
        this.password = '';
        this.isShow = true;
    };
    WizLoginComponent.prototype.login = function () {
        var _this = this;
        this.wizService.login({
            user_id: this.userId,
            password: this.password
        })
            .then(function (userInfo) {
            console.log(userInfo);
            userInfo ? _this.userInfo = userInfo : {};
        });
    };
    WizLoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wiz-login',
            templateUrl: './wiz-login.component.html',
        }), 
        __metadata('design:paramtypes', [wiz_service_1.WizService])
    ], WizLoginComponent);
    return WizLoginComponent;
}());
exports.WizLoginComponent = WizLoginComponent;
//# sourceMappingURL=wiz-login.component.js.map