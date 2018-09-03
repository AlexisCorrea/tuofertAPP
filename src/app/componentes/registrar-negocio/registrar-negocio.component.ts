import { Component, OnInit } from '@angular/core';
import {ServicioNegocioService} from '../../services/servicio-negocio.service';
import {JsonApiBodyRequestNegocio} from '../../../model/jsonApiBodyRequestNegocio';

import { RegistrarRequestNegocio } from "../../../model/registrarRequestNegocio";
import {FormGroup,FormControl} from '@angular/forms'

@Component({
  selector: 'app-registrar-negocio',
  templateUrl: './registrar-negocio.component.html',
  styleUrls: ['./registrar-negocio.component.css']
})
export class RegistrarNegocioComponent implements OnInit {
  body = new JsonApiBodyRequestNegocio();
  negocio= new RegistrarRequestNegocio();
  forma:FormGroup;

  constructor(private servicio_negocio: ServicioNegocioService) {
    this.forma= new FormGroup({
      'id': new FormControl(this.negocio.id),
      'nombre': new FormControl(this.negocio.nombre),
      'nit': new FormControl(this.negocio.nit),
      'correo': new FormControl(this.negocio.correo),
      'foto': new FormControl(this.negocio.foto),
      'detalle': new FormControl(this.negocio.detalle),
      'telefono': new FormControl(this.negocio.telefono),
      'tipo': new FormControl(this.negocio.tipo),
      'ubicacion': new FormControl(this.negocio.ubicacion)
      });
   }

  ngOnInit() {

  }
  guardar(){
    this.negocio.id="";
    this.negocio.nombre= this.forma.controls['nombre'].value;
    this.negocio.nit= this.forma.controls['nit'].value;
    this.negocio.correo= this.forma.controls['correo'].value;
    this.negocio.foto= this.forma.controls['foto'].value;
    this.negocio.detalle= this.forma.controls['detalle'].value;
    this.negocio.telefono= this.forma.controls['telefono'].value;
    this.negocio.tipo= this.forma.controls['tipo'].value;
    this.negocio.ubicacion= this.forma.controls['ubicacion'].value;
    this.negocio.id_administrador= "3";
    this.negocio.token="654";
    this.body.negocio=[this.negocio];
    this.servicio_negocio.postRegistrarNegocio(this.body).subscribe(data=>{
      console.log(data);
      this.forma.reset();
    })
  }

}
