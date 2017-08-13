"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var settings = require("electron-settings");
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 800, height: 600, title: '七牛文件拖住上传工具' });
    var webContents = win.webContents;
    var firstUrl;
    if (!settings.has('certificate')) {
        firstUrl = path.join(__dirname, 'pages/setting/setting.html');
    }
    else {
        firstUrl = path.join(__dirname, 'pages/index/index.html');
    }
    win.loadURL(url.format({
        pathname: firstUrl,
        protocol: 'file:',
        slashes: true
    }));
    webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
    electron_1.ipcMain.on('save-setting', function (e, args) {
        settings.set('certificate', args);
    });
    electron_1.ipcMain.on('clear-setting', function () {
        settings.clearPath('Settings');
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