import { Component, OnInit} from '@angular/core';
import {JsonApiBodyRequestNegocio} from '../../../model/jsonApiBodyRequestNegocio';
import { RegistrarRequestNegocio } from "../../../model/registrarRequestNegocio";
import {ServicioNegocioService} from '../../services/servicio-negocio.service';
import {JsonApiBodyRequestGetNegocio} from '../../../model/jsonApiBodyRequestGetNegocio';
import {GetRequestNegocio } from '../../../model/getRequestNegocio';
import { Router } from '@angular/router';

import {SesionesService} from '../../services/sesiones.service';
import {DeleteRequestNegocio} from '../../../model/deleteRequestNegocio';
import { JsonApiBodyRequestDeleteNegocio } from "../../../model/jsonApiBodyRequestDeleteNegocio";

@Component({
  selector: 'app-listar-negocios',
  templateUrl: './listar-negocios.component.html',
  styleUrls: ['./listar-negocios.component.css']
})
export class ListarNegociosComponent implements OnInit {
  
  negocio= new RegistrarRequestNegocio();
  body= new JsonApiBodyRequestNegocio();
  peticion = new GetRequestNegocio;
  bodyPeticion= new JsonApiBodyRequestGetNegocio();
  permisos='administrador';
  respuesta:any;
  error:boolean=false;
  Mensaje:any;
  constructor(private servicio_negocio:ServicioNegocioService,private sesion:SesionesService,private enrutador: Router) {
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
  crearOferta(i){
    this.servicio_negocio.bodynegocio=this.body.negocio[i];
    this.enrutador.navigate(['RegistrarOferta']);
  }
  llenarTabla(){
    this.peticion.tipoConsulta=this.sesion.persona[0].id;
    this.peticion.parametro="todo";
    this.peticion.token=this.sesion.persona[0].token;
    this.bodyPeticion.negocio=[this.peticion];
    // console.log(this.peticion.tipoConsulta);
    // console.log(this.bodyPeticion);
    this.servicio_negocio.getListarNegocios(this.bodyPeticion).subscribe(data=>{
      // console.log(data);
      this.respuesta=data;
      this.error=false;
      this.body=this.respuesta;
    },err=>{
      this.error=true;
      this.Mensaje="No hay negocios registrados"
    })
  }
  eliminar(id:string){
   var negocio = new DeleteRequestNegocio();
  var body=new JsonApiBodyRequestDeleteNegocio();
    negocio.idadministrador=id;
    negocio.id=this.sesion.persona[0].id;
    negocio.token=this.sesion.persona[0].token;
    body.negocio=[negocio];
    // console.log("Eliminando negocio");
    // console.log(negocio)
     console.log(body);
    this.servicio_negocio.deleteEliminarNegocio(body).subscribe(data=>{
      // console.log(data);
      this.llenarTabla();
    })
  }
  editar(i){
  console.log("estamos en editar ");
    var negocio_editar = new RegistrarRequestNegocio();
    negocio_editar=this.body.negocio[i];
    this.servicio_negocio.bodynegocio=negocio_editar;
    console.log("se envio"+this.servicio_negocio.panel);
    this.enrutador.navigate(['EditarNegocio']);
    // this.hijo.asignarpanel(1);
  }
  
}
