import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Options } from '../models/options';
import { Global } from '../global';

@Injectable()
export class SimuladorService {

  constructor(private http: HttpClient) { }
  private url = Global.url + 'simular';

  simular(options: Options){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(this.url, options, {responseType: 'text'});
  }

}
