import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron';

import * as path from 'path';
import configs from './configs';

import { CustomMenu } from './service';
import { isDev } from './utils';

// Init project
import './api/'; // 导入api

let mainWin: Electron.BrowserWindow;

function createWindow() {
    mainWin = new BrowserWindow({
        width: 680,
        height: 500,
        minHeight: 500,
        minWidth: 680,
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

    CustomMenu();

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
