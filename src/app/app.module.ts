import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, JsonpModule, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient, HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Compiler, Injectable } from '@angular/core';

// Client-side logging
import { ErrorHandler } from '@angular/core';

// Components
import { AppComponent } from './app.component';

// Modules
import { AppRoutingModule } from './/app-routing.module'

import * as $ from 'jquery';
import { D3DashboardModule } from './d3-dashboard/d3-dashboard.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'X-XSRF-TOKEN',
      headerName: 'RequestVerificationToken'
    }),
    JsonpModule,
    FormsModule,
    AppRoutingModule,
    D3DashboardModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    Compiler,
    {
      provide: XSRFStrategy,
      useValue: new CookieXSRFStrategy('X-XSRF-TOKEN', 'RequestVerificationToken')
    },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
