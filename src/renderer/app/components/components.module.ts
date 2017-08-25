import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileIconComponent } from './file-icon/file-icon.component';

@NgModule({
    imports: [CommonModule],
    exports: [
        FileIconComponent
    ],
    declarations: [FileIconComponent]
})
export class ComponentsModule { }
