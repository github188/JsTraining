import { Injectable }    from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

// import { Observable }     from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { UserInfo }     from './data-model/userInfo';
import { BizInfo }     from './data-model/bizInfo';
import { GroupInfo }     from './data-model/groupInfo';

@Injectable()
export class WizService {
    private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    private userInfo: UserInfo;
    public cache = {
        getUser: () => {
            return this.userInfo;
        }
    };

    constructor(private http: Http) {}



    login(params: Object): Promise<UserInfo> {
        let _urlParams = this.setParams(params);
        return this.http
            .post('/api/login', _urlParams, {headers: this.headers})
            .toPromise()
            .then(response => {
                let userInfo = response.json() as UserInfo;
                if (userInfo.code == '200') {
                    this.userInfo = userInfo;
                }
                return userInfo;
            })
            .catch(this.handleError);
    }

    getBizList(params: Object): Promise<BizInfo[]> {
        return this.http
            .get(`/wizas/a/biz/user_bizs?token=${params['token']}`)
            .toPromise()
            .then(response => {
                let result = response.json();
                if (result.return_code == 200) {
                    return result.result as BizInfo[];
                } else {
                    return [];
                }
            })
            .catch(this.handleError);
    }

    getGroupList(params: Object): Promise<GroupInfo[]> {
        return this.http
            .get(`/wizas/a/groups?token=${params['token']}`)
            .toPromise()
            .then(response => {
                let result = response.json();
                if (result.return_code == 200) {
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
            urlParams.append(k, params[k]);
        }
        return urlParams;
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

