import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

export interface SelectedFile {
    localPath: string;
    fileName: string;
    size: number;
    ext: string;
}

@Injectable()
export class FileService extends BaseService {
    constructor() {
        super();
    }

    selectFile() {
        return new Promise((reslove, reject) => {
            const uid = this.uuid();
            this.ipcRender.send('/file/select', uid);
            this.ipcRender.once(`/file/select/${uid}`, (e, filePath: SelectedFile[]) => {
                reslove(filePath);
            });
        });
    }

}
