import { NgModule } from '@angular/core';

import {Routes,RouterModule} from '@angular/router'
import { UserComponent } from './components/user/user.component';



const routes:Routes = [
  {path:'user-list', component:UserComponent},
  {path:'**',pathMatch:'full', redirectTo:'user-list'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
