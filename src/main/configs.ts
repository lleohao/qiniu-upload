import * as electronSetting from 'electron-settings';

export interface QiNiuSetting {
    ak: string;
    sk: string;
    scope: string;
    domain: string;
}

export let setting: QiNiuSetting = {
    ak: '',
    sk: '',
    scope: '',
    domain: ''
};

export default {
    setting,
    save: (settings) => {
        setting = settings;
        electronSetting.set('certificate', settings);
    },
    clear: () => {
        setting = {
            ak: '',
            sk: '',
            scope: '',
            domain: ''
        };
        electronSetting.deleteAll();
    },
    init: () => {
        if (electronSetting.has('certificate')) {
            setting = electronSetting.get('certificate');
        }
    }
};
