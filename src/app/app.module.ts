import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { User, Api } from '../providers';
import { MyApp } from './app.component';
import { UtilProvider } from '../providers/util/util';
import {FCM} from "@ionic-native/fcm";
import {Facebook} from "@ionic-native/facebook";
import { SocialSharing } from '@ionic-native/social-sharing';
import { Stripe } from '@ionic-native/stripe';
import {PayPal} from "@ionic-native/paypal";
import { FirebaseProvider } from '../providers/firebase/firebase';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireModule} from "angularfire2";
import {File} from "@ionic-native/file";
import { GooglePlus } from '@ionic-native/google-plus';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
/*Mukesh account*/

export const firebaseConfig = {
  // apiKey: "AIzaSyAKGJ9h6aHhUgn-2UPirLg_X81HYs4imuU",
  // authDomain: "stage-b4398.firebaseapp.com",
  // databaseURL: "https://stage-b4398.firebaseio.com",
  // projectId: "stage-b4398",
  // storageBucket: "stage-b4398.appspot.com",
  // messagingSenderId: "731628973222",
  // appId: "1:731628973222:web:1c20eb23cbc2c587845867",
  // measurementId: "G-M0S5H6FRD3"
    apiKey: "AIzaSyAj0qkLVEgZ1Z4zUxMRCWJSpKHV6sK5mKw",
    authDomain: "stage-278ec.firebaseapp.com",
    databaseURL: "https://stage-278ec-default-rtdb.firebaseio.com",
    projectId: "stage-278ec",
    storageBucket: "stage-278ec.appspot.com",
    messagingSenderId: "685542641455",
    appId: "1:685542641455:web:8827a2198be30827a01bda",
    measurementId: "G-G6HL9DMTT2"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    FCM,
    Stripe,
    File,
    PayPal,
    GooglePlus,
    Facebook,
    SocialSharing,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UtilProvider,
    FirebaseProvider
  ]
})
export class AppModule { }
