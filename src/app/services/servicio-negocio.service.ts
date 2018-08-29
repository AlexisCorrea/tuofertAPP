import { Injectable } from '@angular/core';
import {JsonApiBodyRequestNegocio} from '../../model/jsonApiBodyRequestNegocio';
import {JsonApiBodyRequestGetNegocio} from '../../model/jsonApiBodyRequestGetNegocio';
import {JsonApiBodyRequestDeleteNegocio} from '../../model/jsonApiBodyRequestDeleteNegocio';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioNegocioService {
  rutaBase = 'http://localhost:8050/orquestador/';
  constructor(private http: HttpClient) { }
  postRegistrarNegocio(body):Observable<any>{
    console.log(body);
    return this.http.post(this.rutaBase+"registrar/negocio",body);
  }
  getListarNegocios(body):Observable<any>{
    return this.http.get(this.rutaBase+"listar/negocio/idtrabajador", body);
  }
  putEditarNegocio(body):Observable<any>{
    return this.http.put(this.rutaBase+"editar/negocio",body);
  }
  deleteEliminarNegocio(body){
    return this.http.delete(this.rutaBase+"eliminar/negocio",body);
  }
}
