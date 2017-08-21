import * as settings from 'electron-settings';
import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow, ipcMain, Menu } from 'electron';

import './api/'; // 导入api
import { CopyService } from './service';
import { isDev } from './utils';

let mainWin: Electron.BrowserWindow;

function createWindow() {
    mainWin = new BrowserWindow({
        width: 800,
        height: 640,
        title: '七牛上传工具'
    });
    const webContents = mainWin.webContents;

    // open windows
    if (isDev()) {
        mainWin.loadURL('http://127.0.0.1:4200');
        mainWin.webContents.openDevTools();
    } else {
        mainWin.loadURL(`file://${path.resolve(__dirname, 'dist/index.html')}`);
    }

    // import service
    CopyService();

    mainWin.on('closed', () => {
        mainWin = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWin === null) {
        createWindow();
    }
});
