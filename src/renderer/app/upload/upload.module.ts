import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../components/components.module';

import { UploadComponent } from './upload.component';
import { UploadDetailsComponent } from './upload-details/upload-details.component';

@NgModule({
    imports: [CommonModule, ComponentsModule],
    declarations: [UploadComponent, UploadDetailsComponent],
    exports: [UploadComponent]
})
export class UploadModule {

}
