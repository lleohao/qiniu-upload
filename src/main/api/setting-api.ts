import { app } from 'electron';
import * as electronSetting from 'electron-settings';

import api from './api';

export interface Settings {
    ak: string;
    sk: string;
    scope: string;
    domain: string;
}

api.add('/setting/save', (e, uid, settings) => {
    electronSetting.set('certificate', settings);
    e.sender.send(`/setting/save/${uid}`);
});

api.add('/setting/clear', (e, uid) => {
    electronSetting.deleteAll();
    e.sender.send(`/setting/clear/${uid}`);
});

api.add('/setting', (e, uid) => {
    if (electronSetting.has('certificate')) {
        const setting: Settings = electronSetting.get('certificate');
        e.sender.send(`/setting/${uid}`, setting);
    } else {
        e.sender.send(`/setting/${uid}`, { ak: '', sk: '', scope: '', domain: '' });
    }
});
