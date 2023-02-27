import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HttpClient}  from '@angular/common/http';


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { UtilitiesProvider } from './utilities/utilities';
 
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

import { Config } from './app.config';

import { Network } from '@awesome-cordova-plugins/network/ngx';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Media } from '@awesome-cordova-plugins/media/ngx';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({
    scrollAssist: true,
    mode: 'ios',
    swipeBackEnabled: false,
    rippleEffect: true,
    backButtonText: ''
  }), 
  AppRoutingModule,
  HttpClientModule,
  TranslateModule.forRoot({
    loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
})],
  providers: [
    StatusBar,
    SplashScreen,
    UtilitiesProvider,
    AuthGuardService,
    AuthService,
    Config,
    Network,
    OneSignal,
    Keyboard,
    NativeAudio,
    CallNumber,
    Media,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
