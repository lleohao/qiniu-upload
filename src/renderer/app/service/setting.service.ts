import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { Settings } from '../setting/setting.model';

@Injectable()
export class SettingService extends BaseService {
    private settings: Settings;
    constructor() {
        super();
        this.reset();

        this.settings = this.ipcRender.sendSync('/setting/get');
    }

    private reset() {
        this.settings = {
            ak: '',
            sk: '',
            scope: '',
            domain: ''
        };
    }

    private checkSetting(): boolean {
        const settings = this.settings;
        const len = Object.keys(settings).reduce((prev, cur) => {
            if (typeof prev === 'string') {
                return settings[prev].length + settings[cur].length;
            }

            return prev + settings[cur].length;
        });

        return (parseInt(len, 10) >= 4);
    }

    get valiad() {
        return this.checkSetting();
    }

    getSetting() {
        return this.settings;
    }

    saveSetting(settings: Settings) {
        const uid = this.uuid();
        return new Promise((reslove, reject) => {
            this.ipcRender.send('/setting/save', uid, settings);
            this.ipcRender.once(`/setting/save/${uid}`, (e, code) => {
                this.settings = settings;
                reslove();
            });
        });
    }

    clearSetting() {
        const uid = this.uuid();
        return new Promise((reslove, reject) => {
            this.ipcRender.send('/setting/clear', uid);
            this.ipcRender.once(`/setting/clear/${uid}`, (e, code) => {
                this.reset();
                reslove();
            });
        });
    }
}
