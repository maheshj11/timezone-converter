import { Component } from '@angular/core';
import { IonicPage, NavParams, ToastController, ViewController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment-timezone';
// import { ReplacePipe } from '../../pipes/replace/replace';

@IonicPage()
@Component({
  selector: 'page-reminder-modal',
  templateUrl: 'reminder-modal.html',
})
export class ReminderModalPage {

  location: any;
  reminderTime: any;
  reminderDate: any;
  title: any;
  reminderTimeZoneUtc: any;
  userTimezoneUtc: any;
  isInUpdate: boolean;
  reminderId: any;

  constructor(private navParams: NavParams,
    private viewCtrl: ViewController,
    private localNotifications: LocalNotifications,
    private toastCtrl: ToastController) {
    this.userTimezoneUtc = moment.tz.guess();
    let reminder = navParams.get('reminder');
    if (reminder) {
      this.isInUpdate = true;
      let time = moment.tz(reminder.dataTimeUnformated, reminder.dataUtc).format('hh:mm:ss a');
      this.reminderTime = moment(time, "hh:mm:ss a").format();
      let date = moment.tz(reminder.dataTimeUnformated, reminder.dataUtc).format('MM/DD/YYYY');
      this.reminderDate = moment(date, 'MM/DD/YYYY').format();
      this.location = reminder.dataLocation;
      this.reminderTimeZoneUtc = reminder.dataUtc;
      this.reminderId = reminder.reminderId;
      this.title = reminder.reminderTitle;
    }
    else {
      let time = navParams.get('time');
      this.reminderTime = moment(time, "hh:mm a").format();
      this.reminderDate = moment().format();
      let list = navParams.get('list');
      this.location = list.city;
      this.reminderTimeZoneUtc = list.timeUtc;
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  setReminder() {

    let formatedTime = moment(this.reminderTime).format('hh:mm:ss a');
    let formatedDate = moment(this.reminderDate).format('MM/DD/YYYY');
    let dateTime = formatedDate + ' ' + formatedTime;
    let time = moment(dateTime);
    let clonedTime = time.clone();
    clonedTime = clonedTime.tz(this.reminderTimeZoneUtc);
    clonedTime = clonedTime.add(time.utcOffset() - clonedTime.utcOffset(), 'minutes');
    let newTime = clonedTime.format();
    let timeZoneReminderTime = moment.tz(newTime, this.userTimezoneUtc).format();
    let currentTime = moment();
    if (moment(timeZoneReminderTime).isAfter(currentTime)) {
      this.localNotifications.schedule({
        id: this.reminderId || new Date().valueOf(),
        title: this.title,
        at: new Date(timeZoneReminderTime),
        data: { time: newTime, location: this.location, utc: this.reminderTimeZoneUtc || this.location }
      });
      this.viewCtrl.dismiss();
      const toast = this.toastCtrl.create({
        message: `Reminder set for ${moment(timeZoneReminderTime).format('MM/DD/YYYY')} at ${moment(timeZoneReminderTime).format('hh:mm a')}` ,
        duration: 2000,
        position: 'bottom'
      })
      toast.present();
    }
    else {
      const toast = this.toastCtrl.create({
        message: 'The selected time has already past',
        duration: 2000,
        position: 'bottom'
      })
      toast.present();
    }
  }
}
