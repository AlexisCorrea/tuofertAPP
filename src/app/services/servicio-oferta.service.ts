import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioOfertaService {
  rutaBase = 'http://localhost:8050/orquestador/';

  constructor(private http:HttpClient) { }
  // postRegistrarOferta():Observable<any>{
  //   return this.http.post(this.rutaBase+"");
  // }
}
