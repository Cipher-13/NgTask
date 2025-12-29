import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HandlerInterceptor } from './Core/Interceptors/handler.interceptor';
import { PortalInterceptor } from './Core/Interceptors/portal.interceptor';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
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
