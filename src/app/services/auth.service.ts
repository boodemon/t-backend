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

  token(){
    return window.localStorage.getItem('auth0');
  }
  
  postLogin(username:string,password:string,token:string){
    return this.http.post( this.API + '/auth/login',{username,password,token,_method:'POST'});
  }

  check(){
      let data:any = {};
      let token = window.localStorage.getItem('auth0');
    console.log('login finished', token);
    if (token !== null && token !== '' && token !== undefined ){

      this.http.get(this.API + '/auth/check?token=' + token )
        .subscribe((response)=>{
          console.log('get check ', response);
          if( response['result'] == 'successful'){
            data = {
              'result' : true,
              'data'   : response['data']
            };
            
          }else{
            data = {
              'result' : false,
              'data'   : null
            }
          }
          window.localStorage.setItem('user',JSON.stringify(data));
          },
        err => {
          alert('cannot connect server please try again');
          window.localStorage.removeItem('auth0');
          data = {
            'result' : false,
            'data'    : null,
          };
          window.localStorage.setItem('user', JSON.stringify(data));
        });
      }
      return window.localStorage.getItem('user');
  }

  online(){
    this.check();
    let users = window.localStorage.getItem('user');
    let user = JSON.parse( users );
    //let user = window.localStorage.getItem('auth0');
    console.log('online : ', user )
    
    if( user.result ){
      return user.data;
    }else{ 
     // this.Router.navigateByUrl('login');
    }
    
  }

}
interface _tokens {
  _token: string;
}
