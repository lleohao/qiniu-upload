import { app, Menu, shell, webContents } from 'electron';

export const CustomMenu = () => {
    const template = [{
        label: 'Application',
        submenu: [
            { label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
            {
                label: 'Preferences...', accelerator: 'Command+,', click: function () {
                    webContents.getFocusedWebContents().send('/open/setting');
                }
            },
            { type: 'separator' },
            { label: 'Quit', accelerator: 'Command+Q', click: function () { app.quit(); } }
        ]
    }, {
        label: 'Edit',
        submenu: [
            { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
            { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
            { type: 'separator' },
            { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
            { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
            { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
            { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Document', click: function () {
                    shell.openExternal('https://github.com/lleohao/dragUpload-qiniu/blob/master/help.md');
                }
            }
        ]
    }];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template as Electron.MenuItemConstructorOptions[]));
};
