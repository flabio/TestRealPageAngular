import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { UserModule } from '../../models/user/user.module';
import { PropertieService } from '../../services/propertie.service';
import { PropertieModule } from '../../models/propertie/propertie.module';
import { from, Observable } from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  //user
  users: UserModule[] = [];
  detalleUser:any = {};
  user: UserModule = new UserModule();
  //propertie
  properties: PropertieModule[] = [];
  detallePropertie: PropertieModule[] = [];
  propertie: PropertieModule = new PropertieModule();

  msg: string = "";
  band: boolean = false;
  bandState: number = 1;
  constructor(private _serviceUser: UserService, private _servicePropertie: PropertieService) { }

  ngOnInit(): void {
    this.listsUsres();
    this.listProperties();
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
    this.bandState = 2;
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


  // properties crud
  listProperties() {
    this._servicePropertie.getProperties().subscribe(resp => {
      this.properties = resp;
    });
  }
  SevaPropertie(form: NgForm) {
    if (form.invalid) {
      return;
    }
    let petition: Observable<any>;

    if (this.propertie.idPropertie > 0) {
      petition = this._servicePropertie.editPropertie(this.propertie);
    } else {
      petition = this._servicePropertie.addPropertie(this.propertie);
    }

    petition.subscribe(resp => {
      this.msg = resp.message;
      this.band = resp.isSuccessfull;
      if (resp.result) {
        this.listProperties()
      }
    }, error => {
      this.msg = error.error.message;
      this.band = error.error.isSuccessfull;
    });
  }
  editPropertie(content: PropertieModule) {
    this.propertie = content;
   
  }
  removePropertie(id:number){
    this._servicePropertie.removePropertie(id).subscribe(resp => {
      this.msg = resp.message;
      this.band = resp.isSuccessfull;
      if (resp.result) {
        this.listProperties();
      }
    }, error => {
      this.msg = error.error.message;
      this.band = error.error.isSuccessfull;
    });
  }
  // find propertie

  // propertie user
  getPropertiesUser(user:UserModule){
    this.detalleUser=user;
    this.detallePropertie=this.properties.filter(x=>x.idUser===user.idUser);
  }
  // fin

  EventAddUser() {
    this.msg="";
    this.band=false;
    this.bandState = 2;
  }
  EventListuser() {
    this.msg="";
    this.band=false;
    this.bandState = 1;
  }
  EventListPropertie() {
    this.listProperties();
    this.msg="";
    this.bandState = 3;
    this.band=false;
  }


}
