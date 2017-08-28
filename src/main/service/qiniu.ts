import * as qiniu from 'qiniu';
import * as fs from 'fs';

const MAX_UPLOAD_COUNT = 5;
const TOKEN_EXPIRES = 3600;

export interface UploadFile {
    localPath: string;
    fileName: string;
    progressCb: (id, progress) => void;
    resCb: ({ }, id) => void;
    id?: number | string;
    size?: number;
}

export class Upload {
    private putPolicy;
    private mac;
    private config;
    private token;
    private tokenValidPeriod;
    private expires = TOKEN_EXPIRES;

    private MAX_UPLOAD_COUNT = 5;
    private uploadQueue: UploadFile[] = [];
    private inUpload = 0;

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

    public uploadFile({ localPath, fileName, progressCb, resCb, id, size }: UploadFile) {
        const uploadToken = this.getUploadToken();
        id = id || localPath;

        const resumeUploader = new qiniu.resume_up.ResumeUploader(this.config);
        const putExtra = new qiniu.resume_up.PutExtra(null, {}, null, null, (uploadSize) => {
            progressCb(id, Math.floor(uploadSize / size));
        });

        if (this.inUpload <= this.MAX_UPLOAD_COUNT) {
            this.inUpload++;

            resumeUploader.putFile(uploadToken, fileName, localPath, putExtra, (err, body, respInfo) => {
                this.inUpload--;
                if (this.uploadQueue.length !== 0) {
                    this.uploadFile(this.uploadQueue.pop());
                }

                if (err) {
                    resCb({ err }, id);
                }
                if (respInfo.statusCode === 200) {
                    resCb({ err: null, body }, id);
                } else {
                    resCb({ err: null, body, code: respInfo.statusCode }, id);
                }
            });
        } else {
            this.uploadQueue.push({
                localPath,
                fileName,
                progressCb,
                resCb
            });
        }
    }
}
