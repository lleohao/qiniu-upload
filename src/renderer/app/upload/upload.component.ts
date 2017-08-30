import { Component, OnInit, DoCheck, NgZone } from '@angular/core';

import { FileService, SelectedFile } from '../service/file.service';

export interface ProgressItem {
    name: string;
    ext: string;
    progress: number;
    id: number | string;
    size?: number;
}

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, DoCheck {
    dragOver = false;
    inline = false;
    progressList: ProgressItem[] = [];

    constructor(private fileService: FileService, private zone: NgZone) {
        electron.ipcRenderer.on('/file/upload/error', (e, { id, err }) => {
            console.log('error', id, err);
        });
    }

    ngOnInit() {
        this.fileService.uploadFileList()
            .subscribe(files => {
                const temp = files.map((file) => {
                    return {
                        name: file.fileName,
                        ext: file.ext,
                        size: file.size,
                        progress: 0,
                        id: file.localPath
                    };
                });

                this.progressList.unshift(...temp);
            });

        this.fileService.uploadProgress()
            .subscribe(({ id, progress }) => {
                this.zone.run(() => {
                    const index = this.findIndexById(id);
                    const updateItem = this.progressList[index];
                    updateItem.progress = progress;

                    this.progressList[index] = updateItem;
                });
            });
    }

    ngDoCheck() {
        this.inline = this.progressList.length !== 0;
    }

    drop(e: DragEvent) {
        const _files = e.dataTransfer.files;
        const filePaths = [];
        for (let i = 0, len = _files.length; i < len; i++) {
            filePaths.push(_files[i].path);
        }

        this.dragOver = false;
        this.fileService.sendDropFiles(filePaths);
    }

    selectFile() {
        this.fileService.selectLoaclFiles();
    }

    private findIndexById(id) {
        let index = 0;
        for (index = 0; index < this.progressList.length; index++) {
            const element = this.progressList[index];
            if (element.id === id) {
                break;
            }
        }

        return index;
    }
}
