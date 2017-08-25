import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { FileService } from '../service/file.service';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    dragOver = false;
    inline = true;
    currentClass = {
        'drag-over': this.dragOver,
        'inline': this.inline
    };

    constructor(private fileService: FileService) {

    }

    ngOnInit() {
    }

    drop(e) {
        console.log(e);

        this.dragOver = false;
    }

    selectFile() {
        this.fileService.selectFile().then((filePaths) => {
            console.log(filePaths);
        });
    }
}
