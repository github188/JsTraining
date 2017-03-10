import { Injectable }    from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

// import { Observable }     from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { CookieUtils }     from './utils/cookieUtils';
import { UserInfo }     from './data-model/userInfo';
import { BizInfo }     from './data-model/bizInfo';
import { GroupInfo }     from './data-model/groupInfo';

@Injectable()
export class WizService {
    private headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    private userInfo: UserInfo;

    constructor(private http: Http,
                private cookie: CookieUtils) {
    }

    public getCurUser(): UserInfo {
        return this.userInfo;
    }

    public checkToken(): Promise<UserInfo> {
        let result = null;
        if (this.getCurUser()) {
            return new Promise((resolve) => {
                resolve(this.getCurUser());
            });
        }

        let token = this.cookie.get('token');
        if (!token) {
            return new Promise((resolve) => {
                resolve(result);
            });
        }
        return this.getUserInfo({token});
    }

    public login(params: Object): Promise<UserInfo> {
        let _urlParams = this.setParams(params);
        return this.http
            .post('/api/login', _urlParams, {headers: this.headers})
            .toPromise()
            .then((response) => {
                let userInfo = response.json() as UserInfo;
                if (userInfo.code === '200') {
                    this.cookie.put('token', userInfo.token, this.cookie.getOptions(7));
                    this.userInfo = userInfo;
                }
                return userInfo;
            })
            .catch(this.handleError);
    }

    public getUserInfo(params: Object): Promise<UserInfo> {
        return this.http
            .get(`/wizas/a/users/get_info?token=${params['token']}&_=${new Date().valueOf()}`)
            .toPromise()
            .then((response) => {
                let userInfo = response.json();
                userInfo.code = userInfo['return_code'];
                if (userInfo.return_code === 200) {
                    userInfo.token = params['token'];
                    this.cookie.put('token', userInfo.token, this.cookie.getOptions(7));
                    this.userInfo = userInfo;
                } else {
                    this.cookie.remove('token', this.cookie.getOptions(7));
                    this.userInfo = null;
                }
                return userInfo as UserInfo;
            })
            .catch(this.handleError);
    }

    public getBizList(params: Object): Promise<BizInfo[]> {
        return this.http
            .get(`/wizas/a/biz/user_bizs?token=${params['token']}`)
            .toPromise()
            .then((response) => {
                let result = response.json();
                if (result.return_code === 200) {
                    return result.result as BizInfo[];
                } else {
                    return [];
                }
            })
            .catch(this.handleError);
    }

    public getGroupList(params: Object): Promise<GroupInfo[]> {
        return this.http
            .get(`/wizas/a/groups?token=${params['token']}`)
            .toPromise()
            .then((response) => {
                let result = response.json();
                if (result.return_code === 200) {
                    return result.group_list as GroupInfo[];
                } else {
                    return [];
                }
            })
            .catch(this.handleError);
    }

    private setParams(params: Object): URLSearchParams {
        let urlParams = new URLSearchParams();
        for (let k in params) {
            if (params.hasOwnProperty(k)) {
                urlParams.append(k, params[k]);
            }
        }
        return urlParams;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
