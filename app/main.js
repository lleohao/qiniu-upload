"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var settings = require("electron-settings");
var path = require("path");
var url = require("url");
var qiniu_1 = require("./service/qiniu");
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
    // 设置相关事件
    /**
     * 保存设置
     */
    electron_1.ipcMain.on('save-setting', function (e, args) {
        settings.set('certificate', args);
    });
    /**
     * 清空设置
     */
    electron_1.ipcMain.on('clear-setting', function () {
        settings.deleteAll();
    });
    /**
     * 读取设置
     */
    electron_1.ipcMain.on('load-setting', function (e) {
        if (settings.has('certificate')) {
            var setting = settings.get('certificate');
            e.sender.send('load-setting', setting);
        }
    });
    // 获取上传文件token
    electron_1.ipcMain.on('get-token', function (e) {
        if (settings.has('certificate')) {
            var _a = settings.get('certificate'), accessKey = _a.accessKey, secretKey = _a.secretKey, scope = _a.scope;
            var upload = new qiniu_1.Upload(accessKey, secretKey, scope);
            e.sender.send('get-token', upload.getUploadToken());
        }
        else {
            e.sender.send('error', '请先设置密钥后在使用!');
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