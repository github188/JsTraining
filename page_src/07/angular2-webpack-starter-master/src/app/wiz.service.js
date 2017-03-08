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
var http_1 = require('@angular/http');
// import { Observable }     from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
require('rxjs/add/operator/toPromise');
var WizService = (function () {
    function WizService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    }
    WizService.prototype.login = function (params) {
        var _urlParams = this.setParams(params);
        return this.http
            .post('/api/login', _urlParams, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    WizService.prototype.getBizList = function (params) {
        return this.http
            .get("/wizas/a/biz/user_bizs?token=" + params['token'])
            .toPromise()
            .then(function (response) {
            var result = response.json();
            if (result.return_code == 200) {
                return result.result;
            }
            else {
                return [];
            }
        })
            .catch(this.handleError);
    };
    WizService.prototype.getGroupList = function (params) {
        return this.http
            .get("/wizas/a/groups?token=" + params['token'])
            .toPromise()
            .then(function (response) {
            var result = response.json();
            if (result.return_code == 200) {
                return result.group_list;
            }
            else {
                return [];
            }
        })
            .catch(this.handleError);
    };
    WizService.prototype.setParams = function (params) {
        var urlParams = new http_1.URLSearchParams();
        for (var k in params) {
            urlParams.append(k, params[k]);
        }
        return urlParams;
    };
    WizService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    WizService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], WizService);
    return WizService;
}());
exports.WizService = WizService;
//# sourceMappingURL=wiz.service.js.map