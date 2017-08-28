import { Component, OnInit, DoCheck, ViewChild, ElementRef } from '@angular/core';

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

    constructor(private fileService: FileService) {
    }

    ngOnInit() {
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
                id: file.path
            });
        }

        this.dragOver = false;
        this.progressList = this.progressList.concat(temp);
    }

    selectFile() {
        this.fileService.selectFile().then((filePaths: SelectedFile[]) => {
            const temp = filePaths.map((file) => {
                return {
                    name: file.name,
                    ext: file.ext,
                    progress: 0,
                    id: file.path
                };
            });

            this.progressList = this.progressList.concat(temp);
        });
    }
}
