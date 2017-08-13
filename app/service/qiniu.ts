import qiniu = require('qiniu');
import settings = require('electron-settings');

export class Upload {
    private ak: string;
    private sk: string;
    private scope: string;

    private putPolicy;
    private mac

    constructor(ak: string, sk: string, scope: string) {
        this.ak = ak;
        this.sk = sk;
        this.scope = scope;

        this.mac = new qiniu.auth.digest.Mac(this.ak, this.sk);

        this.putPolicy = new qiniu.rs.PutPolicy({
            scope: this.scope,
            expires: 3600
        });
    }

    getUploadToken() {
        return this.putPolicy.uploadToken(this.mac);
    }
}
