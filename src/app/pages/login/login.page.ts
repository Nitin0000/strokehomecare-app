import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UtilitiesProvider } from '../../utilities/utilities';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../services/auth.service';
import { IonContent, MenuController, Platform } from '@ionic/angular';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  deviceData: any = {
    "platform": null,
    "uuid": null,
    'app_version': null
  };
  currentLanguage: any = "en";
  currentScreen: string = "enterMobileNumberSection";
  currentOTPCode: any = null;
  currentCountryCode: any = "+91";
  checkNewLogin: boolean = false;
  centres: any = [];

  appLanguages: any =  [
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

  @ViewChild(IonContent, { static: false }) content: IonContent;

  sentOTPData = { "phone_number": null, "code": null };
  submitAndLoginData = { "phone_number": null, "fullname": null, "language": null, "centre_id": null, "otp_code": null, "onesignal_id": null };

  constructor(private router: Router, public utilities: UtilitiesProvider, public translate: TranslateService, private auth: AuthService, private appVersion: AppVersion, private device: Device, private oneSignal: OneSignal, private keyboard: Keyboard, private platform: Platform, public menuCtrl: MenuController) {


  }

  clearValues() {
    this.sentOTPData = { "phone_number": null, "code": null };
    this.submitAndLoginData = { "phone_number": null, "fullname": null, "language": null, "centre_id": null, "otp_code": null, "onesignal_id": null };
    this.checkNewLogin = false;
  }

  async getDeviceInformation() {
    this.deviceData.app_version = await this.appVersion.getVersionCode();
    this.deviceData.uuid = await this.device.uuid;
    this.deviceData.platform = await this.device.platform;
  }

  async getCenters() {
    // centres
    this.auth.getCenters().then((result) => {
      this.centres = result["data"];
    }, (err) => {
      this.utilities.hideLoading();
      if (err.error.data && err.error.data.message) {
        this.utilities.showAlert("error", err.error.data.message);
      }
    });
  }

  onFocus() {
    console.log('scroll');
    this.ScrollToBottom();
  }

  ScrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom(100);
    }, 500);
  }

  // Change Screen
  showScreen(screenName) {
    this.currentScreen = screenName;
  }

  ionViewWillEnter() {
    this.getDeviceInformation();
    this.getCenters();
    this.menuCtrl.enable(false);

    this.auth.authState.subscribe(state => {
      if (state) {
        this.router.navigate(['home']);
      }
    });
    let getLocalLanguage = this.utilities.getLocalItem("currentLanguage");
    if (getLocalLanguage) {
      this.currentLanguage = getLocalLanguage;
    } else {
      this.currentLanguage = "en";
    }
  }

  keyboardCheck() {
    return !this.keyboard.onKeyboardShow();
  }

  checkMessageStatus(messageId) {
    this.auth.checkMessageStatus(messageId).then((result) => {
      this.currentScreen = "enterVerificationCodeSection";
      this.utilities.hideLoading();
    }, (err) => {
      this.checkMessageStatus(messageId);
    });
  }


  sendOTP() {
    if (!this.sentOTPData.phone_number) {
      this.utilities.showAlert("error", this.utilities.translate("LOGIN_FORM_ALERTS_ENTER_NUMBER"));
      return false;
    }
    this.utilities.showLoading(this.utilities.translate("PLEASE_WAIT_LOADER"));

    let code = 0;
    if (this.sentOTPData.phone_number === "9876543210") {
      code = 1234;
      this.currentOTPCode = code;
    } else {
      code = Math.floor(1001 + Math.random() * 9000);
      this.currentOTPCode = code;
    }

    let data = { phone_number: null, code: null };
    data.phone_number = this.currentCountryCode + this.sentOTPData.phone_number;
    data.code = code;

    this.submitAndLoginData.phone_number = this.currentCountryCode + this.sentOTPData.phone_number;
    this.auth.sendOTP(data).then((result) => {

      this.checkNewLogin = result['data']['new_user'];
      if(result['data']['message_data'] !== "test_account"){
        this.checkMessageStatus(result['data']['message_data']);
      }else{
        this.currentScreen = "enterVerificationCodeSection";
        this.utilities.hideLoading();
      }

    }, (err) => {
      this.utilities.hideLoading();
      if (err.error.data && err.error.data.message) {
        this.utilities.showAlert("error", err.error.data.message);
      }
    });
  }


  submitAndLogin() {
    if (this.checkNewLogin) {
      if (!this.submitAndLoginData.centre_id) {
        this.utilities.showAlert("error", this.utilities.translate("LOGIN_FORM_ALERTS_CHOOSE_CENTER"));
        return false;
      }
      if (!this.submitAndLoginData.fullname) {
        this.utilities.showAlert("error", this.utilities.translate("LOGIN_FORM_ALERTS_ENTER_NAME"));
        return false;
      }
    }
    if (!this.submitAndLoginData.language) {
      this.submitAndLoginData.language = "en";
    }

    if (!this.submitAndLoginData.otp_code) {
      this.utilities.showAlert("error", this.utilities.translate("LOGIN_FORM_ALERTS_ENTER_OTP"));
      return false;
    }

    if (parseInt(this.submitAndLoginData.otp_code) === parseInt(this.currentOTPCode)) {
      this.utilities.showLoading(this.utilities.translate("PLEASE_WAIT_LOADER"));

      this.platform.ready().then(() => {

        this.auth.loginwithPhoneVerification(this.submitAndLoginData).then((result) => {
          if (result && result['data'] && result['data']['user_id']) {
            if (this.checkNewLogin) {
              this.utilities.showAlert("success", this.utilities.translate("LOGIN_FORM_ALERTS_REGISTER_SUCCESS"));
            }
            this.showScreen('enterMobileNumberSection');
            this.clearValues();
            this.auth.login(result['data']);
            this.utilities.hideLoading();
            this.menuCtrl.enable(true);
          }
        }, (err) => {
          this.utilities.hideLoading();
          if (err.error.data && err.error.data.message) {
            this.utilities.showAlert("error", err.error.data.message);
          }
        });
      });

    } else {
      this.utilities.showAlert("error", this.utilities.translate("LOGIN_FORM_ALERTS_INCORRECT_OTP"));
      return false;
    }


  }
}
