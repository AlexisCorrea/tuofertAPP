import { Component, OnInit } from '@angular/core';
import {ServicioNegocioService  } from "../../services/servicio-negocio.service";
import {ServicioOfertaService} from '../../services/servicio-oferta.service';
import {JsonApiBodyRequestGetNegocio} from '../../../model/jsonApiBodyRequestGetNegocio';
import { GetRequestNegocio } from "../../../model/getRequestNegocio";
import {JsonApiBodyRequestNegocio  } from "../../../model/jsonApiBodyRequestNegocio";

import { RegistrarRequestNegocio } from "../../../model/registrarRequestNegocio";

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  getNegocio= new GetRequestNegocio();
  bodyGetNegocio= new JsonApiBodyRequestGetNegocio();
  negocio = new RegistrarRequestNegocio();
  bodyNegocio= new JsonApiBodyRequestGetNegocio();
  respuesta:any;
  lat=6.2802516;
  lag=-75.62255399999998;
  
  
  constructor(private servicio_negocio:ServicioNegocioService,
    private servicio_oferta:ServicioOfertaService) { 
     
      this.llenarTabla();
    }

  ngOnInit() {
  }
  llenarTabla(){
    this.getNegocio.parametro="todo";
    this.getNegocio.tipoConsulta="00";
    this.getNegocio.token="123456";
    this.bodyGetNegocio.negocio=[this.getNegocio];
    this.servicio_negocio.getListarNegocios(this.bodyGetNegocio).subscribe(data=>{
      this.respuesta=data;
      this.bodyNegocio=this.respuesta;
      
      console.log(this.bodyNegocio);
    },
    error=>{
      console.log(error);
    });
    }
    filtroOferta(){
      console.log("oferta");

    }
    filtroNegocio(){
      console.log("negocio");
    }
  }


