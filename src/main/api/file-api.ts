import * as path from 'path';
import * as fs from 'fs';
import { app, dialog, ipcMain } from 'electron';

import api from './api';
import configs from '../configs';
import { Upload, UploadFile } from '../service/qiniu';

/**
 * 获取上传对象
 */
const getClient = (function () {
    let client = null;

    return (): Upload => {
        if (client === null || configs.reflush) {
            client = new Upload(configs.setting);
            configs.reflush = false;
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
const resCb = (e: Electron.Event) => {
    return (id: string, err, body, code) => {
        if (err !== null) {
            dialog.showErrorBox('上传失败', err);
            e.sender.send('/file/upload/error', { id, error: err });
            return;
        }

        if (code !== undefined) {
            const errorMessage = `http code: ${code}, ${body}`;
            dialog.showErrorBox('上传失败', errorMessage);
            e.sender.send('/file/upload/error', { id, error: errorMessage });
            return;
        }
    };
};

/**
 * 上传进度处理函数
 * 
 * @param id        文件唯一id
 * @param progress  上传进度
 */
const progressCb = (e: Electron.Event) => {
    return (id: string, progress: number) => {
        e.sender.send('/file/upload/progress', {
            id,
            progress
        });
    };
};

/**
 * 上传文件函数
 * 
 * @param e             Electron event
 * @param filePaths     上传文件的路径
 */
const uploadFile = (e: Electron.Event, filePaths: string[]) => {
    const uploadClient = getClient();
    const files = filePaths.map((filePath) => {
        const parsed = path.parse(filePath);
        const size = fs.statSync(filePath).size;
        return {
            baseName: parsed.base,
            fileName: parsed.name,
            localPath: filePath,
            size: size,
            ext: parsed.ext.substr(1)
        };
    });

    e.sender.send('/file/uploadlist', files);

    process.nextTick(() => {
        files.forEach(({ baseName, localPath, size }) => {
            uploadClient.uploadFile({
                fileName: baseName,
                localPath,
                size,
                progressCb: progressCb(e),
                resCb: resCb(e)
            });
        });
    });
};

/**
 * 打开文件选择框
 */
api.add('/file/select', (e) => {
    dialog.showOpenDialog({
        title: 'Select file',
        message: 'select file',
        properties: ['multiSelections', 'openFile']
    }, (filePaths: string[]) => {
        uploadFile(e, filePaths);
    });
});

/**
 * 上传文件
 */
api.add('/file/drop', (e, filePaths: string[]) => {
    uploadFile(e, filePaths);
});
