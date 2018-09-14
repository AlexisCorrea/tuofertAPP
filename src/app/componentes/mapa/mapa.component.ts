import { Component, OnInit } from '@angular/core';
import { ServicioNegocioService } from "../../services/servicio-negocio.service";
import { ServicioOfertaService } from '../../services/servicio-oferta.service';
import { JsonApiBodyRequestGetNegocio } from '../../../model/jsonApiBodyRequestGetNegocio';
import { GetRequestNegocio } from "../../../model/getRequestNegocio";
import { JsonApiBodyRequestNegocio } from "../../../model/jsonApiBodyRequestNegocio";
import { JsonApiBodyRequestOferta } from '../../../model/jsonApiBodyRequestOferta';
import { FormGroup, FormControl } from '@angular/forms';

import { RegistrarRequestNegocio } from "../../../model/registrarRequestNegocio";
import { RegistrarRequestOferta } from '../../../model/models';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  getNegocio = new GetRequestNegocio();
  bodyOferta = new JsonApiBodyRequestOferta();
  bodyGetNegocio = new JsonApiBodyRequestGetNegocio();
  negocio = new RegistrarRequestNegocio();
  bodyNegocio = new JsonApiBodyRequestGetNegocio();
  inicio:boolean=true;
  forma: FormGroup;
  tiposdeNegocio: Array<string> = [];
  respuesta: any;
  lat = 6.2802516;
  lag = -75.62255399999998;


  constructor(private servicio_negocio: ServicioNegocioService,
    private servicio_oferta: ServicioOfertaService) {
    this.forma = new FormGroup({
      'tipoNegocio1': new FormControl(""),
      'tipoNegocio2': new FormControl(""),
      'tipoNegocio3': new FormControl(""),
      'tipoNegocio4': new FormControl(""),
      'tipoNegocio5': new FormControl(""),
      'tipoOferta': new FormControl(""),
    })
    this.bodyNegocio.negocio = [];
    this.llenarTabla();
    
  }

  ngOnInit() {
  }
  llenarTabla() {
    this.forma.reset();
    this.getNegocio.parametro = "todo";
    this.getNegocio.tipoConsulta = "00";
    this.getNegocio.token = "123456";
    this.bodyGetNegocio.negocio = [this.getNegocio];
    this.servicio_negocio.getListarNegocios(this.bodyGetNegocio).subscribe(data => {
     
      this.inicio=true;
      this.primerFor(data.negocio);
    },
      error => {
        console.log(error);
      });
      
  }
  primerFor(negociosPorTipo) {
    console.log(negociosPorTipo)
    let ofertasByIDNegocio: Array<RegistrarRequestOferta>;
    ofertasByIDNegocio = [];
    negociosPorTipo.forEach(element => {
      this.servicio_oferta.getOfertasByIDNegocio(element.id).subscribe(data => {
        if (data.oferta.length > 0) {
          console.log("primerFor----->");
          console.log(data);
          for (let d of data.oferta) {
            if (this.validar_fechas(d.fecha_inicio, d.fecha_final)) {
              ofertasByIDNegocio.push(d);
            }

          }
          this.segundoFor(ofertasByIDNegocio);
        }
      },
        error => {

        })

    });
  }
  segundoFor(ofertasByIDNegocio) {

    let ids: Array<string>;
    ids = [];
    console.log(ofertasByIDNegocio);
    ofertasByIDNegocio.forEach(element => {
      console.log(element.tipo);
      if (this.inicio) {
        ids.push(element.idnegocio);
      }else{
        
      if (element.tipo === this.forma.controls['tipoOferta'].value) {

        ids.push(element.idnegocio);

      }
      }
      this.tercerFor(ids);
    });
  }
  tercerFor(ids) {
    ids.forEach(element => {
      this.servicio_negocio.getByID(element).subscribe(data => {
        for (let d of data.negocio) {
          this.bodyNegocio.negocio.push(d);
        }
        console.log("ultimo for mostrar negocio------>");
        console.log(this.bodyNegocio);
      },
        error => {
          console.log(error);
        })

    });
  }
  filtrar() {
    this.bodyNegocio.negocio = [];
    if (this.forma.controls['tipoNegocio1'].value) {
      this.tiposdeNegocio.push("Bar");
    }
    if (this.forma.controls['tipoNegocio2'].value) {
      this.tiposdeNegocio.push("Mercado");
    }
    if (this.forma.controls['tipoNegocio3'].value) {
      this.tiposdeNegocio.push("Almacen");
    }
    if (this.forma.controls['tipoNegocio4'].value) {
      this.tiposdeNegocio.push("Cine");
    }
    if (this.forma.controls['tipoNegocio5'].value) {
      this.tiposdeNegocio.push("Restaurante");
    }
    console.log(this.tiposdeNegocio);
    let negociosPorTipo: Array<RegistrarRequestNegocio>;
    negociosPorTipo = [];

    this.tiposdeNegocio.forEach(element => {
      this.servicio_negocio.getByTipo(element).subscribe(data => {
        if (data.negocio.length > 0) {
          console.log(data);
          for (let d of data.negocio) {
            negociosPorTipo.push(d);
          }
          // negociosPorTipo.push(data);
          this.inicio=false;
          this.primerFor(negociosPorTipo);
          console.log("el body");
          console.log(this.bodyNegocio);
          this.tiposdeNegocio = [];
          negociosPorTipo = [];
        }
      },
        error => {

        })
    }
    );



  }
  validar_fechas(_fechaInicio: any, _fechaFin: any): boolean {
    let hoy = new Date();
    let anoActual = hoy.getFullYear();
    let diaActual = hoy.getDate();
    let mesActual = +hoy.getMonth() + 1;
    console.log("fechas acuales" + diaActual + "/" + mesActual + "/" + anoActual);
    let fechaInicio: number = _fechaInicio.split('-');
    let fechaFin: number = _fechaFin.split('-');
    let anoInicio = +fechaInicio[0];
    let mesInicio = +fechaInicio[1];
    let diaInicio = +fechaInicio[2];
    let anoFin = +fechaFin[0];
    let mesFin = +fechaFin[1];
    let diaFin = +fechaFin[2];
    if (anoFin >= anoActual && anoInicio <= anoActual) {
      if (mesFin >= mesActual && mesInicio <= mesActual) {
        if (diaFin > diaActual && diaInicio <= diaActual) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
    
  }

consultarOfertas(id: string) {
  console.log(id);
  this.bodyOferta.oferta=[];
  this.servicio_oferta.getOfertasByIDNegocio(id).subscribe(data => {
    for(let d of data.oferta){
      if (this.validar_fechas(d.fecha_inicio, d.fecha_final)) {
        this.bodyOferta.oferta.push(d);
      }
    }
    // this.bodyOferta = data;
    // console.log(this.bodyOferta.oferta[0]);
  },
    error => {
      console.log(error)
    })

}
}


