import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersDashboardComponent } from './users-dashboard/users-dashboard.component';
import { UserFormComponent } from './user-form/user-form.component';



@NgModule({
  declarations: [
    UsersDashboardComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
