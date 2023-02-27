import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { TranslateModule } from '@ngx-translate/core';
// import { YoutubeVideoPlayer } from '@awesome-cordova-plugins/youtube-video-player/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage],
  providers: [
    // YoutubeVideoPlayer
  ]
})
export class HomePageModule { }
