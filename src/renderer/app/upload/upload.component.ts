import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    dragOver = false;

    ngOnInit() {
    }

    drop(e) {
        console.log(e);

        this.dragOver = false;
    }

    selectFile() {

    }

}
