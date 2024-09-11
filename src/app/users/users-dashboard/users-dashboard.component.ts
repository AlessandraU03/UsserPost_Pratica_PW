import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IUser } from '../modelo/iuser';
import { MatTableDataSource } from '@angular/material/table';  // Importar MatTableDataSource

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {
  // Cambiamos el tipo de users_list a MatTableDataSource
  users_list = new MatTableDataSource<IUser>([]);

  displayedColumns: string[] = ['id', 'name', 'username', 'phone', 'website', 'actions'];

  selected_user: IUser = {
    id: 1,
    name: "Usuario 1",
    username: "user_1",
    phone: "19997355272",
    website: "akjhbsasays"
  };


  constructor(private _service: UserService) {}

  ngOnInit(): void {

    this._service.getAll().subscribe(response => {
      this.users_list.data = response;
    });
  }

  seleccionar_usuario(user: IUser): void {
    this.selected_user = user;
  }

  agregar_usuario(nuevo_usuario: IUser): void {
    nuevo_usuario.id = this.users_list.data.length + 1;

    const updatedList = [...this.users_list.data, nuevo_usuario];
    this.users_list.data = updatedList; 

    this.selected_user = { id: 0, name: "", username: "", phone: "", website: "" };
  }


}
