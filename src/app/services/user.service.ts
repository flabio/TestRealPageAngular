import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, delay } from 'rxjs/operators';
import { UserModule } from '../models/user/user.module';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "https://localhost:44381/user";
  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  constructor(private _http: HttpClient) {

  }

  addUser(user: UserModule) {
    console.log(user)
    return this._http.post(`${this.url}/add`, user, { headers: this.headers })
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
  editUser(user: UserModule) {

    return this._http.put(`${this.url}/edit`, user, { headers: this.headers })
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
  removeUser(id: number) {
    return this._http.delete(`${this.url}/remove/?id=${id}`).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  getUsers() {
    return this._http.get(`${this.url}/listuser`).pipe(
      map(this.createArrar),
      delay(10)
    )
  }
  private createArrar(Obj: any) {
    const users: UserModule[] = [];

    Object.keys(Obj).forEach(key => {
      const user: UserModule = Obj[key];
      users.push(user);
    });
    return users;
  }
}
