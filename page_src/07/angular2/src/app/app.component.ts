import { Component } from '@angular/core';

import { WizService } from './wiz.service';

@Component({
  // moduleId: module.id,
  selector: 'my-app',
  templateUrl: '/app/app.component.html',
  providers: [WizService]
})
export class AppComponent  {

}
