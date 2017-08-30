import { Component, OnInit, Input } from '@angular/core';

import { ProgressItem } from '../upload.component';
import { SettingService } from '../../service/setting.service';

@Component({
    selector: 'app-upload-details',
    templateUrl: './upload-details.component.html',
    styleUrls: ['./upload-details.component.scss']
})
export class UploadDetailsComponent implements OnInit {
    @Input() progressItem: ProgressItem;
    domian = '';
    sizeTxt = '';
    fileName = '';

    constructor(private setting: SettingService) { }

    ngOnInit() {
        const progressItem = this.progressItem;
        this.fileName = progressItem.name + '.' + progressItem.ext;
        this.sizeTxt = this.translateSize(progressItem.size);
        this.domian = this.setting.getSetting().domain;
    }

    getOuterLink() {
        electron.clipboard.writeText(`${this.domian}/${this.fileName}`);
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
