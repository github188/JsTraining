import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { routerTransition } from '../router/router.animations';
import { WizService } from '../wiz.service';

import { UserInfo } from '../data-model/userInfo';
import { BizInfo } from '../data-model/bizInfo';
import { GroupInfo } from '../data-model/groupInfo';

@Component({
    // moduleId: module.id,
    selector: 'wiz-group-list',
    templateUrl: 'wiz-group-list.component.html',
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''},
})
export class WizGroupListComponent implements OnInit {
    // @HostBinding('[@routerTransition]') '';
    // @HostListener('routerTransition') onRouterTransition() {
    //     console.error('on routerTransition ---------------------------');
    //     // do work
    // }

    public groupList: GroupInfo[];
    public bizList: BizInfo[];
    private userInfo: UserInfo;

    constructor(
        private router: Router,
        private wizService: WizService) {
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //     if (changes['userInfo'].currentValue) {
    //         this.getBizList();
    //         this.getGroupList();
    //     }
    // }

    public ngOnInit(): void {
        this.wizService.checkToken().then((userInfo) => {
            if (!userInfo) {
                this.router.navigate(['login']);
                return;
            }
            this.userInfo = userInfo;
            this.initData();
        });
    }

    private initData(): void {
        this.getBizList();
        this.getGroupList();
    }

    private getBizList(): void {
        this.wizService.getBizList({
            token: this.userInfo.token
        })
            .then((bizList) => {
                this.bizList = bizList;
                this.merge();
            });
    }

    private getGroupList(): void {
        this.wizService.getGroupList({
            token: this.userInfo.token
        })
            .then((groupList) => {
                this.groupList = groupList;
                this.merge();
            });
    }

    private merge(): void {
        if (!this.bizList || !this.groupList ||
            this.bizList.length === 0 || this.groupList.length === 0) {
            return;
        }

        let bizMap = {};
        let biz: BizInfo;
        let group: GroupInfo;
        let i: number;
        let personalBiz = new BizInfo();

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
            } else {
                biz = bizMap['personal'];
            }
            if (biz) {
                if (!biz.groupList) {
                    biz.groupList = [];
                }
                biz.groupList.push(group);
            }
        }
    }

}
