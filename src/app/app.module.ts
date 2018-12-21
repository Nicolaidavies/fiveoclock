import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { TimezoneComponent } from './timezone/timezone.component';
import { HttpClientModule } from '@angular/common/http';

const materialModules = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    AppComponent,
    TimezoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    HttpClientModule,
    ...materialModules,
    NgxMapboxGLModule.withConfig({
      // TODO: remove
      accessToken: 'pk.eyJ1Ijoibmljb2xhaWRhdmllcyIsImEiOiJjanB5MTV0MWowcXIyNDNwcXUxc2J1Ynd3In0.5Hi1jYwcN1DD9WFb7KL2LA',
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
