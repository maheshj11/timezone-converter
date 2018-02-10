import { NotificationsPage } from './../pages/notifications/notifications';
import { CalculateTimeDifferencePage } from './../pages/calculate-time-difference/calculate-time-difference';
import { ViewChild, Component } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { WorldClockPage } from '../pages/world-clock/world-clock';
import { CompareTimePage } from '../pages/compare-time/compare-time';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { AppRate } from '@ionic-native/app-rate';
import { LaunchReview } from '@ionic-native/launch-review';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, icon: any, component: any }>;

  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen, private launchReview: LaunchReview,
    private admobFree: AdMobFree, private appRate: AppRate) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      /* AdMob Ads and App Rate*/
      if (platform.is('cordova')) {
        let counter = parseFloat(localStorage.getItem('counter'))
        if (counter && counter == 3) {
          // this.appRate.preferences.storeAppURL = {
          //   android: 'market://details?id=<com.utl.timeUtilities>'
          // };
          // this.appRate.promptForRating(true);
          this.launchReview.launch()
            .then(() => console.log('Successfully launched store app'));

          if (this.launchReview.isRatingSupported()) {
            this.launchReview.rating()
              .then(() => console.log('Successfully launched rating dialog'));
          }
          counter++;
          localStorage.setItem('counter', counter.toString())
        } else if (counter) {
          counter++;
          localStorage.setItem('counter', counter.toString())
        } else {
          counter = 1;
          localStorage.setItem('counter', counter.toString())
        }

        const bannerConfig: AdMobFreeBannerConfig = {
          // add your config here
          // for the sake of this example we will just use the test config
          id: 'ca-app-pub-2929781564932795/1735424200',
          isTesting: false,
          autoShow: true
        };
        this.admobFree.banner.config(bannerConfig);

        this.admobFree.banner.prepare()
          .then(() => {
            // banner Ad is ready
            // if we set autoShow to false, then we will need to call the show method here
          })
          .catch(e => console.log(e));
      }
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
    this.nav.setRoot(page.component);
  }
}

