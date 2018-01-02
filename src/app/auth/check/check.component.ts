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
    console.log( 'auth check result : ', this.Auth.check() );
    if(  this.Auth.check() ){
      this.Routes.navigateByUrl('dashboard');
    }else{
      this.Routes.navigateByUrl('login');
    }
  }

}
