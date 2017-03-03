import { Injectable }    from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

// import { Observable }     from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { UserInfo }     from './data-model/userInfo';

@Injectable()
export class WizService {
    private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });

    constructor(private http: Http) {}

    login(options: Object): Promise<UserInfo> {
        let _urlParams = new URLSearchParams();
        for (let k in options) {
            _urlParams.append(k, options[k]);
        }
        return this.http
            .post('/api/login', _urlParams, {headers: this.headers})
            .toPromise()
            .then(response => {
                return response.json() as UserInfo;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

