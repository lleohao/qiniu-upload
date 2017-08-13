import { app, BrowserWindow, ipcMain } from 'electron';
import settings = require('electron-settings');

import path = require('path');
import url = require('url');

import { Upload } from './service/qiniu';

let win: Electron.BrowserWindow;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600, title: '七牛文件拖住上传工具' });
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
}

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
})
