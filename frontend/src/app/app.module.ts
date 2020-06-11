import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FakeBackendInterceptor } from './_helpers/fake-backend';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import {
  MatMenuModule, MatButtonModule, MatSidenavModule,
  MatFormFieldModule, MatInputModule, MatAutocompleteModule
} from '@angular/material';
import { LandingComponent } from './components/landing/landing.component';
import { AppHeaderComponent } from './components/_headers/app-header/app-header.component';
import { SiteHeaderComponent } from './components/_headers/site-header/site-header.component';
import { AppLayoutComponent } from './components/_layouts/app-layout/app-layout.component';
import { SiteLayoutComponent } from './components/_layouts/site-layout/site-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    DashboardComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    SiteHeaderComponent,
    AppLayoutComponent,
    SiteLayoutComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
