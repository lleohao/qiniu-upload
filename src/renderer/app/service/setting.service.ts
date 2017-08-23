import { Injectable } from '@angular/core';

import { Settings } from '../setting/setting.model';

@Injectable()
export class SettingService {
    private ipcRender = electron.ipcRenderer;

    private uuid() {
        return Math.random().toString(36).slice(2);
    }

    getSetting() {
        const uid = this.uuid();
        return new Promise((reslove, reject) => {
            this.ipcRender.send('/setting', uid);
            this.ipcRender.once(`/setting/${uid}`, (e, settings: Settings) => {
                reslove(settings);
            });
        });
    }

    saveSetting(settings: Settings) {
        const uid = this.uuid();
        return new Promise((reslove, reject) => {
            this.ipcRender.send('/setting/save', uid, settings);
            this.ipcRender.once(`/setting/save/${uid}`, (e, code) => {
                reslove();
            });
        });
    }

    clearSetting() {
        const uid = this.uuid();
        return new Promise((reslove, reject) => {
            this.ipcRender.send('/setting/clear', uid);
            this.ipcRender.once(`/setting/clear/${uid}`, (e, code) => {
                reslove();
            });
        });
    }
}
