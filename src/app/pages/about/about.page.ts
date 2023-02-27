import { Component, OnInit } from '@angular/core';
import {UtilitiesProvider} from '../../utilities/utilities';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage{
  currentLanguage: any = "en";
  userData: any = {}; 

  constructor(public utilities: UtilitiesProvider,) {
    this.userData = this.utilities.getLocalObject("userData");
   }


  ionViewWillEnter(){
    let getLocalLanguage = this.utilities.getLocalItem("currentLanguage"); 
    this.currentLanguage = getLocalLanguage;
  }

}
