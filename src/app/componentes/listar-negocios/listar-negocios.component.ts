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
  
  respuesta:any;
  
  constructor(private servicio_negocio:ServicioNegocioService,private sesion:SesionesService,private enrutador: Router) {
    
   
      this.llenarTabla();
  }

  ngOnInit() {
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
      this.body=this.respuesta;
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
    // console.log(body);
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
