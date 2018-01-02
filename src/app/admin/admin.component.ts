import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent  {

  constructor( 
      private Users :UsersService, 
      private auth:AuthService,
    ) { 
      auth.online();
    }

  UserList:any = [];

  ngOnInit() {
    // call service users
    this.Users.getAdmin().subscribe((response) => {
        this.UserList = response;
    });
  }

}

