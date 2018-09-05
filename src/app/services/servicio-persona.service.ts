import { Injectable } from '@angular/core';
import { HttpClient,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JsonApiBodyRequestPersona} from '../../model/jsonApiBodyRequestPersona';
@Injectable({
  providedIn: 'root'
})
export class ServicioPersonaService {
  rutaBase = 'http://localhost:8050/orquestador/';
  constructor(private http: HttpClient) { }

  postRegistrarPersona(body):Observable<any> {
    return this.http.post(this.rutaBase+"registrar/persona", body);
  }
  getListarPersonas(): Observable<any>{
    return this.http.get(this.rutaBase+"listar/persona");
  }
  putEditarPersonas(body): Observable<any>{
    return this.http.put(this.rutaBase+"editar/persona",body);
  }
  deleteEliminarPersonas(body): Observable<any>{
    let req = new HttpRequest('DELETE', this.rutaBase+'eliminar/persona');
    let newReq = req.clone({body: body});
    return this.http.request(newReq);
   
  }
}
