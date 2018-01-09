import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Base } from './app.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private API = Base.API_URI; 
  private _token:_tokens;
  private user:any[];
  private row:any[];
  private res:string;

  constructor(
    private http:HttpClient,
    private Router:Router
  ) { }

  setToken(){
    return this.http.get( this.API + '/auth/token').subscribe((response) => {
      if( (window.localStorage.getItem('_token') && window.localStorage.getItem('_token') != response['_token']) || !window.localStorage.getItem('_token') ){
        window.localStorage.setItem('_token', response['_token'] );
      }
    });
  }

  getToken(token){
    this.setToken();
    return window.localStorage.getItem('_token');
  }
  
  postLogin(username:string,password:string,token:string){
    return this.http.post( this.API + '/auth/login',{username,password,token,_method:'POST'});
  }

  check(){
      
      let user = window.localStorage.getItem('auth0');
      if( user !== null && user !== '' ){
        user = JSON.parse( user );
        console.log ('login finished' , user);
        this.http.get(this.API +'/auth/check?username=' + user['username'] + '&token=' + user['token'] )
        .subscribe((response)=>{
          if( response['result'] == 'false'){
            window.localStorage.removeItem('auth0');
          }
        },
        err => {
          alert('cannot connect server please try again');
          window.localStorage.removeItem('auth0');
        });
      }
      return window.localStorage.getItem('auth0') ? true : false;
  }

  online(){
    this.check();
    let user = window.localStorage.getItem('auth0');
    console.log('online : ', user )
    if( user !== null && user !== '' ){
     return JSON.parse( user );
    }else{ 
      this.Router.navigateByUrl('login');
    }
  }

}
interface _tokens {
  _token: string;
}
