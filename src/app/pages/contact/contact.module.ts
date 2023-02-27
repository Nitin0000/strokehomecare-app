import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactPageRoutingModule } from './contact-routing.module';

import { ContactPage } from './contact.page';
import { TranslateModule } from '@ngx-translate/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ContactPageRoutingModule
  ],
  declarations: [ContactPage],
  providers:[
    CallNumber
  ]
})
export class ContactPageModule {}
