import { app } from 'electron';
import * as settings from 'electron-settings';

import api from './api';
import { Upload } from '../service/qiniu';

let uploadClient: Upload = null;

/**
 * 上传文件
 */
api.add('/file/upload', (e, filePath, filename) => {
    if (settings.has('certificate')) {
        const { accessKey, secretKey, scope, domain } = settings.get('certificate');
        uploadClient = uploadClient || new Upload(accessKey, secretKey, scope);

        uploadClient.uploadFile(filePath, filename, (err, body, code) => {
            if (err !== null) {
                e.sender.send('error', err);
                return;
            }

            if (code !== undefined) {
                e.sender.send('error', `上传失败, http code: ${code}, ${body}`);
                return;
            }

            const fileURl = domain + '/' + body.key;
            e.sender.send('upload-success', fileURl);
        });
    }
});
