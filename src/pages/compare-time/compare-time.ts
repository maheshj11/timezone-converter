import { Component, ViewChild } from '@angular/core';
// import { ReplacePipe } from '../../pipes/replace/replace';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import { ReminderModalPage } from './../reminder-modal/reminder-modal';
import * as momenttz from 'moment-timezone';
import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-compare-time',
  templateUrl: 'compare-time.html',
})
export class CompareTimePage {

  timezoneList = []
  timezoneTimes: any;
  city: any;
  timeUtc: any;
  dataIsPresent: boolean = false;
  home_tz_startOfDateTime: any;
  selectedHomeTimeZone: any;
  homeIndex: any;
  currentTime: any;
  interval: any;
  divHeight: number;
  showTimeLine: boolean;
  listEmpty: boolean
  @ViewChild('scroll') scroll: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private actionCtrl: ActionSheetController) {
    this.displayTime();
    this.getHeight();
    // this.getCurrentTimeArray()
  }

  showCurrentTime() {
    setTimeout(() => {
      this.scroll._scrollContent.nativeElement.scrollLeft = this.currentTime - (this.scroll._scrollContent.nativeElement.offsetWidth / 2);
    }, 1000);
  }

  displayTime() {
    let compareTimeData = JSON.parse(localStorage.getItem('compareTimeData')) || [];
    if (compareTimeData.length === 0) {
      this.timezoneList = []
      this.listEmpty = true;
    }
    this.selectedHomeTimeZone = JSON.parse(localStorage.getItem('selectedHomeTimeZone'));
    this.homeIndex
    if (this.selectedHomeTimeZone) {
      this.homeIndex = this.selectedHomeTimeZone;
    }
    else {
      this.homeIndex = 0;
      localStorage.setItem('selectedHomeTimeZone', '0');
    }
    if (compareTimeData.length != 0) {
      let now = moment.utc();
      let home_tz_offset = momenttz.tz.zone(compareTimeData[this.homeIndex].timeUtc).utcOffset(now);
      this.showLiveTimeLine(compareTimeData[this.homeIndex].timeUtc);
      this.showCurrentTime();
      this.listEmpty = false;
      this.home_tz_startOfDateTime = momenttz.tz(compareTimeData[this.homeIndex].timeUtc).startOf('day').format();
      compareTimeData.forEach((element, i) => {
        let timeArray = [];
        let startTime;
        let date = momenttz.tz(this.home_tz_startOfDateTime, element.timeUtc).format("MMM DD");
        if (i === this.homeIndex) {
          startTime = 0
        } else {
          let time_tz_offset = momenttz.tz.zone(element.timeUtc).utcOffset(now);
          startTime = (home_tz_offset - time_tz_offset);
        }

        for (let step = 0; step < 24; step++) {
          if (i === this.homeIndex) {
            if (startTime >= 0 && startTime < 60) {
              timeArray.push({ date: date });
            }
            else {
              let time = moment().startOf('day').add(startTime, 'minutes').format('hh:mm a')
              let z = time.split(' ');
              let plainTime = z[0];
              let amPm = z[1];
              timeArray.push({ plainTime: plainTime, amPm: amPm });
            }
          }
          else {
            if (startTime >= 0 && startTime < 60) {
              if (step === 0) {
                timeArray.push({ date: date });
              }
              else {
                let plusDate = moment(date).add(1, 'd').format("MMM DD");
                timeArray.push({ date: plusDate });
              }
            }
            else {
              if (startTime >= 1440) {
                let newTime = startTime - 1440;
                startTime = 0 + newTime;
                let plusDate = moment(date).add(1, 'd').format("MMM DD");
                timeArray.push({ date: plusDate });
              }
              else {
                let time = moment().startOf('day').add(startTime, 'minutes').format('hh:mm a');
                let z = time.split(' ');
                let plainTime = z[0];
                let amPm = z[1];
                timeArray.push({ plainTime: plainTime, amPm: amPm });
              }
            }
          }
          startTime = startTime + 60;
        }
        element.times = timeArray;
      });
      this.timezoneList = compareTimeData;
    }
  }

  showLiveTimeLine(timeUtc) {
    let compareTimeData = JSON.parse(localStorage.getItem('compareTimeData')) || [];
    let newTimeData = compareTimeData
    this.timezoneTimes = [];
    if (this.interval) {
      clearInterval(this.interval);
    }
    setTimeout(() => {
      this.showTimeLine = true;
    }, 1000)
    this.interval = setInterval(() => {
      let currentTime = momenttz.tz(timeUtc);
      this.currentTime = (currentTime.hour() * 60) + currentTime.minute();
      newTimeData.forEach(element => {
        let time = momenttz.tz(element.timeUtc).format("hh:mm a");
        element.time = time;
      });
      this.timezoneTimes = newTimeData;
    }, 1000)
  }

  addNewTimezone(i) {
    let searchModal = this.modalCtrl.create(ModalPage);
    searchModal.present();
    searchModal.onDidDismiss(data => {
      if (typeof data !== "undefined") {
        this.city = data.data.location;
        if (typeof data.data.utc !== "undefined") {
          this.timeUtc = data.data.utc;
          this.saveTimeZone(i);
        }
        else {
          this.timeUtc = data.data.location;
          this.saveTimeZone(i);
        }
      }
    });
  }

  saveTimeZone(i) {
    let compareTimeData = JSON.parse(localStorage.getItem('compareTimeData')) || [];
    let clockDetails = {
      city: this.city,
      timeUtc: this.timeUtc
    }
    if (compareTimeData.length != 0) {
      compareTimeData.forEach(element => {
        if (element.city === clockDetails.city && element.timeUtc === clockDetails.timeUtc) {
          this.dataIsPresent = true;
        }
      });
      if (!this.dataIsPresent) {
        this.addToStorage(clockDetails, i);
      }
      else {
        this.dataIsPresent = false;
      }
    }
    else {
      this.addToStorage(clockDetails, i);
    }
  }

  addToStorage(clockDetails, i) {
    let compareTimeData = JSON.parse(localStorage.getItem('compareTimeData')) || [];
    if (i) {
      compareTimeData[i] = clockDetails;
      localStorage.setItem('compareTimeData', JSON.stringify(compareTimeData));
      this.displayTime();
    }
    else {
      compareTimeData.push(clockDetails);
      localStorage.setItem('compareTimeData', JSON.stringify(compareTimeData));
      this.displayTime();
      this.getHeight();
    }
  }

  openActionMenu(list, i) {
    const actionSheet = this.actionCtrl.create({
      title: "Actions",
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteItem(i)
          }
        },
        {
          text: 'Set as Home Timezone',
          handler: () => {
            this.markAsHome(list, i);
          }
        },
        {
          text: 'Change Location',
          handler: () => {
            this.addNewTimezone(i);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })
    actionSheet.present();
  }

  setReminderActionSheet(time, list, i) {
    let newTime;
    if (!time.plainTime) {
      newTime = "12:00 am"
    }
    else {
      newTime = `${time.plainTime} ${time.amPm}`
    }
    const actionSheet = this.actionCtrl.create({
      title: "What do you want to do",
      buttons: [
        {
          text: `Set Reminder at ${newTime}`,
          handler: () => {
            this.openReminderModal(newTime, list);
          }
        },
        {
          text: 'Set as Home Timezone',
          handler: () => {
            this.markAsHome(list, i);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })
    actionSheet.present();
  }

  openReminderModal(time, list) {
    let reminderModal = this.modalCtrl.create(ReminderModalPage, { time: time, list: list });
    reminderModal.present();
  }



  markAsHome(list, i) {
    localStorage.setItem('selectedHomeTimeZone', i);
    this.displayTime()
  }

  deleteItem(i) {
    let compareTimeData = JSON.parse(localStorage.getItem('compareTimeData')) || [];
    if (this.selectedHomeTimeZone === i) {
      const alert = this.alertCtrl.create({
        title: "Delete Home Timezone",
        message: "Do you want to delete your selected home Timezone?",
        buttons: [
          {
            text: 'No',
            role: 'Cancel',
            handler: () => { }
          },
          {
            text: 'YES',
            handler: () => {
              localStorage.removeItem('selectedHomeTimeZone');
              compareTimeData.splice(i, 1);
              localStorage.setItem('compareTimeData', JSON.stringify(compareTimeData));
              this.displayTime();
              this.getHeight()
            }
          }
        ]
      });
      alert.present();
    }
    else {
      if (this.selectedHomeTimeZone > i) {
        this.selectedHomeTimeZone = this.selectedHomeTimeZone - 1;
        localStorage.setItem('selectedHomeTimeZone', this.selectedHomeTimeZone);
      }
      compareTimeData.splice(i, 1);
      localStorage.setItem('compareTimeData', JSON.stringify(compareTimeData));
      this.displayTime();
      this.getHeight()
    }
  }

  getHeight() {
    let compareTimeData = JSON.parse(localStorage.getItem('compareTimeData')) || [];
    if (compareTimeData != 0) {
      let hgt = compareTimeData.length;
      this.divHeight = hgt * 65;
    }
    else {
      this.showTimeLine = false
    }
  }

  getHeightToDisplayTime(i) {
    let hgt;
    if(i === 0) {
      return hgt = 50;
    }
    else{
      let addValue = i * 15;
      i++
      return hgt = (i * 50)+ addValue;
    }
  }
}
