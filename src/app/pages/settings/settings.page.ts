import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { NavController, Platform } from '@ionic/angular';
import { UtilitiesProvider } from '../../utilities/utilities';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  userData: any = {};
  usertokenData: any= {};

  versionNumber: any;
  languages: any = [];
  currentLanguage: any = "en";

  constructor(public navCtrl: NavController,public utilities: UtilitiesProvider, private appVersion: AppVersion, platform: Platform,private  router:  Router, private auth: AuthService, public translate: TranslateService) {
    this.userData = this.utilities.getLocalObject("userData");
    this.usertokenData = {"userId" : this.userData.user_id, "userToken" : this.userData.token, "userCentreId": this.userData.centre_id};

    platform.ready().then(() => {
      if (platform.is('ios') || platform.is('android')) {
        appVersion.getVersionNumber().then((s) => {
          this.versionNumber = s;
        });
      }
    });

    this.languages =  [
      {
        name: "English",
        value: "en",
      },
      {
        name: "Hindi",
        value: "hi",
      },
      {
        name: "Punjabi",
        value: "pb",
      },
      {
        name: "Telugu",
        value: "tlg",
      },
      {
        name: "Malayalam",
        value: "mlylm",
      },
      {
        name: "Tamil",
        value: "tml",
      },
      {
        name: "Bengali",
        value: "bngl",
      },
      {
        name: "Odia",
        value: "od",
      },
      {
        name: "Assamese",
        value: "asm",
      },
      {
        name: "Marathi",
        value: "mrth",
      },
      {
        name: "Kannada",
        value: "knd",
      },
    ];

  }

  ionViewWillEnter() {
    let getLocalLanguage = this.utilities.getLocalItem("currentLanguage");
    if (getLocalLanguage) {
      this.currentLanguage = getLocalLanguage;
    } else {
      this.currentLanguage = "en";
    }
  }

  gotoAboutPage() {
    this.router.navigateByUrl("about");
  }

  gotoContactPage() {
    this.router.navigateByUrl("contact");
  }

  changeLanguage(){
    let profileData = {
      "language" : this.currentLanguage
    };
    this.auth.editProfile(this.usertokenData, profileData).then((result) => {
      if(result && result['data']){
        this.utilities.setLocalObject("userData", result['data']);
      }
    }, (err) => {
      this.utilities.hideLoading();
      if(err.error.data && err.error.data.message){
          this.utilities.showAlert("error",err.error.data.message);
      }
    });
    this.utilities.setLocalItem("currentLanguage", this.currentLanguage);
    this.translate.setDefaultLang(this.currentLanguage);
    this.translate.use(this.currentLanguage);
    this.currentLanguage = this.currentLanguage;
  }
}
