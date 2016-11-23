import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { Thing } from '../models/thing';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ThingsService } from '../services/things';

const styles = require('./home.css');
const template = require('./home.html');

@Component({
  selector: 'home',
  template: template,
  styles: [ styles ]
})
export class Home implements OnInit {
  thingForm: FormGroup;

  things: Observable<Thing[]>;

  constructor(
    public router: Router,
    public http: Http,
    private thingsService: ThingsService,
    private formBuilder: FormBuilder
  ) {
    this.things = thingsService.getAll();
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.thingForm = this.formBuilder.group({
      name: ['', Validators.required],
      shape: ['', Validators.required],
      size: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });
  }

  editThing(thing: Thing) {
    this.thingForm.patchValue(thing);
  }

  putThing({ value, valid }: { value: Thing, valid: boolean }) {

    let thing = value;
    thing.size = parseInt(thing.size);

    console.log('creating thing', thing, '...');

    return this.thingsService.put(thing.name, thing).subscribe(status => {
      console.log('done creating thing');
      this.things = this.thingsService.getAll();
      this.thingForm.reset();
    });

  }

  deleteThing(id: string){
    console.log('deleting thing "' + id + '"...');
    return this.thingsService.delete(id).subscribe(status => {
      console.log('done deleting thing "' + id + '", refreshing...');
      this.things = this.thingsService.getAll();
    });
  }

}
