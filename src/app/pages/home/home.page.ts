import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilitiesProvider } from '../../utilities/utilities';
// import { YoutubeVideoPlayer } from '@awesome-cordova-plugins/youtube-video-player/ngx';
import { AlertController, IonRouterOutlet, MenuController, ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { NavigationExtras, Router } from '@angular/router';
import { VideoPlayerPage } from '../video-player/video-player.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  currentLanguage: any = "en";
  userData: any = {};
  usertokenData: any = {};
  checkPatientCareData: any = {};

  //private youtube: YoutubeVideoPlayer,
  constructor(public translate: TranslateService, public utilities: UtilitiesProvider, public alertCtrl: AlertController, public api: ApiService, private router: Router, public modalController: ModalController, private routerOutlet: IonRouterOutlet, private menuCtrl: MenuController) {
    this.userData = this.utilities.getLocalObject("userData");
    this.usertokenData = { "userId": this.userData.user_id, "userToken": this.userData.token, "userCentreId": this.userData.centre_id };
    this.checkIfHasAddedPatientCareGiverDetails();
  }


  openSideMenu() {
    this.menuCtrl.enable(true);
    this.menuCtrl.toggle();
  }

  checkIfHasAddedPatientCareGiverDetails() {
    this.api.checkIfHasAddedPatientCareGiverDetails(this.usertokenData).then((result) => {
      this.checkPatientCareData = result['data'];
    }, (err) => {
      if (err.error.data && err.error.data.message) {
        this.utilities.showAlert("error", err.error.data.message);
      }
    });
  }


  async openVideoPlayerModal(videoId) {
    const modal = await this.modalController.create({
      component: VideoPlayerPage,
      cssClass: 'my-custom-class',
      presentingElement: this.routerOutlet.nativeEl,
      breakpoints: [0, 0.2, 0.5, 1],
      initialBreakpoint: 0.5,
      componentProps: {
        'videoId': videoId,
      }
    });
    return await modal.present();
  }

  playStrokeVideo() {
    if (!this.checkPatientCareData.has_patient_details) {
      this.showAddPatientAlert();
      return false;
    }
    if (!this.checkPatientCareData.has_caregiver_details) {
      this.showAddCareGiverAlert();
      return false;
    }
    let getLocalLanguage = this.utilities.getLocalItem("currentLanguage");
    this.currentLanguage = getLocalLanguage;

    if (this.currentLanguage == "hi") {
      this.openVideoPlayerModal('LFLO6i5Y2cE');
      // let navigationExtras: NavigationExtras = { queryParams: { videoId: 'LFLO6i5Y2cE' } };
      // this.router.navigate(['video-player'], navigationExtras);
      // this.youtube.openVideo('LFLO6i5Y2cE');
    } else {
      this.openVideoPlayerModal('-PDM9I6MEcM');
      // let navigationExtras: NavigationExtras = { queryParams: { videoId: '-PDM9I6MEcM' } };
      // this.router.navigate(['video-player'], navigationExtras);
      // this.youtube.openVideo('-PDM9I6MEcM');
    }
  }

  // Show Add Patient Alert
  async showAddPatientAlert() {
    const alert = await this.alertCtrl.create({
      header: this.utilities.translate("ALERT_PATIENT_DETAILS"),
      message: this.utilities.translate("ALERT_PATIENT_DETAILS_DESC"),
      buttons: [
        {
          text: this.utilities.translate("ALERT_CANCEL"),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.utilities.translate("ALERT_ADD_PATIENT"),
          handler: () => {
            this.router.navigateByUrl("patient-details");
          }
        }
      ]
    });
    await alert.present();
  }

  // Show Add Caregiver Alert
  async showAddCareGiverAlert() {
    const alert = await this.alertCtrl.create({
      header: this.utilities.translate("ALERT_CAREGIVER_DETAILS"),
      message: this.utilities.translate("ALERT_CAREGIVER_DETAILS_DESC"),
      buttons: [
        {
          text: this.utilities.translate("ALERT_CANCEL"),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.utilities.translate("ALERT_ADD_CAREGIVER"),
          handler: () => {
            this.router.navigateByUrl("caregiver-details");
          }
        }
      ]
    });
    await alert.present();
  }

  gotoSymptomsPage() {
    if (!this.checkPatientCareData.has_patient_details) {
      this.showAddPatientAlert();
      return false;
    }
    if (!this.checkPatientCareData.has_caregiver_details) {
      this.showAddCareGiverAlert();
      return false;
    }
    this.router.navigateByUrl("check-symptoms");
  }

  gotoVideosPage() {
    this.router.navigateByUrl("videos");
  }

  gotoFeedbackPage() {
    this.router.navigateByUrl("feedback");
  }

}
