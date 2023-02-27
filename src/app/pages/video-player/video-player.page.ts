import { Component, Input, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.scss'],
})
export class VideoPlayerPage {
  @Input() videoId: string;
  videoUrl: any = null;
  trustedVideoUrl: SafeResourceUrl;

  constructor(private domSanitizer: DomSanitizer, private route: ActivatedRoute, public modalController: ModalController) { }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ionViewWillEnter() {
    this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.videoId);
  }

  handleIFrameLoadEvent() {

  }

}
