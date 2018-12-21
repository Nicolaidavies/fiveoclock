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

  constructor(private timeService: TimeService) {
    const city = this.timeService.getCity();
    this.city = city;
  }

  ngOnInit() {
  }

}
