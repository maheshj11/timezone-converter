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

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WorldClockPage,
    ModalPage,
    CompareTimePage,
    ReminderModalPage,
    NotificationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications
  ]
})
export class AppModule {}
