import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { SettingComponent } from './setting/setting.component';
import { UploadComponent } from './upload/upload.component';
import { UploadDetailsComponent } from './upload/upload-details/upload-details.component';
import { NavComponent } from './nav/nav.component';

import { FileService } from './service/file.service';
import { SettingService } from './service/setting.service';
import { RouterService } from './service/router.service';

@NgModule({
    declarations: [
        AppComponent,
        SettingComponent,
        UploadComponent,
        NavComponent,
        UploadDetailsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ComponentsModule,
        BrowserAnimationsModule
    ],
    providers: [FileService, SettingService, RouterService],
    bootstrap: [AppComponent]
})
export class AppModule { }
