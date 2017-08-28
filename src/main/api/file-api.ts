import * as path from 'path';
import * as fs from 'fs';
import { app, dialog } from 'electron';

import api from './api';
import configs from '../configs';
import { Upload, UploadFile } from '../service/qiniu';

let client = null;
const { ak, sk, scope } = configs.setting;

const getClient = () => {
    if (client === null) {
        client = new Upload(ak, sk, scope);
    }

    return client;
};

/**
 * 上传文件
 */
api.add('/file/upload', (e, { localPath, fileName, size }) => {
    const uploadClient = getClient();

    uploadClient.uploadFile({
        fileName,
        localPath,
        size,
        progressCb: (id, progress) => {

        },
        resCb: (err, body, code) => {
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
        }
    });
});

api.add('/file/select', (e, uid) => {
    dialog.showOpenDialog({
        title: 'Select file',
        message: 'select file',
        properties: ['multiSelections', 'openFile']
    }, (filePaths: string[]) => {
        const uploadClient = getClient();
        const files = filePaths ? filePaths.map((filePath) => {
            const parsed = path.parse(filePath);
            const size = fs.statSync(filePath).size;
            return {
                fileName: parsed.name,
                localPath: filePath,
                size: size,
                ext: parsed.ext.substr(1)
            };
        }) : [];

        e.sender.send(`/file/select/${uid}`, files);
        files.forEach(({ fileName, localPath, size }) => {
            const _ = {
                fileName,
                localPath,
                size,
                progressCb: (id, progress) => {

                },
                resCb: (err, body, code) => {
                    if (err !== null) {
                        e.sender.send('error', err);
                        return;
                    }

                    if (code !== undefined) {
                        e.sender.send('error', `上传失败, http code: ${code}, ${body}`);
                        return;
                    }

                    e.sender.send('upload-success', fileURl);
                }
            };

            uploadClient.uploadFile(_);
        });
    });
});
