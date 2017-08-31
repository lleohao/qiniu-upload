import { app } from 'electron';
import configs from '../configs';

import api from './api';

export interface Settings {
    ak: string;
    sk: string;
    scope: string;
    domain: string;
}

api.add('/setting/save', (e, settings) => {
    configs.save(settings);
});

api.add('/setting/clear', (e) => {
    configs.clear();
});

api.add('/setting/get', (e) => {
    e.returnValue = configs.setting;
});
