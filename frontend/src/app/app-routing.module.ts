import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './_helpers/auth-guard';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './components/landing/landing.component';
import { SiteLayoutComponent } from './components/_layouts/site-layout/site-layout.component';
import { AppLayoutComponent } from './components/_layouts/app-layout/app-layout.component';


const routes: Routes = [
  // App routes: Logged in state
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dash', pathMatch: 'full'},
      { path: 'dash', component: DashboardComponent },
      
    ]
  },

  // Site routes: Logged out state
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: 'landing', component: LandingComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ]
  },

  { path: '**', redirectTo: 'dash'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
