import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms'
import { ServicioNegocioService } from "../../services/servicio-negocio.service";
import {  SesionesService} from "../../services/sesiones.service";
import { JsonApiBodyRequestNegocio } from "../../../model/jsonApiBodyRequestNegocio";
import { RegistrarRequestNegocio } from "../../../model/registrarRequestNegocio";
import { Router } from '@angular/router';
@Component({
  selector: 'app-editar-negocio',
  templateUrl: './editar-negocio.component.html',
  styleUrls: ['./editar-negocio.component.css']
})
export class EditarNegocioComponent implements OnInit {
  forma:FormGroup;
  negocio= new RegistrarRequestNegocio();
  body= new JsonApiBodyRequestNegocio();
  constructor(private servicio_negocio:ServicioNegocioService,
    private sesiones:SesionesService,
    private enrutador:Router) { 
    this.forma= new FormGroup({
      
      'nombre': new  FormControl(servicio_negocio.bodynegocio.nombre),
      'nit': new FormControl(servicio_negocio.bodynegocio.nit),
      'correo': new  FormControl(servicio_negocio.bodynegocio.correo),
      'foto': new  FormControl(servicio_negocio.bodynegocio.foto),
      'detalle': new  FormControl(servicio_negocio.bodynegocio.detalle),
      'telefono': new  FormControl(servicio_negocio.bodynegocio.telefono),
      'tipo': new  FormControl(servicio_negocio.bodynegocio.tipo),
      'ubicacion': new  FormControl(servicio_negocio.bodynegocio.ubicacion)
      });
  }

  ngOnInit() {
  }
  guardar(){
    this.negocio.id=this.servicio_negocio.bodynegocio.id
    this.negocio.nombre=this.forma.controls['nombre'].value;
    this.negocio.nit=this.forma.controls['nit'].value;
    this.negocio.correo=this.forma.controls['correo'].value;
    this.negocio.foto=this.forma.controls['foto'].value;
    this.negocio.detalle=this.forma.controls['detalle'].value;
    this.negocio.telefono=this.forma.controls['telefono'].value;
    this.negocio.tipo=this.forma.controls['tipo'].value;
    this.negocio.ubicacion=this.forma.controls['ubicacion'].value;
    this.negocio.id_administrador=this.sesiones.persona[0].id;
    this.negocio.token=this.sesiones.persona[0].token
    this.body.negocio=[this.negocio];
    console.log(this.body);
    this.forma.reset();
    this.servicio_negocio.putEditarNegocio(this.body).subscribe(data=>{
      console.log(data);
      this.enrutador.navigate(['Administrador']);
    })
  }

}
