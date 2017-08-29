import * as electronSetting from 'electron-settings';

export interface QiNiuSetting {
    ak: string;
    sk: string;
    scope: string;
    domain: string;
}

class Config {
    setting: QiNiuSetting = {
        ak: '',
        sk: '',
        scope: '',
        domain: ''
    };

    constructor() {
        if (electronSetting.has('certificate')) {
            this.setting = electronSetting.get('certificate');
        }
    }

    save(settings) {
        this.setting = settings;
        electronSetting.set('certificate', settings);
    }

    clear() {
        this.setting = {
            ak: '',
            sk: '',
            scope: '',
            domain: ''
        };
        electronSetting.deleteAll();
    }
}

export default new Config();
