import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckSymptomsPage } from './check-symptoms.page';

const routes: Routes = [
  {
    path: '',
    component: CheckSymptomsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckSymptomsPageRoutingModule {}
