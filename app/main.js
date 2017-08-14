"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var settings = require("electron-settings");
var path = require("path");
var url = require("url");
var qiniu_1 = require("./service/qiniu");
var win;
var uploadClient;
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 800, height: 640, title: '七牛文件拖住上传工具', minHeight: 640 });
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
    /**
     * 上传文件
     */
    electron_1.ipcMain.on('upload-file', function (e, path, filename) {
        if (settings.has('certificate')) {
            var _a = settings.get('certificate'), accessKey = _a.accessKey, secretKey = _a.secretKey, scope = _a.scope, domain_1 = _a.domain;
            if (!uploadClient) {
                uploadClient = new qiniu_1.Upload(accessKey, secretKey, scope);
            }
            uploadClient.uploadFile(path, filename, function (err, body, code) {
                if (err !== null) {
                    e.sender.send('error', err);
                    return;
                }
                if (code !== undefined) {
                    e.sender.send('error', "\u4E0A\u4F20\u5931\u8D25, http code: " + code + ", " + body);
                    return;
                }
                var url = domain_1 + '/' + body.key;
                e.sender.send('upload-success', url);
            });
        }
        else {
            e.sender.send('error', '必须先设置密钥才能使用!');
        }
    });
    var template = [{
            label: "Application",
            submenu: [
                { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
                { type: "separator" },
                { label: "Quit", accelerator: "Command+Q", click: function () { electron_1.app.quit(); } }
            ]
        }, {
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
            ]
        }
    ];
    electron_1.Menu.setApplicationMenu(electron_1.Menu.buildFromTemplate(template));
}
;
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