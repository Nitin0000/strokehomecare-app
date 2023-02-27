import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoInternetPageRoutingModule } from './no-internet-routing.module';

import { NoInternetPage } from './no-internet.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    NoInternetPageRoutingModule
  ],
  declarations: [NoInternetPage]
})
export class NoInternetPageModule {}
