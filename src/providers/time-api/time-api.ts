import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TimeApiProvider {

  private baseUrl: string = "http://api.geonames.org/timezoneJSON?";

  constructor(public http: HttpClient) {
    console.log('Hello TimeApiProvider Provider');
  }
  getTimezone(data){
    let lat = data.lat;
    let lng = data.lng;
    return this.http.get(`${this.baseUrl}lat=${lat}&lng=${lng}&username=upforcetech`);
  }
}
