import { Component, OnInit } from '@angular/core';
import { ServicioOfertaService } from "../../services/servicio-oferta.service";
import {JsonApiBodyRequestNegocio} from '../../../model/jsonApiBodyRequestNegocio';
import { RegistrarRequestNegocio } from "../../../model/registrarRequestNegocio";
import {ServicioNegocioService} from '../../services/servicio-negocio.service';
import {JsonApiBodyRequestGetNegocio} from '../../../model/jsonApiBodyRequestGetNegocio';
import {GetRequestNegocio } from '../../../model/getRequestNegocio';
import { Router } from '@angular/router';
import { DeleteRequestOferta} from "../../../model/deleteRequestOferta";
import { JsonApiBodyRequestOferta } from "../../../model/jsonApiBodyRequestOferta";
import { RegistrarRequestOferta } from "../../../model/registrarRequestOferta";
import {SesionesService} from '../../services/sesiones.service';
import {JsonApiBodyRequestDeleteOferta} from '../../../model/jsonApiBodyRequestDeleteOferta';

@Component({
  selector: 'app-listar-oferta-cliente',
  templateUrl: './listar-oferta-cliente.component.html',
  styleUrls: ['./listar-oferta-cliente.component.css']
})
export class ListarOfertaClienteComponent implements OnInit {
  respuesta:any;
  body_oferta = new JsonApiBodyRequestOferta();
  ofertas_correctas:Array<any>=[];
  permisos="cliente";
  oferta_eliminar= new DeleteRequestOferta();
  body_oferta_Eliminar= new JsonApiBodyRequestDeleteOferta();
  constructor(private servicio_oferta:ServicioOfertaService,
    private servicio_negocio:ServicioNegocioService,
    private sesion:SesionesService,
    private enrutador: Router) {
     try {
      let rol=sesion.persona[0].rol.toLowerCase();
      console.log(sesion.persona[0]);
     if(rol==='super administrador'){
       this.permisos="super administrador";
     }
     } catch (error) {
       enrutador.navigate(['Bienvenida']);
     }
    this.llenarTabla();
 }
  ngOnInit() {
  }
  editar(i){
    var oferta_editar= new RegistrarRequestOferta();
    oferta_editar=this.ofertas_correctas[i];
    this.servicio_oferta.oferta=oferta_editar;
    console.log(this.servicio_oferta.oferta.fecha_final);
    this.enrutador.navigate(['EditarOferta']);
  }
  eliminar(id){
    this.oferta_eliminar.id=id;
    this.oferta_eliminar.idadministrador=this.sesion.persona[0].id;
    this.oferta_eliminar.token=this.sesion.persona[0].token;
    this.body_oferta_Eliminar.oferta=[this.oferta_eliminar];
    this.servicio_oferta.deleteEliminarOferta(this.body_oferta_Eliminar).subscribe(data=>{
      this.llenarTabla();
  });
}
  llenarTabla(){
    this.servicio_oferta.getObtenerOferta().subscribe(data=>{
      this.respuesta=data;
      this.body_oferta=this.respuesta;
      
    })
  }

}
