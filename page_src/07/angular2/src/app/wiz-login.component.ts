import {Component, OnInit} from '@angular/core';

import {Observable}        from 'rxjs/Observable';
import {Subject}           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {WizService} from './wiz.service';
import {UserInfo} from './data-model/userInfo';

@Component({
    moduleId: module.id,
    selector: 'wiz-login',
    templateUrl: './wiz-login.component.html',
})
export class WizLoginComponent implements OnInit {
    isShow: Boolean;
    userId: String;
    password: String;
    userInfo: UserInfo;

    constructor(private wizService: WizService) {
    }


    ngOnInit(): void {
        this.userId = '';
        this.password = '';
        this.isShow = true;
    }

    login(): void {
        this.wizService.login({
            user_id: this.userId,
            password: this.password
        })
            .then(userInfo => {
                console.log(userInfo);
                userInfo ? this.userInfo = userInfo : {};
            });
    }

}
