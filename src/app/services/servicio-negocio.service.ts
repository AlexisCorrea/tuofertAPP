import { Injectable } from '@angular/core';
import {JsonApiBodyRequestNegocio} from '../../model/jsonApiBodyRequestNegocio';
import {JsonApiBodyRequestGetNegocio} from '../../model/jsonApiBodyRequestGetNegocio';
import {JsonApiBodyRequestDeleteNegocio} from '../../model/jsonApiBodyRequestDeleteNegocio';

import { HttpClient,HttpRequest  } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RegistrarRequestNegocio} from '../../model/registrarRequestNegocio';

@Injectable({
  providedIn: 'root'
})
export class ServicioNegocioService {
  panel:any;
  bodynegocio= new RegistrarRequestNegocio();
  rutaBase = 'http://localhost:8050/orquestador/';
  constructor(private http: HttpClient) { }
  postRegistrarNegocio(body):Observable<any>{
    console.log(body);
    return this.http.post(this.rutaBase+"registrar/negocio",body);
  }
  getListarNegocios(body):Observable<any>{
    return this.http.post(this.rutaBase+"listar/negocio/idtrabajador", body);
  }
  putEditarNegocio(body):Observable<any>{
    return this.http.put(this.rutaBase+"editar/negocio",body);
  }
  deleteEliminarNegocio(body):Observable<any>{
    let req = new HttpRequest('DELETE', this.rutaBase+'eliminar/negocio');
    let newReq = req.clone({body: body});
    return this.http.request(newReq);
   
  }
}
