import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SymptomsAnswerPageRoutingModule } from './symptoms-answer-routing.module';

import { SymptomsAnswerPage } from './symptoms-answer.page';
import { TranslateModule } from '@ngx-translate/core';
import { FileTransfer} from '@awesome-cordova-plugins/file-transfer/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SymptomsAnswerPageRoutingModule
  ],
  declarations: [SymptomsAnswerPage],
  providers:[
    FileTransfer, Camera
  ]
})
export class SymptomsAnswerPageModule {}
