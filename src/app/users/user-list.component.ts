import { Component, OnInit, TemplateRef } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
//Set Modal //
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { UserFormComponent } from './user-form.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private username:string;
  private email:string;
  private name:string;
  private password:string;
  private tel:string;
  private active:boolean;
  private userID:number;
  private Udata:any = [];

  // Error validate
  errEmail = '';
  errUsername = '';
  errPassword = '';
  errName = '';
  
  constructor( 
    private Users :UsersService, 
    private auth:AuthService,
    private modalService: BsModalService,
    private user:UserFormComponent
  ) { 
    auth.online();
  }

    UserList:any = [];
    TemplateRef:any;
    frmTitle:string;

    ngOnInit() {
      // call service users
      this.userlist();
    }
    modalRef: BsModalRef;
    modalRef2: BsModalRef;
    userlist(){
      return this.Users.getAdmin().subscribe((response) => {
          this.UserList = response;
      });
    }

    newModal(template: TemplateRef<any>) {
      this.username = '';
      this.email    = '';
      this.password = '';
      this.name     = '';
      this.tel      = '';
      this.active   = false;
      this.userID   = 0;

      this.errUsername  = '';
      this.errEmail     = '';
      this.errPassword  = '';
      this.errName      = '';

      this.frmTitle = 'Add new Administrators';
      this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    }

    updateModal(template:TemplateRef<any>, userID){
      this.frmTitle = 'Update profile Administrator';
      this.Users.getUser(userID).subscribe((response) =>{
        
        const result = response['result'];
        if( result == 'successful'){
              const data = response['data'];
              console.log('data ', data.username );
              this.username = data.username;
              this.email    = data.email;
              this.name     = data.name;
              this.tel      = data.tel;
              this.userID   = data.id;
              this.password = '';
              this.active   = data.active == 'Y' ? true : false;
              this.modalRef = this.modalService.show(template, { class: 'modal-lg'});
        }else{ 
          alert( response['msg'] );
        }
      });
      
    }

    onSubmit(){
        this.Udata = {
          username : this.username,
          email    : this.email,
          name     : this.name,
          tel      : this.tel,
          userID   : this.userID,
          password : this.password,
          active   : this.active
        }
        console.log('udata : ', this.Udata);
      
      if( this.userID == 0 ){
          this.Udata._method = 'POST';
          this.Users.addNew( this.Udata ).subscribe((response) => {
            
            const res = response;
            this.userlist();
            this.modalRef.hide();
            this.modalRef = null;
        },
        err => {
          const errRow = err.error;
          if( errRow.username !== undefined )
                this.errUsername = errRow.username;
          if( errRow.email !== undefined )
                this.errEmail = errRow.email;
          if( errRow.password !== undefined )
                this.errPassword = errRow.password;
          if( errRow.name !== undefined )
                this.errName = errRow.name;
          console.log('error : ', err.error);
        });
      }else{
        this.Udata._method = 'PUT';
        this.Users.updateUser(this.userID,this.Udata).subscribe((response)=>{
          const res = response;
          this.userlist();
          this.modalRef.hide();
          this.modalRef = null;
      },
        err => {

        });
      }
      
    }

    deleteUser(userID){
      if( !confirm( 'ยืนยันการลบ User นี้' ) )
        return false;

      this.Users.oneDelete(userID).subscribe((response)=>{
        const res = response;
        if( res['result'] == 'error'){
          alert( res['msg'] );
          return false;
        }
        if( res['result'] == 'successful'){
          this.ngOnInit();
        } 
      });
    }

    closeFirstModal() {
      this.username = '';
      this.email    = '';
      this.name     = '';
      this.tel      = '';
      this.userID   = 0;

      this.errUsername  = '';
      this.errEmail     = '';
      this.errPassword  = '';
      this.errName      = '';

      this.modalRef.hide();
      this.modalRef = null;
    }

}
