import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileIconComponent } from './file-icon/file-icon.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
    imports: [CommonModule],
    exports: [
        FileIconComponent,
        ProgressComponent
    ],
    declarations: [FileIconComponent, ProgressComponent]
})
export class ComponentsModule { }
