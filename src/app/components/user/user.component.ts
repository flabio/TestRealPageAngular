import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { UserModule } from '../../models/user/user.module';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: UserModule[] = [];
  user: UserModule = new UserModule();
  msg: string = "";
  band: boolean = false;
  bandState: number = 1;
  constructor(private _serviceUser: UserService) { }

  ngOnInit(): void {
    this.listsUsres();
  }

  Seva(form: NgForm) {
    if (form.invalid) {
      return;
    }
    let petition: Observable<any>;

    if (this.user.idUser > 0) {
      petition = this._serviceUser.editUser(this.user);
    } else {
      petition = this._serviceUser.addUser(this.user);
    }

    petition.subscribe(resp => {
      this.msg = resp.message;
      this.band = resp.isSuccessfull;
      if (resp.result) {
        this.listsUsres();
      }
    }, error => {
      this.msg = error.error.message;
      this.band = error.error.isSuccessfull;
    });
  }

  edit(content: UserModule) {
    this.user = content;
    this.bandState=2;
  }
  remove(id: number) {
    this._serviceUser.removeUser(id).subscribe(resp => {
      this.msg = resp.message;
      this.band = resp.isSuccessfull;
      if (resp.result) {
        this.listsUsres();
      }
    }, error => {
      this.msg = error.error.message;
      this.band = error.error.isSuccessfull;
    });
  }
  listsUsres() {
    this._serviceUser.getUsers().subscribe(resp => {
      this.users = resp;
    });
  }

  EventAddUser() {
    this.bandState = 2;
  }
  EventListuser(){
    this.bandState=1;
  }
}
