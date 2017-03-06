import {Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter} from '@angular/core';

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
import {BizInfo} from './data-model/bizInfo';
import {GroupInfo} from './data-model/groupInfo';

@Component({
    moduleId: module.id,
    selector: 'wiz-group-list',
    templateUrl: './wiz-group-list.component.html',
})
export class WizGroupListComponent implements OnInit, OnChanges {
    @Input() userInfo: UserInfo;
    bizList: BizInfo[];
    groupList: GroupInfo[];

    constructor(private wizService: WizService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['userInfo'].currentValue) {
            this.getBizList();
            this.getGroupList();
        }
    }

    ngOnInit(): void {

    }

    getBizList(): void {
        this.wizService.getBizList({
            token: this.userInfo.token
        })
            .then(bizList => {
                this.bizList = bizList;
                this.merge();
            });
    }

    getGroupList(): void {
        this.wizService.getGroupList({
            token: this.userInfo.token
        })
            .then(groupList => {
                this.groupList = groupList;
                this.merge();
            });
    }

    merge(): void {
        if (!this.bizList || !this.groupList ||
            this.bizList.length == 0 || this.groupList.length == 0) {
            return;
        }

        let bizMap = {},
            biz: BizInfo,
            group: GroupInfo,
            i: number;

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
