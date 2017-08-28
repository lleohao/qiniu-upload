import * as qiniu from 'qiniu';
import * as path from 'path';
import * as fs from 'fs';

const MAX_UPLOAD_COUNT = 5;
const TOKEN_EXPIRES = 3600;

export interface UploadFile {
    localFile: string;
    filename: string;
    progressCb: (id, uploadSize) => void;
    resCb: (err, ...args) => void;
    id?: number | string;
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

    public uploadFile({ localFile, filename, progressCb, resCb, id }: UploadFile) {
        const uploadToken = this.getUploadToken();

        const resumeUploader = new qiniu.resume_up.ResumeUploader(this.config);
        const putExtra = new qiniu.resume_up.PutExtra(null, {}, null, null, (uploadSize) => {
            progressCb(id || localFile, uploadSize);
        });

        if (this.inUpload <= this.MAX_UPLOAD_COUNT) {
            this.inUpload++;

            resumeUploader.putFile(uploadToken, filename, localFile, putExtra, (respErr, respBody, respInfo) => {
                this.inUpload--;
                if (this.uploadQueue.length !== 0) {
                    this.uploadFile(this.uploadQueue.pop());
                }

                if (respErr) {
                    resCb(respErr);
                }
                if (respInfo.statusCode === 200) {
                    resCb(null, respBody);
                } else {
                    resCb(null, respBody, respInfo.statusCode);
                }
            });
        } else {
            this.uploadQueue.push({
                localFile,
                filename,
                progressCb,
                resCb
            });
        }
    }
}
