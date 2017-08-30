import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnChanges {
    @Input() progress: number;
    dasharray: string;

    ngOnChanges() {
        const percent = this.progress / 100;
        const perimeter = Math.PI * 2 * 10;

        this.dasharray = perimeter * percent + ' ' + perimeter * (1 - percent);
    }
}
