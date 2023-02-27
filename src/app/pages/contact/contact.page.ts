import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { TranslateService } from '@ngx-translate/core';
import { UtilitiesProvider } from '../../utilities/utilities';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {
  currentLanguage: any = "en";
  userData: any = {}; 
  usertokenData: any= {};
  checkPatientCareData: any = {};

  constructor(public translate: TranslateService,public utilities: UtilitiesProvider, public callNumber: CallNumber) {
    this.userData = this.utilities.getLocalObject("userData");
    this.usertokenData = {"userId" : this.userData.user_id, "userToken" : this.userData.token, "userCentreId": this.userData.centre_id};  
   }

  ionViewWillEnter(){
    let getLocalLanguage = this.utilities.getLocalItem("currentLanguage");
    if (getLocalLanguage) {
      this.currentLanguage = getLocalLanguage;
    } else {
      this.currentLanguage = "en";
    }
  }

  startCall(number){
    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
}
