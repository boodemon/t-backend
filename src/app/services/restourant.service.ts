import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Base } from './app.service';

@Injectable()
export class RestourantService {
  api = Base.API_URI;

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }
  getAll() {
    return this.http.get(this.api + '/restourant');
  }
  getEdit(id) {
    return this.http.get(this.api + '/restourant/' + id + '/edit');
  }

  postNew(data) {
    return this.http.post(this.api + '/restourant', data);
  }

  postUpdate(id, data) {
    return this.http.post(this.api + '/restourant/' + id, data);
  }

  getDelete(id) {
    return this.http.post(this.api + '/restourant/' + id, { _method: 'DELETE' });
  }
}
