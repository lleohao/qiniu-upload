import { Component, OnInit, Input } from '@angular/core';

import { ProgressItem } from '../upload.component';

@Component({
    selector: 'app-upload-details',
    templateUrl: './upload-details.component.html',
    styleUrls: ['./upload-details.component.scss']
})
export class UploadDetailsComponent implements OnInit {
    @Input() progressItem: ProgressItem;
    completed = false;
    sizeTxt = '';

    constructor() { }

    ngOnInit() {
        this.sizeTxt = this.translateSize(this.progressItem.size);
    }

    private translateSize(size: number) {
        const unit = ['b', 'KB', 'MB', 'GB'];
        let index = 0;

        while (size >= 1024) {
            size = size / 1024;
            index++;
        }
        size = Math.ceil(size);

        return `${size}${unit[index]}`;
    }
}
