import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Base } from './app.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private API = Base.API_URI; 

  constructor(
    private http:HttpClient,
    private Router:Router
  ) { }

  token(){
    return window.localStorage.getItem('token');
  }
  
  postLogin(username:string,password:string){
    return this.http.post( this.API + '/auth/login',{username,password,_method:'POST'});
  }

  check(){
      let data:any = {};
      let token = window.localStorage.getItem('token');
      if (token !== null && token !== '' && token !== undefined ){

        this.http.get(this.API + '/auth/check?token=' + token )
          .subscribe((response)=>{
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
            window.localStorage.removeItem('token');
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
      let token = window.localStorage.getItem('token');
      let data:any;
      if (token !== null && token !== '' && token !== undefined ){
        this.http.get(this.API + '/auth/check?token=' + token )
          .subscribe((response)=>{
            if( response['result'] == 'error'){
              window.localStorage.removeItem('token');
              this.Router.navigateByUrl('login');              
            }
            },
          err => {
            alert('cannot connect server please try again');
            window.localStorage.removeItem('token');
            this.Router.navigateByUrl('login');
          });
        }  
  }

}