import { ModalPage } from './../modal/modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GoogleSearchPage } from '../google-search/google-search';
import { Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root: any;
  tab2Root: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public viewCtrl: ViewController) {
    this.tab1Root = ModalPage
    this.tab2Root = GoogleSearchPage;

    events.subscribe('modal:closed', (data) => { 
      this.viewCtrl.dismiss(data);
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log(data);
    });
  }
  

}
