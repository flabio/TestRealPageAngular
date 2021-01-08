import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';




import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { PropertieComponent } from './components/propertie/propertie.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PropertieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
