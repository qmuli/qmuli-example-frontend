import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { ReactiveFormsModule } from '@angular/forms';

import { Home } from './home';
import { App } from './app';

import { routes } from './app.routes';
import { ThingsService } from './services/things';


@NgModule({
  bootstrap: [App],
  declarations: [
    Home, App
  ],
  imports: [
    HttpModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      routes, {
        useHash: true
      }
    )
  ],
  providers: [
    ...AUTH_PROVIDERS,
    ThingsService
  ]
})
export class AppModule {}
