import { app } from 'electron';
import configs from '../configs';


import api from './api';

export interface Settings {
    ak: string;
    sk: string;
    scope: string;
    domain: string;
}

api.add('/setting/save', (e, uid, settings) => {
    configs.save(settings);
    e.sender.send(`/setting/save/${uid}`);
});

api.add('/setting/clear', (e, uid) => {
    configs.clear();
    e.sender.send(`/setting/clear/${uid}`);
});

api.add('/setting', (e, uid) => {
    e.sender.send(`/setting/${uid}`, configs.setting);
});
