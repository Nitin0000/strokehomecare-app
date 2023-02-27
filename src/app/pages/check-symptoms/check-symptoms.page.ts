import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-check-symptoms',
  templateUrl: './check-symptoms.page.html',
  styleUrls: ['./check-symptoms.page.scss'],
})
export class CheckSymptomsPage{

  constructor(private router:  Router) { }

  gotoSymptomsAnswerPage(type){    
    let navigationExtras: NavigationExtras = { queryParams: {type: type} };
    this.router.navigate(['symptoms-answer'], navigationExtras);
  }
  
}
