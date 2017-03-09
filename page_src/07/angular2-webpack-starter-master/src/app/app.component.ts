import { Component } from '@angular/core';

import { WizService } from './wiz.service';

import { UserInfo } from './data-model/userInfo';

@Component({
  // moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['../styles/example.css'],
  providers: [WizService]
})
export class AppComponent  {
  public userInfo: UserInfo;

  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }
}
