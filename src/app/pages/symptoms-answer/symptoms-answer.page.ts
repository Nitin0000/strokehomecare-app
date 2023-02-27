import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Config } from '../../app.config';
import { UtilitiesProvider } from '../../utilities/utilities';
import { ApiService } from '../../services/api.service';
import { ActionSheetController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';


@Component({
  selector: 'app-symptoms-answer',
  templateUrl: './symptoms-answer.page.html',
  styleUrls: ['./symptoms-answer.page.scss'],
})
export class SymptomsAnswerPage {
  currentLanguage: string = null;
  currentSectionType: string= null;
  webUrl: any = "";

  userData: any = {}; 
  usertokenData: any= {};
  symptomsData: any = {};

  constructor(private route: ActivatedRoute , public utilities:  UtilitiesProvider, private config: Config,public api: ApiService,public actionSheetCtrl: ActionSheetController, private transfer: FileTransfer, private camera: Camera) {
    this.userData = this.utilities.getLocalObject("userData");
    this.usertokenData = {"userId" : this.userData.user_id, "userToken" : this.userData.token, "userCentreId": this.userData.centre_id};  
    this.webUrl = this.config.imageUploadsFolder;
  }

   ionViewWillEnter(){
    let getLocalLanguage = this.utilities.getLocalItem("currentLanguage"); 
    this.currentLanguage = getLocalLanguage;

    this.getSymptomsDetails();

    this.route.queryParams.subscribe(params => {
      if (params && params.type) {
        this.currentSectionType = params.type;
      }
    });
   }


  getSymptomsDetails(){
    this.utilities.showLoading(this.utilities.translate("PLEASE_WAIT_LOADER"));
    this.api.getPatientSymptoms(this.usertokenData).then((result) => {
        this.symptomsData = result['data'];
        console.log(this.symptomsData);
        
        setTimeout(() => {
          this.utilities.hideLoading();
        },150);  

     }, (err) => {
      this.utilities.hideLoading();    
        if(err.error.data && err.error.data.message){                   
            this.utilities.showAlert("error",err.error.data.message);
        }
    });
  }

  addUpdateSymptomsData(){
    this.utilities.showLoading(this.utilities.translate("PLEASE_WAIT_LOADER"));
    this.api.updatePatientSymptoms(this.usertokenData, this.symptomsData).then((result) => {
      if(result && result['data']){
         this.symptomsData = result['data'];
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

  async presentActionSheet() {
    let actionSheet = await this.actionSheetCtrl.create({
      header: this.utilities.translate("SYMPTOMS_UPLOAD_BEDSORE_IMAGE"),
      buttons: [
        {
          text: this.utilities.translate("SYMPTOMS_UPLOAD_PHOTOGALLERY"),
          handler: () => {
            this.presentPhotoGallery();
          }
        },
        {
          text: this.utilities.translate("SYMPTOMS_UPLOAD_CAMERA"),
          handler: () => {
            this.presentCamera();
          }
        },
        {
          text: this.utilities.translate("ALERT_CANCEL"),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  bedSoreImageUpload(file){
    this.utilities.showLoading(this.utilities.translate("PLEASE_WAIT_LOADER"));
    const fileTransfer: FileTransferObject = this.transfer.create();
     let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: 'image.jpg',
        headers: {},
        params: {'module_type' : 'bedsore_image'}
     }
     fileTransfer.upload(file, this.config.imageUploadUrl, options)
      .then((data) => {
          let imagedata = JSON.parse(data.response);
          this.symptomsData.bedsore_photo = imagedata.data.save_path;
          setTimeout(() => {
            this.utilities.hideLoading();
          },100);
      }, (err) => {
        setTimeout(() => {
          this.utilities.hideLoading();
        },100);
     });
 }
 
 
 presentPhotoGallery() {
     const options: CameraOptions = {
             sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
             destinationType: this.camera.DestinationType.FILE_URI,      
             quality: 80,
              targetWidth: 800,
              targetHeight: 600,
             encodingType: this.camera.EncodingType.JPEG,      
             correctOrientation: true,
             allowEdit: true
     }
     this.camera.getPicture(options).then((imageData) => {
           this.bedSoreImageUpload(imageData);
     }, (err) => {
      // Handle error
     });
 }
 
 presentCamera() {
     const options: CameraOptions = {
         sourceType: this.camera.PictureSourceType.CAMERA,
         destinationType: this.camera.DestinationType.FILE_URI,      
         quality: 80,
         targetWidth: 800,
         targetHeight: 600,
         encodingType: this.camera.EncodingType.JPEG,      
         correctOrientation: true,
         allowEdit: true
     }
     this.camera.getPicture(options).then((imageData) => {
           this.bedSoreImageUpload(imageData);
     }, (err) => {
      // Handle error
     });
 }

}
