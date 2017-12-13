// import { ReplacePipe } from '../pipes/replace/replace';
import { NotificationsPage } from './../pages/notifications/notifications';
import { ModalPage } from './../pages/modal/modal';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WorldClockPage } from '../pages/world-clock/world-clock';
import { CompareTimePage } from '../pages/compare-time/compare-time';
import { CalculateTimeDifferencePage } from './../pages/calculate-time-difference/calculate-time-difference';
import { ReminderModalPage } from '../pages/reminder-modal/reminder-modal';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { TabsPage } from '../pages/tabs/tabs';
import { GoogleSearchPage } from './../pages/google-search/google-search';
import { TimeApiProvider } from '../providers/time-api/time-api';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WorldClockPage,
    ModalPage,
    CompareTimePage,
    ReminderModalPage,
    NotificationsPage,
    CalculateTimeDifferencePage,
    TabsPage,
    GoogleSearchPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    Ng4GeoautocompleteModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WorldClockPage,
    ModalPage,
    CompareTimePage,
    ReminderModalPage,
    NotificationsPage,
    CalculateTimeDifferencePage,
    TabsPage,
    GoogleSearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    AdMobFree,
    TimeApiProvider,
    TimeApiProvider
  ]
})
export class AppModule {}
