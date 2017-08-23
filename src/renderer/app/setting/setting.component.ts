import { Component, OnInit } from '@angular/core';

import { Setting } from './setting.model';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
    private model: Setting;

    constructor() {
        this.model = new Setting('', '', '', '');
    }

    ngOnInit() {
    }

}
