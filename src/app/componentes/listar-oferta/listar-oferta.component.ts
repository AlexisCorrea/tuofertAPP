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
  selector: 'app-listar-oferta',
  templateUrl: './listar-oferta.component.html',
  styleUrls: ['./listar-oferta.component.css']
})
export class ListarOfertaComponent implements OnInit {
  negocio= new RegistrarRequestNegocio();
  body= new JsonApiBodyRequestNegocio();
  peticion = new GetRequestNegocio;
  bodyPeticion= new JsonApiBodyRequestGetNegocio();
  ids_negocios:Array<string> = [];
  oferta= new RegistrarRequestOferta();
  body_oferta = new JsonApiBodyRequestOferta();
  respuesta:any;
  ofertas_correctas:Array<any>=[];
  oferta_eliminar= new DeleteRequestOferta();
  body_oferta_Eliminar= new JsonApiBodyRequestDeleteOferta();
  
  constructor(private servicio_oferta:ServicioOfertaService,private servicio_negocio:ServicioNegocioService,private sesion:SesionesService,private enrutador: Router) {
      this.llenarTabla();
   }

  ngOnInit() {
  }
  eliminar(id){
    this.oferta_eliminar.id=id;
    this.oferta_eliminar.idadministrador=this.sesion.persona[0].id;
    this.oferta_eliminar.token=this.sesion.persona[0].token;
    this.body_oferta_Eliminar.oferta=[this.oferta_eliminar];
    this.servicio_oferta.deleteEliminarOferta(this.body_oferta_Eliminar).subscribe(data=>{
      this.llenarTabla();
    })
  }
  editar(i){
    var oferta_editar= new RegistrarRequestOferta();
    oferta_editar=this.ofertas_correctas[i];
    this.servicio_oferta.oferta=oferta_editar;
    console.log(this.servicio_oferta.oferta.fecha_final);
    this.enrutador.navigate(['EditarOferta']);
  }
  llenarTabla(){
    this.consultar_ids_negocios();
  }
  consultar_ids_negocios(){
    this.peticion.tipoConsulta=this.sesion.persona[0].id;
    this.peticion.parametro="todo";
    this.peticion.token=this.sesion.persona[0].token;
    this.bodyPeticion.negocio=[this.peticion];
    this.servicio_negocio.getListarNegocios(this.bodyPeticion).subscribe(data=>{
     
      this.respuesta=data;
      this.body=this.respuesta;
      for (let index = 0; index < this.body.negocio.length; index++) {
        this.ids_negocios.push(this.body.negocio[index].id);
        
      }
      this.consultar_ofertas();

    })
  }
  consultar_ofertas(){
    console.log("este es el vector de los ids"+this.ids_negocios);
    this.servicio_oferta.getObtenerOferta().subscribe(data=>{
      this.respuesta=data;
      this.body_oferta=this.respuesta;
      for (var index = 0; index < this.body_oferta.oferta.length; index++) {
        for (var i = 0; i < this.ids_negocios.length; i++) {
          if (this.body_oferta.oferta[index].idnegocio===this.ids_negocios[i] ) {
            console.log(this.body_oferta.oferta[index]);
            this.ofertas_correctas.push(this.body_oferta.oferta[index]);
            }
        }
      }
    })
  }
}
