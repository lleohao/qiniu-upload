import { app, BrowserWindow, ipcMain } from 'electron';
import settings = require('electron-settings');

import path = require('path');
import url = require('url');

import { Upload } from './service/qiniu';

let win: Electron.BrowserWindow;
let uploadClient: Upload;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 640, title: '七牛文件拖住上传工具', minHeight: 640 });
    const webContents = win.webContents;

    let firstUrl;
    if (!settings.has('certificate')) {
        firstUrl = path.join(__dirname, 'pages/setting/setting.html');
    } else {
        firstUrl = path.join(__dirname, 'pages/index/index.html');
    }

    win.loadURL(url.format({
        pathname: firstUrl,
        protocol: 'file:',
        slashes: true
    }));

    webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });

    // 设置相关事件

    /**
     * 保存设置
     */
    ipcMain.on('save-setting', (e, args) => {
        settings.set('certificate', args);
    });

    /**
     * 清空设置
     */
    ipcMain.on('clear-setting', () => {
        settings.deleteAll();
    });

    /**
     * 读取设置
     */
    ipcMain.on('load-setting', (e) => {
        if (settings.has('certificate')) {
            const setting = settings.get('certificate');
            e.sender.send('load-setting', setting);
        }
    });

    /**
     * 上传文件
     */
    ipcMain.on('upload-file', (e, path, filename) => {
        if (settings.has('certificate')) {
            const { accessKey, secretKey, scope, domain } = settings.get('certificate');
            if (!uploadClient) {
                uploadClient = new Upload(accessKey, secretKey, scope);
            }

            uploadClient.uploadFile(path, filename, (err, body, code) => {
                if (err !== null) {
                    e.sender.send('error', err);
                    return;
                }

                if (code !== undefined) {
                    e.sender.send('error', `上传失败, http code: ${code}, ${body}`);
                    return;
                }

                const url = domain + '/' + body.key;
                e.sender.send('upload-success', url);
            });



        } else {
            e.sender.send('error', '必须先设置密钥才能使用!');
        }
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
