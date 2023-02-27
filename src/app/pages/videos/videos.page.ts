import { Component, OnInit } from '@angular/core';
import { UtilitiesProvider } from '../../utilities/utilities';
import { ApiService } from '../../services/api.service';
import { IonRouterOutlet, ModalController, Platform } from '@ionic/angular';
import { VideoPlayerPage } from '../video-player/video-player.page';
// import { YoutubeVideoPlayer } from '@awesome-cordova-plugins/youtube-video-player/ngx';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage {
  userData: any = {};
  usertokenData: any = {};
  currentVideos: any = [];
  currentVideosChunked: any = [];
  currentTitle: string = null;
  currentLanguage: any = "en";
  videos: any = [];
  videosUrls: any = [];
  //public youtube: YoutubeVideoPlayer

  constructor(public utilities: UtilitiesProvider, public api: ApiService, public platform: Platform, public modalController: ModalController, private routerOutlet: IonRouterOutlet) {
    this.userData = this.utilities.getLocalObject("userData");
    this.usertokenData = { "userId": this.userData.user_id, "userToken": this.userData.token, "userCentreId": this.userData.centre_id };

  }

  getVideoUrls() {
    let getLocalLanguage = this.utilities.getLocalItem("currentLanguage");
    if (getLocalLanguage) {
      this.currentLanguage = getLocalLanguage;
    } else {
      this.currentLanguage = "en";
    }

    this.utilities.showLoading(this.utilities.translate("PLEASE_WAIT_LOADER"));
    this.api.getAllVideos(this.usertokenData).then((result) => {
      this.videosUrls = result['data'];

      this.videos = [
        {
          type: 'bedsore',
          title: this.utilities.translate('HOME_TIPS_BEDSORE_TITLE'),
          selected: false,
          icon: 'chevron-forward-outline',
          videos: [
            {
              video_code: "VID_VIDEO_1",
              title: this.utilities.translate('VIDEO_1'),
              video_id: this.videosUrls["VID_VIDEO_1"][this.currentLanguage] ? this.videosUrls["VID_VIDEO_1"][this.currentLanguage] : this.videosUrls["VID_VIDEO_1"]["en"]
            },
            {
              video_code: "VID_VIDEO_2",
              title: this.utilities.translate('VIDEO_2'),
              video_id: this.videosUrls["VID_VIDEO_2"][this.currentLanguage] ? this.videosUrls["VID_VIDEO_2"][this.currentLanguage] : this.videosUrls["VID_VIDEO_2"]["en"]
            },
            {
              video_code: "VID_VIDEO_3",
              title: this.utilities.translate('VIDEO_3'),
              video_id: this.videosUrls["VID_VIDEO_1"][this.currentLanguage] ? this.videosUrls["VID_VIDEO_3"][this.currentLanguage] : this.videosUrls["VID_VIDEO_3"]["en"]
            },
            {
              video_code: "VID_VIDEO_4",
              title: this.utilities.translate('VIDEO_4'),
              video_id: this.videosUrls["VID_VIDEO_4"][this.currentLanguage] ? this.videosUrls["VID_VIDEO_4"][this.currentLanguage] : this.videosUrls["VID_VIDEO_4"]["en"]
            },
            {
              video_code: "VID_VIDEO_5",
              title: this.utilities.translate('VIDEO_5'),
              video_id: this.videosUrls["VID_VIDEO_5"][this.currentLanguage] ? this.videosUrls["VID_VIDEO_5"][this.currentLanguage] : this.videosUrls["VID_VIDEO_5"]["en"]
            },
          ]
        },
        {
          type: 'feed_patient',
          title: this.utilities.translate('HOME_TIPS_FEED_PATIENT'),
          selected: false,
          icon: 'chevron-forward-outline',
          videos: [
            {
              video_code: "VID_HOME_TIPS_FEED_PATIENT",
              title: this.utilities.translate('HOME_TIPS_FEED_PATIENT'),
              video_id: this.videosUrls["VID_HOME_TIPS_FEED_PATIENT"][this.currentLanguage] ? this.videosUrls["VID_HOME_TIPS_FEED_PATIENT"][this.currentLanguage] : this.videosUrls["VID_HOME_TIPS_FEED_PATIENT"]["en"]
            },
          ]
        },
        {
          type: 'care_mouth',
          title: this.utilities.translate('HOME_TIPS_CARE_MOUTH_PATIENT'),
          selected: false,
          icon: 'chevron-forward-outline',
          videos: [
            {
              video_code: "VID_HOME_TIPS_CARE_MOUTH_PATIENT",
              title: this.utilities.translate('HOME_TIPS_CARE_MOUTH_PATIENT'),
              video_id: this.videosUrls["VID_HOME_TIPS_CARE_MOUTH_PATIENT"][this.currentLanguage] ? this.videosUrls["VID_HOME_TIPS_CARE_MOUTH_PATIENT"][this.currentLanguage] : this.videosUrls["VID_HOME_TIPS_CARE_MOUTH_PATIENT"]["en"]
            },
          ]
        },
        {
          type: 'urinary',
          title: this.utilities.translate('HOME_TIPS_URINARY_PATIENT'),
          selected: false,
          icon: 'chevron-forward-outline',
          videos: [
            {
              video_code: "VID_HOME_TIPS_URINARY_PATIENT",
              title: this.utilities.translate('HOME_TIPS_URINARY_PATIENT'),
              video_id: this.videosUrls["VID_HOME_TIPS_URINARY_PATIENT"][this.currentLanguage] ? this.videosUrls["VID_HOME_TIPS_URINARY_PATIENT"][this.currentLanguage] : this.videosUrls["VID_HOME_TIPS_URINARY_PATIENT"]["en"]
            },
          ]
        },
        {
          type: 'passive_range',
          title: this.utilities.translate('LIMB_EXERCISE_PASSIVE_RANGE'),
          selected: false,
          icon: 'chevron-forward-outline',
          videos: [
            {
              video_code: "VID_VIDEO_9",
              title: this.utilities.translate('VIDEO_9'),
              video_id: this.videosUrls["VID_VIDEO_9"][this.currentLanguage] ? this.videosUrls["VID_VIDEO_9"][this.currentLanguage] : this.videosUrls["VID_VIDEO_9"]["en"]
            },
            {
              video_code: "VID_VIDEO_10",
              title: this.utilities.translate('VIDEO_10'),
              video_id: this.videosUrls["VID_VIDEO_10"][this.currentLanguage] ? this.videosUrls["VID_VIDEO_10"][this.currentLanguage] : this.videosUrls["VID_VIDEO_10"]["en"]
            },
          ]
        },
        {
          type: 'active_range',
          title: this.utilities.translate('LIMB_EXERCISE_ACTIVE_RANGE'),
          selected: false,
          icon: 'chevron-forward-outline',
          videos: [
            {
              video_code: "VID_VIDEO_11",
              title: this.utilities.translate('VIDEO_11'),
              video_id: this.videosUrls["VID_VIDEO_11"][this.currentLanguage] ? this.videosUrls["VID_VIDEO_11"][this.currentLanguage] : this.videosUrls["VID_VIDEO_11"]["en"]
            },
            {
              video_code: "VID_VIDEO_12",
              title: this.utilities.translate('VIDEO_12'),
              video_id: this.videosUrls["VID_VIDEO_12"][this.currentLanguage] ? this.videosUrls["VID_VIDEO_12"][this.currentLanguage] : this.videosUrls["VID_VIDEO_12"]["en"]
            },
            {
              video_code: "VID_VIDEO_13",
              title: this.utilities.translate('VIDEO_13'),
              video_id: this.videosUrls["VID_VIDEO_13"][this.currentLanguage] ? this.videosUrls["VID_VIDEO_13"][this.currentLanguage] : this.videosUrls["VID_VIDEO_13"]["en"]
            },
          ]
        },
        {
          type: 'hand_wash',
          title: this.utilities.translate('HOME_TIPS_HAND_WASHING_TIPS'),
          selected: false,
          icon: 'chevron-forward-outline',
          videos: [
            {
              video_code: "VID_VIDEO_15",
              title: this.utilities.translate('VIDEO_15'),
              video_id: this.videosUrls["VID_VIDEO_15"][this.currentLanguage] ? this.videosUrls["VID_VIDEO_15"][this.currentLanguage] : this.videosUrls["VID_VIDEO_15"]["en"]
            },
            {
              video_code: "VID_VIDEO_16",
              title: this.utilities.translate('VIDEO_16'),
              video_id: this.videosUrls["VID_VIDEO_16"][this.currentLanguage] ? this.videosUrls["VID_VIDEO_16"][this.currentLanguage] : this.videosUrls["VID_VIDEO_16"]["en"]
            },
          ]
        },
      ];

      this.utilities.hideLoading();

    }, (err) => {
      this.utilities.hideLoading();

      if (err.error.data && err.error.data.message) {
        this.utilities.showAlert("error", err.error.data.message);
      }
    });
  }

  async openVideoPlayerModal(videoId) {
    const modal = await this.modalController.create({
      component: VideoPlayerPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      cssClass: 'my-custom-class',
      breakpoints: [0, 0.2, 0.5, 1],
      initialBreakpoint: 0.5,
      componentProps: {
        'videoId': videoId,
      }
    });
    return await modal.present();
  }

  ionViewWillEnter() {
    let getLocalLanguage = this.utilities.getLocalItem("currentLanguage");
    if (getLocalLanguage) {
      this.currentLanguage = getLocalLanguage;
    } else {
      this.currentLanguage = "en";
    }
    this.getVideoUrls();

    this.videos.forEach(element => {
      if (element.selected) {
        this.currentVideos = element.videos;
        this.currentTitle = element.title;
      }
    });
    this.currentVideosChunked = this.splitArrayIntoChunksOfLen(this.currentVideos, 2);
  }

  splitArrayIntoChunksOfLen(arr, len) {
    var chunks = [], i = 0, n = arr.length;
    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }
    return chunks;
  }

  showVideos(index) {
    if (this.videos[index]['selected']) {
      this.videos.forEach((element, index) => {
        this.videos[index]['selected'] = false;
        this.videos[index]['icon'] = "chevron-forward-outline";
      });
    } else {
      this.videos.forEach((element, index) => {
        this.videos[index]['selected'] = false;
        this.videos[index]['icon'] = "chevron-forward-outline";
      });
      this.videos[index]['selected'] = true;
      this.videos[index]['icon'] = "chevron-down-outline";
      this.currentVideos = this.videos[index]['videos'];
      this.currentVideosChunked = this.splitArrayIntoChunksOfLen(this.currentVideos, 2);
      this.currentTitle = this.videos[index]['title'];
    }
  }

  // Play Video
  playVideo(video) {
    this.openVideoPlayerModal(video.video_id)
    // this.platform.ready().then(() => {
    // console.log(video);
    // if (this.videosUrls[video.video_code][this.currentLanguage]) {
    //   this.youtube.openVideo(this.videosUrls[video.video_code][this.currentLanguage]);
    // } else {
    //   this.youtube.openVideo(this.videosUrls[video.video_code]["en"]);
    // }
    // });
  }

}
