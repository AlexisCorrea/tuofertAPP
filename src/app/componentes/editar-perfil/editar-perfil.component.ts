import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonApiBodyRequestPersona } from '../../../model/jsonApiBodyRequestPersona';
import { RegistrarRequestPersona } from "../../../model/registrarRequestPersona";
import { ServicioPersonaService } from "../../services/servicio-persona.service";
import { SesionesService } from "../../services/sesiones.service";
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  persona = new RegistrarRequestPersona();
  body = new JsonApiBodyRequestPersona();
  forma: FormGroup;
  error: boolean = false;
  Mensaje: any;
  exito: boolean = false;
  constructor(private sesion: SesionesService, private servicio_persona: ServicioPersonaService,
    private enrutador: Router) {
    this.forma = new FormGroup({
      'nombre': new FormControl(sesion.persona[0].nombre, [Validators.required]),
      'apellidos': new FormControl(sesion.persona[0].apellidos, [Validators.required]),
      'contrasena': new FormControl(sesion.persona[0].contrasena, [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])\\S{8,16}$')]),
      'confirmacion': new FormControl(sesion.persona[0].contrasena, [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])\\S{8,16}$')]),
      'telefono': new FormControl(sesion.persona[0].telefono),
      'ciudad': new FormControl(sesion.persona[0].ciudad),
      'genero': new FormControl(sesion.persona[0].genero, [Validators.required])
    })
  }

  ngOnInit() {
  }
  guardar() {
    if (this.validacion()) {
      console.log(this.forma);
      this.persona.id = this.sesion.persona[0].id;
      this.persona.nombre = this.forma.controls['nombre'].value;
      this.persona.apellidos = this.forma.controls['apellidos'].value;
      this.persona.contrasena = this.forma.controls['contrasena'].value;
      this.persona.ciudad = this.forma.controls['ciudad'].value;
      this.persona.correo = this.sesion.persona[0].correo;
      this.persona.estado = "Activo";
      this.persona.genero = this.forma.controls['genero'].value;
      this.persona.rol = this.sesion.persona[0].rol;
      this.persona.telefono = this.forma.controls['telefono'].value
      this.persona.token = this.sesion.persona[0].token;
      this.body.persona=[this.persona];
      this.servicio_persona.putEditarPersonas(this.body).subscribe(data=>{
        this.exito=true;
        this.Mensaje="Perfil editado con exito";
        this.forma.reset();
        this.enrutar();
      },
      err=>{
        this.error=true;
        this.Mensaje="No se pudo editar perfil";
      })
    }
  }
  validacion(): boolean {
    if (!this.forma.controls['nombre'].valid) {
      this.error = true;
      this.Mensaje = "ingrese un nombre";
      return false;
    }
    if (!this.forma.controls['apellidos'].valid) {
      this.error = true;
      this.Mensaje = "ingrese apellido";
      return false;
    }
    if (!this.forma.controls['contrasena'].valid) {
      this.error = true;
      this.Mensaje = " la contrasena debe contener minimo 8 caracteres que combinen letra mayusculas y minuculas un numero y un simbolo";
      return false;
    }
    if (!this.forma.controls['confirmacion'].valid) {
      this.error = true;
      this.Mensaje = " la contrasena debe contener minimo 8 caracteres que combinen letra mayusculas y minuculas un numero y un simbolo";
      return false;
    }
    if (!this.forma.controls['genero'].valid) {
      this.error = true;
      this.Mensaje = "Selecione un generpo";
      return false;
    }
    if (this.forma.controls['contrasena'].value != this.forma.controls['confirmacion'].value) {
      this.error = true;
      this.Mensaje = "Las contraseñas no coinciden";
      return false;
    }
    return true;
  }
  enrutar(){
    if (this.sesion.persona[0].rol==="Administrador") {
      this.enrutador.navigate(['Administrador']);
    }else{
     this.enrutador.navigate(['Cliente']);
    }
  }
}
