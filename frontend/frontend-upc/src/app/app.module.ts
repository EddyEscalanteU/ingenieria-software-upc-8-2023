import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy  } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { TokenInterceptorService } from './servicios-backend/tokenInterceptor/token-interceptor.service';
// import {JwtHelperService} from '@auth0'



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule],
  providers: [Storage,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //token interseptor
    {provide: HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
