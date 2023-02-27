import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@awesome-cordova-plugins/media-capture/ngx';
import { UtilitiesProvider } from '../../utilities/utilities';
import { Config } from '../../app.config';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage {
  progress: any = 0;
  uploadProgress: any = { "progress": 0 };
  showProgressBar: boolean = false;
  currentLanguage: any = "en";
  userData: any = {};
  usertokenData: any = {};

  constructor(public navCtrl: NavController, private mediaCapture: MediaCapture, private config: Config, public utilities: UtilitiesProvider, private androidPermissions: AndroidPermissions, private transfer: FileTransfer, public api: ApiService, private platform: Platform) {
    this.userData = this.utilities.getLocalObject("userData");
    this.usertokenData = { "userId": this.userData.user_id, "userToken": this.userData.token, "userCentreId": this.userData.centre_id };

    console.log("FeedbackPage() constructor");
  }

  uploadFeedbackVideo(file) {
    this.showProgressBar = true;
    //this.utilities.showLoading("Uploading Video.. Please wait...");

    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'video.mp4',
      chunkedMode: false,
      headers: {},
      params: { 'module_type': 'feedback_video' }
    }

    fileTransfer.onProgress((progressEvent: ProgressEvent) => {
      if (progressEvent.lengthComputable) {
        let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        this.progress = progress;
        this.uploadProgress.progress = this.progress;
        if (this.progress == 100) {
          this.showProgressBar = false;
          this.utilities.showAlert("success", this.utilities.translate("VIDEO_UPLOADED"));
        }
      }
    });

    fileTransfer.upload(file, this.config.imageUploadUrl, options)
      .then((data) => {
        if (data && data.response) {
          let responsedata = JSON.parse(data.response);
          this.showProgressBar = false;
          let feedbackVideoData = {
            "video_url": responsedata.data.save_path
          };
          this.api.uploadFeedbackVideos(this.usertokenData, feedbackVideoData).then((result) => {
            console.log(JSON.stringify(result, null, "\t"));
          }, (err) => {
            if (err.error.data && err.error.data.message) {
              this.utilities.showAlert("error", err.error.data.message);
            }
          });
        }
      }, (err) => {
        this.utilities.showAlert("error", this.utilities.translate("VIDEO_UPLOAD_ERROR"));
        return false;
      });
  }

  recordVideo() {
    if (this.platform.is('android')) {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
        result => {
        },
        err => this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.RECORD_AUDIO,
        this.androidPermissions.PERMISSION.RECORD_VIDEO
        ])
      );
    }

    let options: CaptureVideoOptions = { limit: 1, duration: 25 };
    this.mediaCapture.captureVideo(options)
      .then((data: MediaFile[]) => {
        if (data && data[0]['fullPath']) {
          this.uploadFeedbackVideo(data[0]['fullPath']);
        }
      }, (err: CaptureError) => {
      }
      );
  }



}
