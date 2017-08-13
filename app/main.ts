import { app, BrowserWindow, ipcMain } from 'electron';
import path = require('path');
import url = require('url');
import settings = require('electron-settings');

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

    ipcMain.on('save-setting', (e, args) => {
        settings.set('certificate', args);
    });

    ipcMain.on('clear-setting', () => {
        settings.clearPath('Settings');
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
