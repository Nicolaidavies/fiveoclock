import { Component, OnInit } from '@angular/core';
import { IZone } from '../services/zones';
import { TimeService } from '../services/time.service';
import { LocationService } from '../services/location.service';
import { Map } from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.scss']
})
export class TimezoneComponent implements OnInit {
  map: Map;

  city: IZone;
  cityName: string;
  countryName: string;
  featureCollection: any;

  constructor(
    private timeService: TimeService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.loadCity();
  }

  public async loadCity() {
    const city = this.timeService.getCity();
    this.cityName = this.formatCityName(city.zoneName);
    this.countryName = city.countryName;
    try {
      const res = await this.locationService.getCoordinates(this.cityName, city.countryCode);
      console.log('res', res);
      // @ts-ignore
      this.featureCollection = res.features[0].geometry;
      console.log('this.featureCollection', this.featureCollection);
      // @ts-ignore
      window.map = this.map;
      console.log('this.map', this.map);

      this.map.flyTo({
        // @ts-ignore
        center: res.features[0].center,
        zoom: 9
      });
    } catch (e) {
      console.log(e);
    }
  }

  private formatCityName(zoneName: string): string {
    const parts = zoneName.split('/');
    return parts[parts.length - 1];
  }

  get apiKey () {
    return environment.mapboxKey;
  }
}
