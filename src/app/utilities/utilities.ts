import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UtilitiesProvider {
  loading: any;
  alert: any;
  toast: any;
  isShowingLoading: boolean = false;
  isAlertShowing: boolean = false;

  constructor(public alertCtrl: AlertController, private router: Router, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public translateService: TranslateService) {
    console.log('Hello UtilitiesProvider Provider');
  }

  // LocalStorage
  setLocalItem(key, value) {
    localStorage.setItem(key, value);
  }

  getLocalItem(key) {
    return localStorage[key] || null;
  }

  setLocalObject(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getLocalObject(key) {
    return JSON.parse(localStorage[key] || '{}');
  }

  removeLocalkey(key) {
    localStorage.removeItem(key);
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  async showAlert(title, message) {
    if(message === "INVALID_CREDENTIALS"){
      await this.showToast("Session Expired. Logging Out...","top", "dark");
      setTimeout(() => {        
        this.router.navigateByUrl("/login", {replaceUrl: true})
      },1000);
      
    }else{
      const alert = await this.alertCtrl.create({
        header: title,
        message: message,
        buttons: ['OK']
      });
      this.alert = alert;
      await this.alert.present();
      const { role, data } = await this.alert.onDidDismiss();
      console.log('Loading dismissed!');
    }
  }

  async showLoading(message) {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: message,
      // duration: 2000
    });
    this.loading = loading;
    this.loading.present();
    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async hideLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

  async showToast(message, position, color = "success") {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2500,
      position: position,
      color: color
    });   
    await toast.present();
  }

  hideToast() {
    this.toast.dismiss();
  }

  translate(translationVariable) {
    var translatedText = "";
    let text = this.translateService.get(translationVariable).subscribe(
      value => {
        translatedText = value;
      }
    );
    return translatedText;
  }

}
