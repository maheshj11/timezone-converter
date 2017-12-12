import { NotificationsPage } from './../pages/notifications/notifications';
import { CalculateTimeDifferencePage } from './../pages/calculate-time-difference/calculate-time-difference';
import { ViewChild, Component } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { WorldClockPage } from '../pages/world-clock/world-clock';
import { CompareTimePage } from '../pages/compare-time/compare-time';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  pages: Array<{title: string,icon: any, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'World-Clock', icon: 'time', component: WorldClockPage },
      { title: 'Compare-Time', icon: 'clock', component: CompareTimePage },
      { title: 'Time-Calculator', icon: 'calculator', component: CalculateTimeDifferencePage },
      { title: 'Reminders', icon: 'notifications', component: NotificationsPage }
    ];
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

