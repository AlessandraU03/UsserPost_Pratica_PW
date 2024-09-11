import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';  // Para hacer peticiones HTTP
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule

import { AppComponent } from './app.component';
import { UsersDashboardComponent } from './users/users-dashboard/users-dashboard.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    UsersDashboardComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    MatButtonModule,   
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
