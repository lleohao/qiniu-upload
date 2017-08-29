import { Component, OnInit, Input, DoCheck, KeyValueDiffers, KeyValueDiffer } from '@angular/core';

import { ProgressItem } from '../upload.component';

interface InProgressItem extends ProgressItem {
    sizeTxt: string;
}

@Component({
    selector: 'app-upload-details',
    templateUrl: './upload-details.component.html',
    styleUrls: ['./upload-details.component.scss']
})
export class UploadDetailsComponent implements OnInit, DoCheck {
    @Input() progressItem: InProgressItem;
    private differ: KeyValueDiffer<string, any> = null;

    constructor(private differs: KeyValueDiffers) {

    }

    ngOnInit() {
        this.progressItem.sizeTxt = this.translateSize(this.progressItem.size);
        this.differ = this.differs.find(this.progressItem).create(null);
    }

    ngDoCheck() {
        const changes = this.differ.diff(this.progressItem);

        if (changes) {
            changes.forEachChangedItem((record) => {
                console.log(record);
            });
        }
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
