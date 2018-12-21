import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  public getCoordinates(city: string, countryCode: string) {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line
      this.httpClient.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?country=${countryCode}&access_token=${environment.mapboxKey}`)
        .subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }
}
