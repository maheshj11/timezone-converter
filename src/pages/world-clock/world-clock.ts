import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { AlertController, IonicPage, ModalController, ToastController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import * as momenttz from 'moment-timezone';
// import { ReplacePipe } from '../../pipes/replace/replace';

@IonicPage()
@Component({
  selector: 'page-world-clock',
  templateUrl: 'world-clock.html',
})
export class WorldClockPage {
  listEmpty: boolean = false;
  dataIsPresent: boolean = false;
  worldClocks = [];
  city: any;
  timeUtc: any;
  interval: any;

  constructor(private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private alertCtrl:AlertController) {
    this.showsavedWorldClocks();
  }

  reorderItems(indexes) {
    let element = this.worldClocks[indexes.from];
    this.worldClocks.splice(indexes.from, 1);
    this.worldClocks.splice(indexes.to, 0, element);
    console.log(this.worldClocks);
    localStorage.setItem('savedWorldClocks', JSON.stringify(this.worldClocks));
    this.showsavedWorldClocks();
  }

  addNewTimezone() {
    let searchModal = this.modalCtrl.create(TabsPage);
    searchModal.present();
    searchModal.onDidDismiss(data => {
      if (typeof data !== "undefined") {
        this.city = data.data.location;
        if (typeof data.data.utc !== "undefined") {
          this.timeUtc = data.data.utc;
          this.saveTimeZone();
        }
        else {
          this.timeUtc = data.data.location;
          this.saveTimeZone();
        }
      }
    });
  }

  showsavedWorldClocks() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    let savedWorldClocks = JSON.parse(localStorage.getItem('savedWorldClocks')) || [];
    if (savedWorldClocks.length != 0) {
      this.interval = setInterval(() => {
        savedWorldClocks.forEach(element => {
          let time = momenttz.tz(element.timeUtc).format("hh:mm:ss a");
          let date = momenttz.tz(element.timeUtc).format("DD-MM-YYYY");
          element.time = time;
          element.date = date
        });
        this.worldClocks = savedWorldClocks;
      }, 1000)
    }
    else {
      this.worldClocks = [];
      this.listEmpty = true;
    }
  }

  saveTimeZone() {
    let savedWorldClocks = JSON.parse(localStorage.getItem('savedWorldClocks')) || [];
    this.listEmpty = false;
    let clockDetails = {
      city: this.city,
      timeUtc: this.timeUtc
    }
    if (savedWorldClocks.length != 0) {
      savedWorldClocks.forEach(element => {
        if (element.city === clockDetails.city && element.timeUtc === clockDetails.timeUtc) {
          this.dataIsPresent = true;
        }
      });
      if (!this.dataIsPresent) {
        savedWorldClocks.push(clockDetails);
        localStorage.setItem('savedWorldClocks', JSON.stringify(savedWorldClocks));
        this.showsavedWorldClocks();
        const toast = this.toastCtrl.create({
          message: 'TimeZone Added',
          duration: 2000,
          position: 'bottom'
        })
        toast.present();
      }
      else {
        this.dataIsPresent = false;
      }
    }
    else {
      savedWorldClocks.push(clockDetails);
      localStorage.setItem('savedWorldClocks', JSON.stringify(savedWorldClocks));
      this.showsavedWorldClocks();
      const toast = this.toastCtrl.create({
        message: 'TimeZone Added',
        duration: 2000,
        position: 'bottom'
      })
      toast.present();
    }
  }

  deleteItem(i) {
    const alert = this.alertCtrl.create({
      title: "Delete this WorldClock",
      message: "Do you want to delete this Clock?",
      buttons: [
        {
          text: 'No',
          role: 'Cancel',
          handler: () => { }
        },
        {
          text: 'YES',
          handler: () => {
            // let savedWorldClocks = JSON.parse(localStorage.getItem('savedWorldClocks')) || [];
            // savedWorldClocks.splice(i, 1);
            this.worldClocks.splice(i,1)
            localStorage.setItem('savedWorldClocks', JSON.stringify(this.worldClocks));
            if (this.worldClocks.length === 0) {
              this.listEmpty = true;
            }
            this.showsavedWorldClocks()
          }
        }
      ]
    });
    alert.present();
  }
}
