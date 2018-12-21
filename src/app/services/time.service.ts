import { Injectable } from '@angular/core';
import moment from 'moment-timezone';
import { IZone, zones } from './zones';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  public getCity() {
    const cities = this.getCitites();
    console.log('cities', cities);
    const index = this.getRandomInt(0, cities.length - 1);
    return cities[index];
  }

  private getCitites(): IZone[] {
    return zones.filter(this.isFive);
  }

  private isFive(zone: IZone): boolean {
    const timeString = moment().tz(zone.zoneName).format('ha');
    return timeString === '5pm';
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
