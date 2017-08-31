import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { BaseService } from './base.service';
import { SettingService } from './setting.service';

@Injectable()
export class RouterService extends BaseService implements CanActivate {
    constructor(private settingService: SettingService, private router: Router) {
        super();

        this.ipcRender.on('/open/setting', (e) => {
            this.router.navigateByUrl('/setting');
        });
    }

    canActivate(route: ActivatedRouteSnapshot) {
        if (this.settingService.valiad) {
            return true;
        }

        this.router.navigateByUrl('/setting');
        return false;
    }
}
