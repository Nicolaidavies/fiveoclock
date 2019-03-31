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
  }

  public async loadCity() {
    const city = this.timeService.getCity();
    this.cityName = this.formatCityName(city.zoneName);
    this.countryName = city.countryName;
    try {
      const res = await this.locationService.getCoordinates(this.cityName, city.countryCode);
      // @ts-ignore
      this.featureCollection = res.features[0].geometry;

      this.map.flyTo({
        // @ts-ignore
        center: res.features[0].center,
        zoom: 9
      });
    } catch (e) {
      this.loadCity();
      console.log(e);
    }
  }

  public mapLoaded(map) {
    this.map = map;
    // @ts-ignore
    window.map = map;
    this.loadCity();
  }

  private formatCityName(zoneName: string): string {
    const parts = zoneName.split('/');
    return parts[parts.length - 1];
  }

  get apiKey () {
    return environment.mapboxKey;
  }
}
