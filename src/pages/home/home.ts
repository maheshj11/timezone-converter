import { TabsPage } from './../tabs/tabs';
// import { ReplacePipe } from '../../pipes/replace/replace';
import { ReminderModalPage } from './../reminder-modal/reminder-modal';
import { Component } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import * as momenttz from 'moment-timezone';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  time1: any;
  time2: any;
  city1: any;
  city2: any;
  dataIsPresent: boolean = false;
  favouritesData: any[];
  time1utc: any;
  time2utc: any;
  clickedTime: boolean = false;
  listEmpty: boolean = false;
  checkDifference: any;
  hrs: any;
  mins: any;
  dateIsDifferent: boolean = false;
  dateDifferenceIs: any;
  sameTimezone: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.time1utc = momenttz.tz.guess();
    this.time2utc = "America/New_York";
    this.time1 = momenttz.tz(this.time1utc).format();
    this.time2 = momenttz.tz(this.time2utc).format();
    this.city1 = "Asia/Kolkata";
    this.city2 = "America/New_York";
    this.showFavourites()
    this.calculateTimeDifference()
  }
  openModal1() {
    let searchModal = this.modalCtrl.create(TabsPage);
    searchModal.present();
    searchModal.onDidDismiss(data => {
      if (typeof data !== "undefined") {
        this.city1 = data.data.location;
        if (typeof data.data.utc !== "undefined") {
          this.time1utc = data.data.utc;
          setTimeout(() => {
            this.getTime1();
          },500)
        }
        else {
          this.time1utc = data.data.location;
          setTimeout(() => {
            this.getTime1();
          },500)
        }
      }
    });
  }

  openModal2() {
    let searchModal = this.modalCtrl.create(TabsPage);
    searchModal.present();
    searchModal.onDidDismiss(data => {
      if (typeof data !== "undefined") {
        this.city2 = data.data.location;
        if (typeof data.data.utc !== "undefined") {
          this.time2utc = data.data.utc;
          setTimeout(() => {
            this.getTime2();
          },500)
        }
        else {
          this.time2utc = data.data.location;
          setTimeout(() => {
            this.getTime2();
          },500)
        }
      }
    });
  }

  getTime2() {
    if (!this.clickedTime) {
      this.clickedTime = true;
      this.time2 = momenttz.tz(this.time1, this.time2utc).format();
      let a = momenttz.tz(this.time1, this.time1utc).format("YYYY-MM-DD");
      let b = momenttz.tz(this.time2, this.time2utc).format("YYYY-MM-DD");
      if (!moment(a).isSame(b)) {
        this.dateIsDifferent = true;
        let isBef = moment(a).isBefore(b);
        if (isBef) {
          this.dateDifferenceIs = "of next day"
        }
        else {
          this.dateDifferenceIs = "of prev day"
        }
      }
      else {
        this.dateIsDifferent = false;
      }
      this.calculateTimeDifference();
    }
    else {
      this.clickedTime = false;
    }
  }
  getTime1() {
    if (!this.clickedTime) {
      this.clickedTime = true;
      this.time1 = momenttz.tz(this.time2, this.time1utc).format();
      let a = momenttz.tz(this.time1, this.time1utc).format("YYYY-MM-DD");
      let b = momenttz.tz(this.time2, this.time2utc).format("YYYY-MM-DD");
      if (!moment(a).isSame(b)) {
        this.dateIsDifferent = true;
        let isBef = moment(a).isBefore(b);
        if (isBef) {
          this.dateDifferenceIs = "of next day"
        }
        else {
          this.dateDifferenceIs = "of prev day"
        }
      }
      else {
        this.dateIsDifferent = false;
      }
      this.calculateTimeDifference();
    }
    else {
      this.clickedTime = false;
    }
  }

  calculateTimeDifference() {
    let now = moment.utc();
    let time1_tz_offset = momenttz.tz.zone(this.time1utc).utcOffset(now);
    let time2_tz_offset = momenttz.tz.zone(this.time2utc).utcOffset(now);
    let difference = (time1_tz_offset - time2_tz_offset);
    if (difference === 0) {
      this.sameTimezone = true;
    } else {
      if (difference > 0) {
        this.checkDifference = "behind"
      }
      else {
        this.checkDifference = "ahead of"
      }
      difference = Math.abs(difference);
      let tempTime = moment.duration(difference, 'minutes');
      this.hrs = tempTime.hours()
      this.mins = tempTime.minutes()
    }
  }


  addToFavourites() {
    let favouriteData = {
      city1: this.city1,
      time1utc: this.time1utc,
      time1: this.time1,
      city2: this.city2,
      time2utc: this.time2utc,
      time2: this.time2
    }
    let favouritesData = JSON.parse(localStorage.getItem('favouritesData')) || [];
    if (favouritesData.length != 0) {
      favouritesData.forEach(element => {
        if (element.time1utc === this.time1utc && element.time2utc === this.time2utc && element.time1 === this.time1 && element.time2 === this.time2 && element.city1 === this.city1 && element.city2 === this.city2) {
          this.dataIsPresent = true;
        }
      });
      if (!this.dataIsPresent) {
        this.addToStorage(favouritesData, favouriteData);
      }
      else {
        this.dataIsPresent = false;
      }
    }
    else {
      this.addToStorage(favouritesData, favouriteData);
    }
  }

  addToStorage(favouritesData, favouriteData) {
    favouritesData.push(favouriteData);
    localStorage.setItem('favouritesData', JSON.stringify(favouritesData));
    this.showFavourites();
    this.listEmpty = false;
    const toast = this.toastCtrl.create({
      message: 'Timezone Successfully Added to favourites',
      duration: 2000,
      position: 'bottom'
    })
    toast.present();
  }

  setTime(index) {
    let favouritesData = JSON.parse(localStorage.getItem('favouritesData')) || [];
    favouritesData.forEach((element, i) => {
      if (index === i) {
        this.city1 = element.city1
        this.time1utc = element.time1utc
        this.time1 = element.time1
        this.city2 = element.city2
        this.time2utc = element.time2utc
        this.time2 = element.time2
      }
    });
  }

  showFavourites() {
    let favouritesData = JSON.parse(localStorage.getItem('favouritesData')) || [];
    if (favouritesData.length != 0) {
      favouritesData.forEach(element => {
        element.time1 = momenttz.tz(element.time1, element.time1utc).format('h:mm a');
        element.time2 = momenttz.tz(element.time2, element.time2utc).format('h:mm a');
      })
      this.favouritesData = favouritesData;
    }
    else {
      this.favouritesData = [];
      this.listEmpty = true;
    }
  }

  addToReminders() {
    const alert = this.alertCtrl.create({
      title: "Set Reminder",
      message: "Set reminder for timezone to which you compared",
      buttons: [
        {
          text: 'No',
          role: 'Cancel',
          handler: () => { }
        },
        {
          text: 'YES',
          handler: () => {
            let list = {
              city: this.city2,
              timeUtc: this.time2utc
            }
            let time = momenttz.tz(this.time2, this.time2utc).format('h:mm a');
            let reminderModal = this.modalCtrl.create(ReminderModalPage, { time: time, list: list });
            reminderModal.present();
          }
        }
      ]
    });
    alert.present();
  }

  deleteItem(i) {
    const alert = this.alertCtrl.create({
      title: "Delete Favourite Timezone",
      message: "Do you want to delete this Saved Timezone?",
      buttons: [
        {
          text: 'No',
          role: 'Cancel',
          handler: () => { }
        },
        {
          text: 'YES',
          handler: () => {
            let favouritesData = JSON.parse(localStorage.getItem('favouritesData')) || [];
            favouritesData.splice(i, 1);
            localStorage.setItem('favouritesData', JSON.stringify(favouritesData));
            if (favouritesData.length === 0) {
              this.listEmpty = true;
            }
            this.showFavourites()
          }
        }
      ]
    });
    alert.present();
  }
}
