import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../app/app.config';
import { BehaviorSubject } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';
import { UtilitiesProvider } from '../utilities/utilities';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentLanguage: string = "en";
  authState = new BehaviorSubject(false);

  constructor(public http: HttpClient, private config: Config, private platform: Platform,
    public toastController: ToastController, public utilities: UtilitiesProvider, public translate: TranslateService, private router: Router,) {
    this.platform.ready().then(() => {
      this.checkIfLoggedin();
    });
  }

  getUser(){
    var checkUserLogin = this.utilities.getLocalObject("userData");
    if (Object.keys(checkUserLogin).length === 0) {      
      // this.authState.next(false);
    } else {            
        return checkUserLogin;        
    }
  }
  checkIfLoggedin() {
    var checkUserLogin = this.utilities.getLocalObject("userData");
    console.log(checkUserLogin);
    if (Object.keys(checkUserLogin).length === 0) {      
      this.authState.next(false);
    } else {            
      this.router.navigate(['dashboard']);
      this.authState.next(true);      
    }
  }


  login(userData){   
    this.utilities.setLocalObject("userData", userData);
    this.translate.setDefaultLang(userData.language);
    this.translate.use(userData.language);
    this.utilities.setLocalItem("currentLanguage", userData.language);
    this.currentLanguage = userData.language;
    this.router.navigate(['dashboard'], {replaceUrl: true});
    this.authState.next(true);
  }

  logout() {
    this.utilities.removeLocalkey("userData");
    this.translate.setDefaultLang(this.currentLanguage);
    this.translate.use(this.currentLanguage);
    this.router.navigate(['login'], {replaceUrl: true});
    this.authState.next(false);
  }

  isAuthenticated(){
    return this.authState.value;
  }
  
  async getCenters(){
      return new Promise((resolve, reject) => {
        this.http.get(this.config.webApiUrl+"/shc/get_all_centers")
          .subscribe(data => {
              resolve(data);
          }, (err) => {
            reject(err);
          });
      });
  }

  async sendOTP(data){
    return new Promise((resolve, reject) => {
       this.http.post(this.config.webApiUrl+"/auth/send_otp", data)
         .subscribe(data => {
             resolve(data);
         }, (err) => {
           reject(err);
         });
     });
}

async checkMessageStatus(messageId){
    return new Promise((resolve, reject) => {
        let data = {};
       this.http.post(this.config.webApiUrl+"/auth/check_message/"+messageId, data)
         .subscribe(data => {
             resolve(data);
         }, (err) => {
           reject(err);
         });
     });
}


async loginwithPhoneVerification(data){
    return new Promise((resolve, reject) => {
       this.http.post(this.config.webApiUrl+"/auth/login_via_otp", data)
         .subscribe(data => {
             resolve(data);
         }, (err) => {
           reject(err);
         });
     });
}   

// with ID and Access Token
async editProfile(tokenData, data) {
     return new Promise((resolve, reject) => {
       this.http.post(this.config.webApiUrl+"/auth/edit_profile", data, {headers: tokenData})
         .subscribe(data => {
             resolve(data);
         }, (err) => {
           reject(err);
         });
     });
} 

async getProfile(tokenData) {
     return new Promise((resolve, reject) => {
       this.http.post(this.config.webApiUrl+"/auth/profile", {} ,{headers: tokenData})
         .subscribe(data => {
             resolve(data);
         }, (err) => {
           reject(err);
         });
     });
}

  
}
