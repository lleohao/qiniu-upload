import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { SettingService } from './setting.service';

@Injectable()
export class RouterService implements CanActivate {
    constructor(private settingService: SettingService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot) {
        return new Promise<boolean>((reslove) => {
            setTimeout(() => {
                if (this.settingService.valiad) {
                    reslove(true);
                }

                this.router.navigateByUrl('/setting');
                reslove(false);
            }, 0);
        });
    }
}
