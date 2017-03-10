import { Component } from '@angular/core';

import { CookieUtils } from './utils/cookieUtils';
import { WizService } from './wiz.service';

import { UserInfo } from './data-model/userInfo';

@Component({
  // moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['../styles/example.css'],
  providers: [CookieUtils, WizService]
})
export class AppComponent  {
  public userInfo: UserInfo;

  public setUserInfo(userInfo: UserInfo) {
    console.log(userInfo);
    this.userInfo = userInfo;
  }
}
