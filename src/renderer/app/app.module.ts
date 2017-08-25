import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingComponent } from './setting/setting.component';
import { UploadComponent } from './upload/upload.component';
import { NavComponent } from './nav/nav.component';

import { FileService } from './service/file.service';
import { SettingService } from './service/setting.service';
import { ComponentsModule } from './components/components.module';

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
        FormsModule,
        ComponentsModule
    ],
    providers: [FileService, SettingService],
    bootstrap: [AppComponent]
})
export class AppModule { }
