import * as path from 'path';
import * as fs from 'fs';
import { app, dialog, ipcMain } from 'electron';

import api from './api';
import configs from '../configs';
import { Upload, UploadFile } from '../service/qiniu';

const { ak, sk, scope } = configs.setting;

/**
 * 获取上传对象
 */
const getClient = (function () {
    let client = null;

    return () => {
        if (client === null) {
            client = new Upload(ak, sk, scope);
        }
        return client;
    };
})();

/**
 * 上传成功处理函数
 * 
 * @param err         七牛上传错误对象
 * @param resBody     七牛上传响应体
 * @param code        七牛上传 HTTP code
 * @param id          文件唯一id
 */
const resCb = ({ err, body, code }, id: string) => {
    if (err !== null) {
        dialog.showErrorBox('上传失败', err);
        ipcMain.emit(`/file/upload/error`, { id, error: err });
        return;
    }

    if (code !== undefined) {
        const errorMessage = `http code: ${code}, ${body}`;
        dialog.showErrorBox('上传失败', errorMessage);
        ipcMain.emit(`/file/upload/error`, { id, error: errorMessage });
        return;
    }

    ipcMain.emit(`/file/upload/success`, { id });
};

/**
 * 上传进度处理函数
 * 
 * @param id        文件唯一id
 * @param progress  上传进度
 */
const progressCb = (id: string, progress: number) => {
    ipcMain.emit('/file/upload/progress', { id, progress });
};

/**
 * 上传文件
 */
api.add('/file/upload', (e, { localPath, fileName, size, id }) => {
    const uploadClient = getClient();

    uploadClient.uploadFile({
        fileName,
        localPath,
        size,
        progressCb: progressCb,
        resCb: resCb
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
            uploadClient.uploadFile({
                fileName,
                localPath,
                size,
                progressCb: progressCb,
                resCb: resCb
            });
        });
    });
});
