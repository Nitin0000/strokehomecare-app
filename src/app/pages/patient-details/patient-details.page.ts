import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import {UtilitiesProvider} from '../../utilities/utilities';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.page.html',
  styleUrls: ['./patient-details.page.scss'],
})
export class PatientDetailsPage {
  userData: any = {}; 
  patientData: any = {};
  months_names: string = null;
  usertokenData: any= {};
  
  minDate: string = "";
  maxDate: string = "";

  constructor(public navCtrl: NavController, public translate: TranslateService, public authService: AuthService, public api: ApiService, public utilities: UtilitiesProvider, public alertCtrl: AlertController) { 
    this.userData = this.utilities.getLocalObject("userData");
    this.usertokenData = {"userId" : this.userData.user_id, "userToken" : this.userData.token, "userCentreId": this.userData.centre_id};  

    this.months_names = this.translate.instant("MONTHS");

    let dateToday = new Date();
    var futureDate = new Date(dateToday.getFullYear(),dateToday.getMonth(), dateToday.getDate());
    this.maxDate = futureDate.toISOString();
    this.minDate = new Date(2018,1,1).toISOString();
  }

  ionViewWillEnter() {
    this.getPatientDetails();
  }

  getPatientDetails(){
    this.utilities.showLoading(this.utilities.translate("PLEASE_WAIT_LOADER"));
    this.api.getPatientDetails(this.usertokenData).then((result) => {
        this.patientData = result['data'];
        this.utilities.hideLoading();    
     }, (err) => {
        this.utilities.hideLoading();    
        if(err.error.data && err.error.data.message){                   
            this.utilities.showAlert("error",err.error.data.message);
        }
    });
  }


  addUpdatePatientData(){
    this.utilities.showLoading(this.utilities.translate("PLEASE_WAIT_LOADER"));
    this.api.addUpdatePatient(this.usertokenData, this.patientData).then((result) => {
      if(result && result['data']){
         this.patientData = result['data'];
      }
      setTimeout(() => {
        this.utilities.hideLoading();
        this.utilities.showToast(this.utilities.translate("DETAILS_SUBMITTED"), "top", "success");
      },150);      
     }, (err) => {
      this.utilities.hideLoading();    
        if(err.error.data && err.error.data.message){                   
            this.utilities.showAlert("error",err.error.data.message);
        }
    });
  }

}
