import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  
  selector: 'body',
  template: '<div class="text-center">Loading</div>',
  //styleUrls: ['./check.component.css']
  
})
export class CheckComponent implements OnInit {

  constructor(private Auth:AuthService, private Routes:Router ) { }

  ngOnInit() {
    let token = window.localStorage.getItem('token');
    let auth  = window.localStorage.getItem('auth');
    //console.log('token', token ,' auth : ', auth );
    let res:any;
    if( token=== null || token === undefined || token === '' ){
      //console.log('token empty');
      this.Auth.logout();
      this.Routes.navigateByUrl('login');
    }else{ 
      res = JSON.parse(auth);
      //console.log('res is : ', res );
      if ( res ){
        //console.log('redirect to dashboard');
        this.Routes.navigateByUrl('dashboard');
      }else{
        //console.log('redirect to login');
        this.Auth.logout();
        this.Routes.navigateByUrl('login');
      }
    }
  }

}
