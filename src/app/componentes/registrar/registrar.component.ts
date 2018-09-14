import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonApiBodyRequestPersona } from '../../../model/jsonApiBodyRequestPersona';
import { RegistrarRequestPersona } from "../../../model/registrarRequestPersona";
import { ServicioPersonaService } from "../../services/servicio-persona.service";
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  body = new JsonApiBodyRequestPersona();
  persona = new RegistrarRequestPersona();
  forma: FormGroup;
  error: boolean = false;
  Mensaje: any;
  exito:boolean=false;
  constructor(private servicio_persona: ServicioPersonaService,
    private enrutador: Router) {
    this.forma = new FormGroup({
      'nombre': new FormControl("", [Validators.required]),
      'apellidos': new FormControl("",[Validators.required]),
      'correo': new FormControl("",[Validators.required,Validators.email]),
      'contrasena': new FormControl("",[Validators.required,Validators.pattern('^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])\\S{8,16}$')]),
      'confirmacion': new FormControl("",[Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])\\S{8,16}$')]),
      'telefono': new FormControl(""),
      'ciudad': new FormControl(""),
      'rol': new FormControl("",[Validators.required]),
      'genero': new FormControl("",[Validators.required])
    })
  }

  ngOnInit() {
  }
  
  guardar() {
    console.log(this.forma.controls);
    if(this.validacion()){
    this.error = false;
    this.persona.id = "";
    this.persona.nombre = this.forma.controls['nombre'].value;
    this.persona.apellidos = this.forma.controls['apellidos'].value;
    this.persona.correo = this.forma.controls['correo'].value;
    this.persona.contrasena = this.forma.controls['contrasena'].value;
    this.persona.telefono = this.forma.controls['telefono'].value==null?'':this.forma.controls['telefono'].value;
    this.persona.ciudad = this.forma.controls['ciudad'].value==null?'':this.forma.controls['ciudad'].value;
    
    this.persona.rol = this.forma.controls['rol'].value;
    this.persona.genero = this.forma.controls['genero'].value;
    this.persona.estado = "Activo";
    this.persona.token = "";
    this.body.persona = [this.persona];
    console.log(this.body);
    this.servicio_persona.postRegistrarPersona(this.body).subscribe(data => {
      this.enrutador.navigate(['Bienvenida']);
    },
      err => {
        this.error = true;
        this.Mensaje = "Error no se pudo registrar";
      })
      this.exito=true;
    }
  }
  validacion():boolean {
    if (!this.forma.controls['nombre'].valid) {
      this.error=true;
      this.Mensaje="ingrese un nombre";
      return false;
    }
    if (!this.forma.controls['apellidos'].valid) {
      this.error=true;
      this.Mensaje="ingrese apellido";
      return false;
    }
    if (!this.forma.controls['correo'].valid) {
      if (this.forma.controls['correo'].hasError('email')) {
        this.error=true;
        this.Mensaje="ingrese un correo correcto";
        return false;
      }
      this.error=true;
      this.Mensaje="correo no es correcto";
      return false;
    }
    if (!this.forma.controls['contrasena'].valid) {
      this.error=true;
      this.Mensaje=" la contrasena debe contener minimo 8 caracteres que combinen letra mayusculas y minuculas un numero y un simbolo";
      return false;
    }
    if (!this.forma.controls['confirmacion'].valid) {
      this.error=true;
      this.Mensaje=" la contrasena debe contener minimo 8 caracteres que combinen letra mayusculas y minuculas un numero y un simbolo";
      return false;
    }
    if (!this.forma.controls['rol'].valid) {
      this.error=true;
      this.Mensaje="Selecione si es usuario o administrador";
      return false;
    }
    if (!this.forma.controls['genero'].valid) {
      this.error=true;
      this.Mensaje="Selecione un generpo";
      return false;
    }
    if (this.forma.controls['contrasena'].value!=this.forma.controls['confirmacion'].value) {
      this.error=true;
      this.Mensaje="Las contraseñas no coinciden";
      return false;
    }
    return true;
  }
}
