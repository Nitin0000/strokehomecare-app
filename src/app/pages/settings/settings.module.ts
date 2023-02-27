import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { TranslateModule } from '@ngx-translate/core';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage],
  providers:[
    AppVersion
  ]
})
export class SettingsPageModule {}
