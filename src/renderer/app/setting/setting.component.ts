import { Component, OnInit } from '@angular/core';

import { Setting, Settings } from './setting.model';
import { SettingService } from '../service/setting.service';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
    model: Setting;

    constructor(private settingSerivce: SettingService) {
        this.model = new Setting();
    }

    ngOnInit() {
        this.model.update(this.settingSerivce.getSetting());
    }

    saveSetting() {
        this.settingSerivce.saveSetting(this.model.getSetting());
    }

    clearSetting() {
        this.settingSerivce.clearSetting();
    }
}
