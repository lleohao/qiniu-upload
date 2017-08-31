import { ipcMain } from 'electron';

class Api {
    private path: Set<string>;

    constructor() {
        this.path = new Set();
    }

    public add(channel: string, listener: (e: Electron.Event, ...args) => void) {
        if (this.path.has(channel)) {
            throw new Error(`path: ${channel} is exites in app.`);
        }

        this.path.add(channel);
        ipcMain.on(channel, listener);
    }
}

export default new Api();
