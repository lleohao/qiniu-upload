import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { UploadModule } from './upload/upload.module';

import { AppComponent } from './app.component';
import { SettingComponent } from './setting/setting.component';
import { NavComponent } from './nav/nav.component';

import { FileService } from './service/file.service';
import { SettingService } from './service/setting.service';
import { RouterService } from './service/router.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,

        AppRoutingModule,
        UploadModule
    ],
    declarations: [
        AppComponent,
        SettingComponent,
        NavComponent
    ],
    providers: [FileService, SettingService, RouterService],
    bootstrap: [AppComponent]
})
export class AppModule { }
