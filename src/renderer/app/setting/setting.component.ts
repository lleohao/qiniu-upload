import { Component, OnInit } from '@angular/core';

import { Setting, Settings } from './setting.model';
import { SettingService } from '../service/setting.service';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
    private model: Setting;

    constructor(private settingSerivce: SettingService) {
        this.model = new Setting();
    }

    ngOnInit() {
        this.settingSerivce.getSetting()
            .then((setting: Settings) => {
                this.model.update(setting);
            });
    }

    saveSetting() {
        this.settingSerivce.saveSetting(this.model.getSetting())
            .then(() => {
                alert('保存配置成功');
            });
    }

    clearSetting() {
        this.settingSerivce.clearSetting()
            .then(() => {
                alert('清除配置成功');
            });
    }
}
