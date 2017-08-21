import * as qiniu from 'qiniu';
import * as settings from 'electron-settings';

export class Upload {
    private putPolicy;
    private mac;
    private config;
    private token;
    private tokenValidPeriod;
    private expires = 3600;


    constructor(ak: string, sk: string, scope: string) {
        this.mac = new qiniu.auth.digest.Mac(ak, sk);

        this.putPolicy = new qiniu.rs.PutPolicy({
            scope: scope,
            expires: this.expires
        });

        this.config = new qiniu.conf.Config();
        this.config.zone = qiniu.zone.Zone_z2;
    }

    private getUploadToken() {
        const now = Date.now();

        if (!this.tokenValidPeriod || (now + this.expires * 1000) < this.tokenValidPeriod) {
            this.token = this.putPolicy.uploadToken(this.mac);
        }

        return this.token;
    }

    public uploadFile(path: string, filename: string, callback: (err, ...args) => void) {
        const formUploader = new qiniu.form_up.FormUploader(this.config);
        const putExtra = new qiniu.form_up.PutExtra();
        const uploadToken = this.getUploadToken();

        formUploader.putFile(uploadToken, filename, path, putExtra, function (respErr,
            respBody, respInfo) {
            if (respErr) {
                callback(respErr);
            }
            if (respInfo.statusCode === 200) {
                callback(null, respBody);
            } else {
                callback(null, respBody, respInfo.statusCode);
            }
        });
    }
}
