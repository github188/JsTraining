import {Routes} from '@angular/router';
import {WizLoginComponent} from './wiz-login.component';
import {WizGroupListComponent} from './wiz-group-list.component';
import {NoContentComponent} from './no-content';

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {path: 'grouplist', component: WizGroupListComponent},
    {path: 'login', component: WizLoginComponent},
    {
        path: '**',
        redirectTo: '/login',
        pathMatch: 'full'
    },
];
