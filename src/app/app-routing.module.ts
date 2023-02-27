import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'no-internet',
    loadChildren: () => import('./pages/no-internet/no-internet.module').then(m => m.NoInternetPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'patient-details',
    loadChildren: () => import('./pages/patient-details/patient-details.module').then(m => m.PatientDetailsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'caregiver-details',
    loadChildren: () => import('./pages/caregiver-details/caregiver-details.module').then(m => m.CaregiverDetailsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'feedback',
    loadChildren: () => import('./pages/feedback/feedback.module').then(m => m.FeedbackPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'check-symptoms',
    loadChildren: () => import('./pages/check-symptoms/check-symptoms.module').then(m => m.CheckSymptomsPageModule)
  },
  {
    path: 'symptoms-answer',
    loadChildren: () => import('./pages/symptoms-answer/symptoms-answer.module').then(m => m.SymptomsAnswerPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'videos',
    loadChildren: () => import('./pages/videos/videos.module').then(m => m.VideosPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'video-player',
    loadChildren: () => import('./pages/video-player/video-player.module').then(m => m.VideoPlayerPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
