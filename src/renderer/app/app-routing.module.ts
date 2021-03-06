import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingComponent } from './setting/setting.component';
import { UploadComponent } from './upload/upload.component';

import { RouterService } from './service/router.service';

const routes: Routes = [
    {
        path: 'upload',
        canActivate: [RouterService],
        component: UploadComponent
    },
    {
        path: 'setting',
        component: SettingComponent
    },
    {
        path: '',
        redirectTo: '/upload',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
