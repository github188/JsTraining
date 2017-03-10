import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router/router.animations';

import { WizService } from '../wiz.service';

@Component({
    // moduleId: module.id,
    selector: 'wiz-login',
    templateUrl: 'wiz-login.component.html',
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''},
})
export class WizLoginComponent implements OnInit {
    public userId: String;
    public password: String;

    constructor(private router: Router,
                private wizService: WizService) {
    }

    public ngOnInit(): void {
        this.userId = '';
        this.password = '';
        this.wizService.checkToken().then((result) => {
            if (result) {
                this.router.navigate(['grouplist']);
            }
        });
    }

    public login(): void {
        this.wizService.login({
            user_id: this.userId,
            password: this.password
        })
            .then((userInfo) => {
                if (userInfo && userInfo.code === '200') {
                    this.router.navigate(['grouplist']);
                }
            });
    }
}
