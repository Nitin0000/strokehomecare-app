import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import {UtilitiesProvider} from '../../utilities/utilities';

@Component({
  selector: 'app-caregiver-details',
  templateUrl: './caregiver-details.page.html',
  styleUrls: ['./caregiver-details.page.scss'],
})
export class CaregiverDetailsPage{
  userData: any = {}; 
  careGiverData: any = {};
  usertokenData: any= {};

  constructor(public navCtrl: NavController, public translate: TranslateService,public api: ApiService, public utilities: UtilitiesProvider, public alertCtrl: AlertController) { 
    this.userData = this.utilities.getLocalObject("userData");
    this.usertokenData = {"userId" : this.userData.user_id, "userToken" : this.userData.token, "userCentreId": this.userData.centre_id};  
  }

  ionViewWillEnter() {
    this.getCaregiverDetails();
  }
  
  getCaregiverDetails(){
    this.utilities.showLoading(this.utilities.translate("PLEASE_WAIT_LOADER"));  
    console.log(this.usertokenData);
      
    this.api.getCaregiverDetails(this.usertokenData).then((result) => {
        this.careGiverData = result['data'];      
          this.utilities.hideLoading();
     }, (err) => {        
        this.utilities.hideLoading();
        if(err.error.data && err.error.data.message){                   
            this.utilities.showAlert("error",err.error.data.message);
        }
    });
  }

  addUpdateCareGiverData(){
    this.utilities.showLoading(this.utilities.translate("PLEASE_WAIT_LOADER"));  
    this.api.addUpdateCareGiver(this.usertokenData, this.careGiverData).then((result) => {
      if(result && result['data']){
         this.careGiverData = result['data'];
      }
      setTimeout(() => {
        this.utilities.hideLoading();
        this.utilities.showToast(this.utilities.translate("DETAILS_SUBMITTED"), "top", "success");
      },150);

     }, (err) => {
      setTimeout(() => {
        this.utilities.hideLoading();
      },150);
        if(err.error.data && err.error.data.message){                   
            this.utilities.showAlert("error", err.error.data.message);
        }
    });  
  }


}
