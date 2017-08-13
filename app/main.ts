import { app, BrowserWindow } from 'electron';
import path = require('path');
import url = require('url');

let win: Electron.BrowserWindow;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 });

    const file = url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    });
    console.log(file);
    win.loadURL(file);

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
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
