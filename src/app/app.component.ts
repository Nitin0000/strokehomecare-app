import { Component } from '@angular/core';

import { MenuController, Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { Config } from './app.config';
import { Router } from "@angular/router";
import { UtilitiesProvider } from './utilities/utilities';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';

import { Network } from '@awesome-cordova-plugins/network/ngx';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  userData: any = {};
  rootPage: any;
  currentLanguage: any = "en";

  pages = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public utilities: UtilitiesProvider,
    public translate: TranslateService,
    private authService: AuthService,
    private network: Network,
    private oneSignal: OneSignal,
    public toast: ToastController,
    private keyboard: Keyboard,
    private nativeAudio: NativeAudio,
    private callNumber: CallNumber,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.keyboard.hideFormAccessoryBar(false);
      this.keyboard.disableScroll(false);

      this.pages = [
        {
          name: 'SIDEMENU_HOME',
          path: 'home'
        },
        {
          name: 'SIDEMENU_PATIENT_DETAILS',
          path: 'patient-details'
        },
        {
          name: 'SIDEMENU_CAREGIVER_DETAILS',
          path: 'caregiver-details'
        },
        // {
        //   name: 'SIDEMENU_ACKNOWLEDGEMENT',
        //   path: '/menu/contact'
        // },
        // {
        //   name: 'SIDEMENU_REFERENCES',
        //   path: 'contact'
        // },
        {
          name: 'SIDEMENU_SETTINGS',
          path: 'settings'
        }
      ]


      //   this.oneSignal.startInit('97a24191-987d-4eb9-b896-898e21a44fec', '952542149655');
      //   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      //   this.oneSignal.iOSSettings({
      //     kOSSettingsKeyAutoPrompt: false,
      //     kOSSettingsKeyInAppLaunchURL: false,
      //   });
      //   this.oneSignal.handleNotificationReceived().subscribe(() => {
      //     // do something when notification is received
      //   });

      //   this.oneSignal.handleNotificationOpened().subscribe(() => {
      //       // do something when a notification is opened
      //   });

      //   this.oneSignal.getIds().then(ids => {
      //     console.log(ids);
      //     this.utilities.setLocalItem("OneSignaluserId", ids.userId);
      //     this.utilities.setLocalItem("OneSignalpushToken", ids.pushToken);
      //  });

      //   this.oneSignal.endInit();

      let disconnectSubscription = this.network.onDisconnect().subscribe(async () => {
        console.log('network disconnected!');
        let toast = await this.toast.create({
          message: 'You are now disconnected from internet!',
          position: 'top',
          duration: 3000,
        });
        await toast.present();
        setTimeout(() => {
          // console.log("internet down");
          // this.router.navigate(['no-internet'], {replaceUrl: true});
        }, 200);
      });

      // watch network for a connection
      let connectSubscription = this.network.onConnect().subscribe(async () => {
        // console.log('network connected!');
        // let toast = await this.toast.create({
        //   message: 'You are now connected to internet!',
        //   position: 'top',
        //   duration: 3000,
        // });
        // await toast.present();
        // setTimeout(() => {
        //   console.log("internet up");
        //   // window.location.reload();
        // },200);
      });

      this.authService.authState.subscribe(state => {
        if (state) {
          this.userData = this.utilities.getLocalObject("userData");
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['login']);
        }
      });

      // Set Default App Language
      let getLocalLanguage = this.utilities.getLocalItem("currentLanguage");
      if (getLocalLanguage) {
        this.translate.setDefaultLang(getLocalLanguage);
        this.translate.use(getLocalLanguage);
        this.utilities.setLocalItem("currentLanguage", getLocalLanguage);
        this.currentLanguage = getLocalLanguage;
      } else {
        this.currentLanguage = "en";
        this.translate.setDefaultLang('en');
        this.translate.use('en');
        this.utilities.setLocalItem("currentLanguage", 'en');
      }
    });

  }

  startCall(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  changeLanguage(language) {
    let usertokenData = { "userId": this.userData.user_id, "userToken": this.userData.token };
    let profileData = {
      "language": language
    };
    this.authService.editProfile(usertokenData, profileData).then((result) => {
      if (result && result['data']) {
        this.utilities.setLocalObject("userData", result['data']);
      }
    }, (err) => {
      this.utilities.hideLoading();
      if (err.error.data && err.error.data.message) {
        this.utilities.showAlert("error", err.error.data.message);
      }
    });

    this.utilities.setLocalItem("currentLanguage", language);
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    this.currentLanguage = language;
  }

  logOut() {
    this.menuCtrl.toggle();
    this.menuCtrl.enable(false);
    this.utilities.showLoading(this.utilities.translate("LOGGING_OUT_LOADER")); //Show Loader
    setTimeout(() => {
      this.utilities.clearLocalStorage();
      setTimeout(() => {
        this.utilities.hideLoading();
        // this.router.navigate(['login']);
        window.location.reload();
      }, 1000);
    }, 1500);
  }

  gotoPage(route) {
    this.router.navigateByUrl(route);
  }

}
