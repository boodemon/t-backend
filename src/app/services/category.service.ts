import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Base } from './app.service';
@Injectable()
export class CategoryService {
  api = Base.API_URI;

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  getAll(){
    return this.http.get( this.api + '/category');
  }
  getEdit(id){
    return this.http.get( this.api + '/category/' + id + '/edit');
  }

}
