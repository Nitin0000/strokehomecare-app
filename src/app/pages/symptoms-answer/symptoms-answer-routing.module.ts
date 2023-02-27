import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SymptomsAnswerPage } from './symptoms-answer.page';

const routes: Routes = [
  {
    path: '',
    component: SymptomsAnswerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SymptomsAnswerPageRoutingModule {}
