import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private Auth:AuthService, private Router:Router) { 
    // if( Auth.check() === true ){
    //   Router.navigateByUrl('dashboard');
    // }
  }
  private _token:string = window.localStorage.getItem('_token');
  private username:string;
  private password:string;
  private responsding:string;
  private result:boolean;

  ngOnInit() {
    this.Auth.setToken();
    this._token = window.localStorage.getItem('_token');
    console.log( 'token : ',  window.localStorage.getItem('_token') );

  }

  login(){
    //console.log('click login username : ', this.username ,' password : ', this.password, ' token : ', this._token );
    this.Auth.postLogin( this.username, this.password, this._token).subscribe((response)=>{
      //console.log('login result : ', response);
      if( response['result'] == 'successful'){
          this.responsding = 'Login successful';
          this.result = true;
          let result = response['auth'];
          //console.log('login token : ', result);
          window.localStorage.setItem('auth0',result); 
          this.Router.navigateByUrl('dashboard');
      }else{
          this.responsding = response['message'] ;
          this.username = '';
          this.password = '';
          this.result = false;
      }
      
    },
    err => {
      this.responsding = 'Error : ' + err.message
      this.result = false;
    });
  }

}
