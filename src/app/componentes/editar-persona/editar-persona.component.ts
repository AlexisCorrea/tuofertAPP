import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import {JsonApiBodyRequestPersona} from '../../../model/jsonApiBodyRequestPersona';
import {RegistrarRequestPersona } from "../../../model/registrarRequestPersona";
import { ServicioPersonaService } from "../../services/servicio-persona.service";

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {
  body= new JsonApiBodyRequestPersona();
  persona= new RegistrarRequestPersona();
  forma:FormGroup;
  constructor(private servicio_persona:ServicioPersonaService,
    private enrutador:Router) {
      this.forma= new FormGroup({
        'nombre': new FormControl(servicio_persona.perosonaEditar.nombre),
        'apellidos': new FormControl(servicio_persona.perosonaEditar.apellidos),
        'correo': new FormControl(servicio_persona.perosonaEditar.correo),
        'telefono': new FormControl(servicio_persona.perosonaEditar.telefono),
        'ciudad': new FormControl(servicio_persona.perosonaEditar.ciudad),
        'rol': new FormControl(servicio_persona.perosonaEditar.rol),
        'genero': new FormControl(servicio_persona.perosonaEditar.genero)
      })
     }

  ngOnInit() {
  }
  guardar(){
    this.persona.id = this.servicio_persona.perosonaEditar.id;
    this.persona.nombre=this.forma.controls['nombre'].value;
    this.persona.apellidos=this.forma.controls['apellidos'].value;
    this.persona.contrasena=this.servicio_persona.perosonaEditar.contrasena;
    this.persona.correo=this.forma.controls['correo'].value;
    this.persona.rol=this.forma.controls['rol'].value;
    this.persona.telefono=this.forma.controls['telefono'].value;
    this.persona.token=this.servicio_persona.perosonaEditar.token;
    this.persona.genero=this.forma.controls['genero'].value;
    this.persona.ciudad=this.forma.controls['ciudad'].value;
    this.persona.estado=this.servicio_persona.perosonaEditar.estado;
    this.body.persona=[this.persona];
    this.servicio_persona.putEditarPersonas(this.body).subscribe(data=>{
      console.log(data);
      this.servicio_persona.perosonaEditar=null;
      this.enrutador.navigate(['Super']);
    },
    error=>{
      console.log(error);
    })
   
  }

}
