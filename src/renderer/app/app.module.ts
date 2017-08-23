import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingComponent } from './setting/setting.component';
import { UploadComponent } from './upload/upload.component';
import { NavComponent } from './nav/nav.component';

import { SettingService } from './service/setting.service';

@NgModule({
    declarations: [
        AppComponent,
        SettingComponent,
        UploadComponent,
        NavComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [SettingService],
    bootstrap: [AppComponent]
})
export class AppModule { }
