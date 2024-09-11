import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../modelo/iuser';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  @Input() user: IUser = {
    id: 0,
    name: "",
    username: "",
    phone: "",
    website: ""
  };

  @Output() addUser = new EventEmitter<IUser>();

  mostrar(): void {
    console.log(this.user); 
  }

  enviar(): void {
    this.addUser.emit(this.user); 
  }

}
