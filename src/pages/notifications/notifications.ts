import { ReminderModalPage } from './../reminder-modal/reminder-modal';
// import { ReplacePipe } from '../../pipes/replace/replace';
import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, ModalController, NavController, NavParams, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment-timezone';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  reminders = [];
  noReminders: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private localNotifications: LocalNotifications,
    private platform: Platform,
    private actionCtrl: ActionSheetController,
    private modalCtrl: ModalController) {
    this.getAllReminders()
  }

  getAllReminders() {
    debugger
    this.reminders = [];
    if (this.platform.is('cordova')) {
      this.localNotifications.getAll().then((data) => {
        if(data.length === 0) {
          this.noReminders = true;
        }
        data.map(reminder => {
          let json = JSON.parse(reminder.data);
          let time = reminder.trigger.at;
          let formatedUserTime = moment(time).format('MM/DD/YYYY hh:mm a');
          let formatedUtcTime = moment.tz(json.time, json.utc).format('MM/DD/YYYY hh:mm a');
          const reminderData: {} = {
            dataTimeUnformated: json.time,
            dataTimeFormated: formatedUtcTime,
            dataLocation: json.location,
            dataUtc: json.utc,
            reminderTitle: reminder.title || "No title available",
            reminderTime: formatedUserTime,
            reminderId: reminder.id
          }
          this.reminders.push(reminderData);
        })
      })
    }
  }

  openActionSheet(reminder) {
    const actionSheet = this.actionCtrl.create({
      title: "Actions",
      buttons: [
        {
          text: 'Delete Reminder',
          role: 'destructive',
          handler: () => {
            this.deleteItem(reminder)
          }
        },
        {
          text: 'Edit Reminder',
          handler: () => {
            this.editTimezone(reminder);
          }
        },
        {
          text: 'Delete All',
          handler: () => {
            this.deleteAll();
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

  deleteAll() {
    debugger
    this.localNotifications.getAll().then((data) => {
      data.map(reminder => {
        this.localNotifications.clear(reminder.id)
      })
      this.getAllReminders();
      this.noReminders = true;
    })
  }

  deleteItem(reminder) {
    this.localNotifications.clear(reminder.reminderId).then(() => {
      this.getAllReminders()
    })
  }

  editTimezone(reminder) {
    let reminderModal = this.modalCtrl.create(ReminderModalPage, { reminder: reminder });
    reminderModal.present();
    reminderModal.onDidDismiss(() => {
      this.getAllReminders()
    })
  }
}
