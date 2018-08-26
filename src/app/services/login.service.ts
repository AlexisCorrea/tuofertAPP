import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JsonApiBodyLogin} from '../../model/jsonApiBodyLogin';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  LoginURL = 'http://localhost:8050/orquestador/login/persona';
  constructor(private http: HttpClient) { }
  postLogin( body: JsonApiBodyLogin ): Observable<any> {
    return this.http.post(this.LoginURL, body);
  }
}
