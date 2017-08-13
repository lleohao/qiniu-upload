"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var settings = require("electron-settings");
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 800, height: 600 });
    var webContents = win.webContents;
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'pages/index/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
    webContents.on('did-finish-load', function () {
        if (!settings.has('certificate')) {
            webContents.send('setCertificate');
        }
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map