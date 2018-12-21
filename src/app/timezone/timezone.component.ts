import { Component, OnInit } from '@angular/core';
import { IZone } from '../services/zones';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.scss']
})
export class TimezoneComponent implements OnInit {

  city: IZone;
  cityName: string;
  countryName: string;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.loadCity();
  }

  public loadCity() {
    const city = this.timeService.getCity();
    this.cityName = this.formatCityName(city.zoneName);
    this.countryName = city.countryName;
  }

  private formatCityName(zoneName: string): string {
    const parts = zoneName.split('/');
    return parts[parts.length - 1];
  }
}
