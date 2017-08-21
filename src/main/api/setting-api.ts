import { app } from 'electron';
import * as settings from 'electron-settings';

import api from './api';

api.add('/setting/save', (e, args) => {
    settings.set('certificate', args);
    e.returnValue = {
        code: 200,
        message: 'success'
    };
});

api.add('/setting/clear', (e) => {
    settings.deleteAll();
    e.returnValue = {
        code: 200,
        message: 'success'
    };
});

api.add('/setting', (e) => {
    if (settings.has('certificate')) {
        const setting = settings.get('certificate');
        e.sender.send('load-setting', setting);
    }
});
