import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { StorageService } from './providers/storage/storage.service';
import { BackendApiProvider } from './providers/backend-api/backend-api.service';
import { IonicStorageModule } from '@ionic/storage-angular';

/*
import { Storage } from '@ionic/storage';
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Modal Pages
import { ImagePageModule } from './pages/modal/image/image.module';
import { SearchFilterPageModule } from './pages/modal/search-filter/search-filter.module';


// Components
import { NotificationsComponent } from './components/notifications/notifications.component';

import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [AppComponent, NotificationsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ImagePageModule,
    SearchFilterPageModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }), 
    QRCodeModule,
    /*
    Storage,
    IonicStorageModule.forRoot({
      driverOrder: [Drivers.SecureStorage, Drivers.IndexedDB, Drivers.LocalStorage]
    })
    */
  ],
  entryComponents: [NotificationsComponent],
  providers: [Geolocation,
    StatusBar,
    SplashScreen, 
    BarcodeScanner,
    { provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy },
      
      BackendApiProvider,
      StorageService,
      
    ],
  bootstrap: [AppComponent],
})
export class AppModule { }
