import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { BaseService } from './base.service';

export interface SelectedFile {
    localPath: string;
    fileName: string;
    size: number;
    ext: string;
}

export interface ProgressInterface {
    id: string;
    progress: number;
}

@Injectable()
export class FileService extends BaseService {
    constructor() {
        super();
    }

    /**
     * 发送通过拖拽选择的文件
     * 
     * @param {string[]} filePaths 
     * @memberof FileService
     */
    sendDropFiles(filePaths: string[]) {
        this.ipcRender.send('/file/drop', filePaths);
    }

    /**
     * 发送请求打开文件选择框
     * 
     * @memberof FileService
     */
    selectLoaclFiles() {
        this.ipcRender.send('/file/select');
    }

    /**
     * 获取上传中的文件列表
     * 
     * @returns {Observable<SelectedFile[]>} 
     * @memberof FileService
     */
    uploadFileList(): Observable<SelectedFile[]> {
        return Observable.create((observer: Subscriber<SelectedFile[]>) => {
            this.ipcRender.on('/file/uploadlist', (e, files: SelectedFile[]) => {
                observer.next(files);
            });
        });
    }

    /**
     * 获取文件上传的进度
     * 
     * @returns {Observable<ProgressInterface>} 
     * @memberof FileService
     */
    uploadProgress(): Observable<ProgressInterface> {
        return Observable.create((observer: Subscriber<ProgressInterface>) => {
            electron.ipcRenderer.on('/file/upload/progress', (e, { id, progress }) => {
                observer.next({
                    id,
                    progress
                });
            });
        });
    }
}
