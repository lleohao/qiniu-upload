import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { SettingService } from './setting.service';

@Injectable()
export class RouterService implements CanActivate {
    constructor(private settingService: SettingService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot) {
        if (this.settingService.valiad) {
            return true;
        }

        this.router.navigateByUrl('/setting');
        return false;
    }
}
