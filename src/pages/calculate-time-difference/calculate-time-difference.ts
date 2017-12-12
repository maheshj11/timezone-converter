import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-calculate-time-difference',
  templateUrl: 'calculate-time-difference.html',
})
export class CalculateTimeDifferencePage {

  time1: any;
  date1: any;
  time2: any;
  date2: any;
  isAfter: boolean;
  hours: any;
  minutes: any;
  seconds: any;
  days: any;
  years: any;
  weekAndDays: any;
  inSeconds: any;
  inMinutes: any;
  inHours: any;
  inDays: any;
  inWeeks: any;
  inYears: any;
  yearAndDay: any;
  months: any;
  dday: any;
  yyear: any;
  showResultCards: boolean;
  hideAltUnits: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.time1 = this.time2 = this.date1 = this.date2 = moment().format();
  }

  setCurrentDate(selectedDate) {
    if(selectedDate === 'date1'){
      this.date1 = moment().format();
    }
    else{
      this.date2 = moment().format();
    }
  }
  setCurrentTime(selectedTime) {
    if(selectedTime === 'time1'){
      this.time1 = moment().format();
    }
    else{
      this.time2 = moment().format();
    }
  }

  setStartOfDayTime(selectedTime){
    if(selectedTime === 'time1'){
      this.time1 = moment().startOf('day').format();
    }
    else{
      this.time2 = moment().startOf('day').format();
    }
  }

  setNoonTime(selectedTime){
    if(selectedTime === 'time1'){
      let a = moment("12", "hh:mm:ss a");
      this.time1 = moment(a).format();
    }
    else{
      let a = moment("12", "hh:mm:ss a");
      this.time2 = moment(a).format();
    }
  }
  calculateTime() {
    let formatedTime1 = moment(this.time1).format('hh:mm:ss a');
    let formatedDate1 = moment(this.date1).format('MM/DD/YYYY');
    let formatedTime2 = moment(this.time2).format('hh:mm:ss a');
    let formatedDate2 = moment(this.date2).format('MM/DD/YYYY');
    let time1 = moment(formatedDate1 + ' ' + formatedTime1);
    let time2 = moment(formatedDate2 + ' ' + formatedTime2);
    if (moment(time1).isSame(time2)) {
      this.hideAltUnits = true;
    }
    else {
      this.hideAltUnits = false
    }
    let checkIsAfter = moment(time1).isAfter(time2);
    if (checkIsAfter) {
      this.isAfter = true;
      let duration = moment.duration(time1.diff(time2));
      this.getTimeDifference(duration);
    }
    else {
      this.isAfter = false;
      let duration = moment.duration(time2.diff(time1));
      this.getTimeDifference(duration);
    }
  }

  getTimeDifference(duration) {
    this.showResultCards = true;
    let month = duration.months();
    if (month != 0) {
      if (month > 1) {
        this.months = `${month} months`;
      }
      else {
        this.months = `${month} month`;
      }
    }
    else {
      this.months = 0;
    }
    let checkDay = duration.days();
    if (checkDay != 0) {
      if (checkDay === 0 || checkDay > 1) {
        this.dday = `${checkDay} days`;
      }
      else {
        this.dday = `${checkDay} day`;
      }
    }
    else {
      this.dday = 0;
    }
    let checkYear = duration.years();
    if (checkYear != 0) {
      if (checkYear > 1) {
        this.yyear = `${checkYear} years`;
      }
      else {
        this.yyear = `${checkYear} year`;
      }
    }
    else {
      this.yyear = 0;
    }
    let days = duration.asDays();
    days = Math.floor(days);
    if (days === 0) {
      this.days = 0;
    }
    else if (days > 1) {
      this.days = `${days} days`
    }
    else {
      this.days = `${days} day`
    }
    let hours = duration.hours();
    if (hours === 0 || hours > 1) {
      this.hours = `${hours} hours`
    }
    else {
      this.hours = `${hours} hour`
    }
    let minutes = duration.minutes();
    if (minutes === 0 || minutes > 1) {
      this.minutes = `${minutes} minutes`
    }
    else {
      this.minutes = `${minutes} minute`
    }
    let seconds = duration.seconds();
    if (seconds === 0 || seconds > 1) {
      this.seconds = `${seconds} seconds`
    }
    else {
      this.seconds = `${seconds} second`
    }
    let inSeconds = duration.asSeconds();
    if (inSeconds >= 1) {
      inSeconds = Math.floor(inSeconds);
      this.inSeconds = inSeconds;
    }
    else{
      this.inSeconds = 0;
    }
    let inMinutes = duration.asMinutes();
    if (inMinutes >= 1) {
      inMinutes = Math.floor(inMinutes);
      this.inMinutes = inMinutes;
    }
    else{
      this.inMinutes = 0;
    }
    let inHours = duration.asHours();
    if (inHours >= 1) {
      inHours = Math.floor(inHours);
      this.inHours = inHours;
    }
    else {
      this.inHours = 0;
    }
    let inDays = duration.asDays();
    if (inDays >= 1) {
      inDays = Math.floor(inDays);
      this.inDays = inDays;
    }
    else{
      this.inDays = 0;
    }
    let inWeeks = duration.asWeeks();
    if (inWeeks >= 1) {
      inWeeks = Math.floor(inWeeks);
      this.inWeeks = inWeeks;
    }
    else{
      this.inWeeks = 0;
    }
    let inYears = duration.asYears();
    if (inYears != 0) {
      let y = inYears * 100;
      let x = y.toFixed(2);
      this.inYears = x;
    }
  }
}
