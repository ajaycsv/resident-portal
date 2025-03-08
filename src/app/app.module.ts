import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataService, InterceptorService, CommunicationService, AuthenticationService, AlertService } from './services/index';
import { AuthGuard } from './services/helpers/guards/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './modules/home/home.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './modules/main.module';
import { CookieModule } from 'ngx-cookie';
import { DirectiveModule} from '../app/directives/directives.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DirectiveModule,
    CookieModule.forRoot(),
    MainModule,
    ModalModule.forRoot(),
  ],
  providers: [DataService, CommunicationService, AuthenticationService, AuthGuard, AlertService, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  },{provide: LocationStrategy, useClass: HashLocationStrategy}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
