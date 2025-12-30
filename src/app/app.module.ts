import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HandlerInterceptor } from './Core/Interceptors/handler.interceptor';
import { PortalInterceptor } from './Core/Interceptors/portal.interceptor';
import { NavBarComponent } from './Shared/layouts/nav-bar/nav-bar.component';
import { SideBarComponent } from './Shared/layouts/side-bar/side-bar.component';
import { SharedModule } from './Shared/shared/shared.module';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    LoginComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: PortalInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HandlerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
