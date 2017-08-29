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
        this.fileService.uploadProgress().subscribe(({ id, progress }) => {
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
        const files = e.dataTransfer.files;
        const temp = [];
        for (let i = 0, len = files.length; i < len; i++) {
            const file = files[i];
            temp.push({
                name: file.name.split('.')[0],
                ext: file.name.split('.')[1],
                progress: 0,
                id: file.path,
                size: file.size
            });
        }

        this.dragOver = false;
        this.progressList.unshift(...temp);
    }

    selectFile() {
        this.fileService.selectFile().then((filePaths: SelectedFile[]) => {
            const temp = filePaths.map((file) => {
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
