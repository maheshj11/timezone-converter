import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular/util/events';
import { TimeApiProvider } from '../../providers/time-api/time-api';


@IonicPage()
@Component({
  selector: 'page-google-search',
  templateUrl: 'google-search.html',
})
export class GoogleSearchPage {

  city: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private timeApiProvider: TimeApiProvider) {
  }

  closeModal() {
    this.events.publish('modal:closed');
  }
  
  autoCompleteCallback1(selectedData: any) {
    this.city = selectedData.data.name;
    let coordinates = selectedData.data.geometry.location;
    this.timeApiProvider.getTimezone(coordinates).subscribe((data: any) => {
      let locationData = {
        location: this.city,
        utc: data.timezoneId
      }
      this.events.publish('modal:closed', { data: locationData });
    })
  }

}
