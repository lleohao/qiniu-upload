export class BaseService {
    protected ipcRender = electron.ipcRenderer;

    protected uuid() {
        return Math.random().toString(36).slice(2);
    }
}
