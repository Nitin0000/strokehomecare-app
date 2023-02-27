import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackPageRoutingModule } from './feedback-routing.module';

import { FeedbackPage } from './feedback.page';
import { TranslateModule } from '@ngx-translate/core';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { MediaCapture } from '@awesome-cordova-plugins/media-capture/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    FeedbackPageRoutingModule
  ],
  declarations: [FeedbackPage],
  providers:[
    AndroidPermissions,
    MediaCapture,
    FileTransfer
  ]
})
export class FeedbackPageModule {}
