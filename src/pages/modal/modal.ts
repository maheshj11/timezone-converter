import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { TIMEZONES } from './../../timezone_data/timezone.data'

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  searchQuery: string = '';
  timezones = [];
  selectedZone: any;
  listEmpty: boolean = false;
  filterListArray: any[];
  filterSearch: boolean = false;
  count: number = 0;
  totalTimezones: number;

  constructor(public viewCtrl: ViewController) {
    this.initializeItems();
    this.initializeSearchItems()
  }
  closeModal() {
    this.viewCtrl.dismiss();
  }

  initializeSearchItems() {
    this.filterListArray = TIMEZONES;
    this.totalTimezones = TIMEZONES.length;
  }

  initializeItems() {
    for (let i = 0; i < 10; i++) {
      this.timezones.push(TIMEZONES[this.count]);
      this.count++
    }
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        if (this.count < this.totalTimezones) {
          this.timezones.push(TIMEZONES[this.count]);
          this.count++
        }
        else{
          this.listEmpty = true;
        }
      }
      infiniteScroll.complete();
    }, 500);
  }

  onInput(ev: any) {
    this.initializeSearchItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.filterSearch = true;
      this.filterListArray = this.filterListArray.filter((timezone) => {
        if (timezone.value.toLowerCase().indexOf(val.toLowerCase()) > -1
          || timezone.location.toLowerCase().indexOf(val.toLowerCase()) > -1
          || timezone.abbr.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        return false;
      })
    }
    else {
      this.filterSearch = false;
    }
  }

  selectedTimezone(timezone) {
    this.viewCtrl.dismiss({ data: timezone });
  }
  // checkUtc(utc,val) {
  // const filterUtc = utc.filter(element => element.toLowerCase().indexOf(val.toLowerCase()) > -1);
  // console.log(filterUtc);
  // return (filterUtc.length > 0) ? true : false;
  // }
}
