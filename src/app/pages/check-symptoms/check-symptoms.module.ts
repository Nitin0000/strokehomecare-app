import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckSymptomsPageRoutingModule } from './check-symptoms-routing.module';

import { CheckSymptomsPage } from './check-symptoms.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CheckSymptomsPageRoutingModule
  ],
  declarations: [CheckSymptomsPage]
})
export class CheckSymptomsPageModule {}
