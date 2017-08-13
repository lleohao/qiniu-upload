import { app, BrowserWindow, ipcMain } from 'electron';
import path = require('path');
import url = require('url');
import settings = require('electron-settings');

let win: Electron.BrowserWindow;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 });
    const webContents = win.webContents;

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'pages/index/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });

    webContents.on('did-finish-load', () => {
        if (!settings.has('certificate')) {
            webContents.send('setCertificate');
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
