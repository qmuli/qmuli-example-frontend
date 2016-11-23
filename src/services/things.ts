import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Thing} from '../models/thing';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class ThingsService {

  private thingsApiUrl = 'https://gliqqtz1pi.execute-api.us-east-1.amazonaws.com/v1/things';

  constructor(private http: Http) {  }

  getAll(): Observable<Thing[]> {
    return this.http.get(this.thingsApiUrl)
      .map((res:Response) => {
        let data = res.json();
        console.log('got response:', JSON.stringify(data));
        return data;
      })
      //...errors if any
      .catch((err: any) => {
        console.log('Error:', err);
      });
  }

  get(id: string): Observable<Thing> {
    let url = this.thingsApiUrl + '/' + id;
    return this.http.get(url)
      .map((res:Response) => {
        let data = res.json();
        console.log('got response:', JSON.stringify(data));
        return data;
      })
      //...errors if any
      .catch((err: any) => {
        console.log('Error:', err);
      });
  }

  put(id: string, thing: Thing): Observable<{}> {
    let url = this.thingsApiUrl + '/' + id;
    return this.http.post(url, thing)
      .map((res:Response) => {
        let data = res.json();
        console.log('got response:', JSON.stringify(data));
        return data;
      })
      //...errors if any
      .catch((err: any) => {
        console.log('Error:', err);
        return [];
      });
  }

  delete(id: string): Observable<{}> {
    let url = this.thingsApiUrl + '/' + id;
    return this.http.delete(url)
      .map((res: Response) => {
        let data = res.json();
        console.log('got response:', JSON.stringify(data));
      })
      //...errors if any
      .catch((err :any) => {
        console.log('Error:', err);
        return [];
      });
  }


}
