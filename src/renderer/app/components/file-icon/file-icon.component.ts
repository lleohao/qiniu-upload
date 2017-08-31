import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-file-icon',
    templateUrl: './file-icon.component.html',
    styleUrls: ['./file-icon.component.scss']
})
export class FileIconComponent implements OnInit {
    @Input() ext: string;

    constructor() { }

    ngOnInit() {
        if (this.ext.startsWith('.')) {
            this.ext = this.ext.substr(1);
        }
    }

}
