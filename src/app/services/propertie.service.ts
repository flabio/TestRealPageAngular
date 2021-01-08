import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, delay } from 'rxjs/operators';
import { PropertieModule } from '../models/propertie/propertie.module';


@Injectable({
  providedIn: 'root'
})
export class PropertieService {

  private url = "https://localhost:44381/api/propertie";
  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  constructor(private _http: HttpClient) {

  }

  addPropertie(propertie: PropertieModule) {

    return this._http.post(`${this.url}/add`, propertie, { headers: this.headers })
      .pipe(
        map((resp: any) => {
          return resp;
        },
          (error: any) => {
            return error.error;
          }
        ),
      );
  }
  editPropertie(propertie: PropertieModule) {

    return this._http.put(`${this.url}/edit`, propertie, { headers: this.headers })
      .pipe(
        map((resp: any) => {
          return resp;
        },
          (error: any) => {
            return error.error;
          }
        ),
      );
  }
  removePropertie(id: number) {
    return this._http.delete(`${this.url}/remove/?id=${id}`).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  getProperties() {
    return this._http.get(`${this.url}/listpropetie`).pipe(
      map(this.createArrar),
      delay(10)
    )
  }
  private createArrar(Obj: any) {
    const properties: PropertieModule[] = [];

    Object.keys(Obj).forEach(key => {
      const propertie: PropertieModule = Obj[key];
      properties.push(propertie);
    });
    return properties;
  }
}

