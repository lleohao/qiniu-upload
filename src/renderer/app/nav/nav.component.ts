import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/map';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {
    hidden = true;

    constructor(private router: Router) {
        this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                this.hidden = e.url !== '/setting';
            }
        });
    }

    goBack() {
        this.router.navigateByUrl('/upload');
    }
}
