import { Injectable } from '@angular/core';

import { HttpClient ,HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import{RegistrarRequestOferta} from '../../model/registrarRequestOferta';

@Injectable({
  providedIn: 'root'
})
export class ServicioOfertaService {
  rutaBase = 'http://localhost:8070/';
  oferta= new RegistrarRequestOferta();
  constructor(private http:HttpClient) { }
  postRegistrarOferta(body):Observable<any>{
    return this.http.post(this.rutaBase+"ofertas/registrar",body);
  }
  getObtenerOferta():Observable<any>{
    return this.http.get(this.rutaBase+"ofertas/listar");
  }
  putEditarOferta(body):Observable<any>{
    console.log(body);

    return this.http.put(this.rutaBase+"ofertas/editar",body);
  }
  deleteEliminarOferta(body):Observable<any>{
    let req = new HttpRequest('DELETE', this.rutaBase+'ofertas/eliminar');
    let newReq = req.clone({body: body});
    return this.http.request(newReq);
  }
}
