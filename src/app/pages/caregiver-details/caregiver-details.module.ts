import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaregiverDetailsPageRoutingModule } from './caregiver-details-routing.module';

import { CaregiverDetailsPage } from './caregiver-details.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CaregiverDetailsPageRoutingModule
  ],
  declarations: [CaregiverDetailsPage]
})
export class CaregiverDetailsPageModule {}
