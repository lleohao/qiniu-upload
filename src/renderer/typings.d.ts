/* SystemJS module definition */
/// <reference path="../../node_modules/electron/electron.d.ts" />
declare var module: NodeModule;
interface NodeModule {
    id: string;
}
declare var electron: Electron.AllElectron;
