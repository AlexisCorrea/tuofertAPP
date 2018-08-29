import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms'
import {JsonApiBodyRequestPersona} from '../../../model/jsonApiBodyRequestPersona';
import {RegistrarRequestPersona } from "../../../model/registrarRequestPersona";
import { ServicioPersonaService } from "../../services/servicio-persona.service";
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  body= new JsonApiBodyRequestPersona();
  persona= new RegistrarRequestPersona();
  forma:FormGroup;
  constructor(private servicio_persona:ServicioPersonaService) {
    this.forma= new FormGroup({
      'nombre': new FormControl(""),
      'apellidos': new FormControl(""),
      'correo': new FormControl(""),
      'contrasena': new FormControl(""),
      'confirmacion': new FormControl(""),
      'telefono': new FormControl(""),
      'ciudad': new FormControl(""),
      'rol': new FormControl(""),
      'genero': new FormControl("")
    })
   }

  ngOnInit() {
  }
  guardar(){
    this.persona.id="";
    this.persona.nombre=this.forma.controls['nombre'].value;
    this.persona.apellido=this.forma.controls['apellidos'].value;
    this.persona.correo=this.forma.controls['correo'].value;
    this.persona.contrasena=this.forma.controls['contrasena'].value;
    this.persona.telefono=this.forma.controls['telefono'].value;
    this.persona.ciudad=this.forma.controls['ciudad'].value;
    this.persona.rol=this.forma.controls['rol'].value;
    this.persona.genero=this.forma.controls['genero'].value;
    this.persona.estado="activo";
    this.persona.token="";
    this.body.persona=[this.persona];
    console.log(this.body);
    this.servicio_persona.postRegistrarPersona(this.body).subscribe(data=>{
      console.log(data);
    })

  }
}
