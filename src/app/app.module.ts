import { AuthGuard } from './pages/guards/auth-guard.service';
import { LoaderInterceptor, HTTPStatus } from './interceptor/loader.interceptor';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import {FormsModule,  ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


const RxJS = [LoaderInterceptor, HTTPStatus];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    CommonModule,
    HttpClientModule,
    
    FormsModule,
    ReactiveFormsModule,


    NgxSpinnerModule
  ],
  providers: [
    AuthGuard,
    RxJS,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    provideAnimationsAsync(),],
  bootstrap: [AppComponent],
  exports:
  [
    CommonModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
