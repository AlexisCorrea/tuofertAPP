import { Component, OnInit } from '@angular/core';
import { ServicioNegocioService } from '../../services/servicio-negocio.service';
import { JsonApiBodyRequestNegocio } from '../../../model/jsonApiBodyRequestNegocio';
import { SesionesService } from '../../services/sesiones.service';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

import { RegistrarRequestNegocio } from "../../../model/registrarRequestNegocio";
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-registrar-negocio',
  templateUrl: './registrar-negocio.component.html',
  styleUrls: ['./registrar-negocio.component.css']
})
export class RegistrarNegocioComponent implements OnInit {
  body = new JsonApiBodyRequestNegocio();
  negocio = new RegistrarRequestNegocio();
  forma: FormGroup;
  foto: any;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  variable
  error: boolean = false;
  Mensaje: any;
  exito: boolean = false;
  constructor(private enrutador: Router, private servicio_negocio: ServicioNegocioService,
    private sesion: SesionesService, private afStorage: AngularFireStorage) {
    this.forma = new FormGroup({
      'id': new FormControl(this.negocio.id),
      'nombre': new FormControl(this.negocio.nombre, [Validators.required]),
      'nit': new FormControl(this.negocio.nit, [Validators.required]),
      'correo': new FormControl(this.negocio.correo, [Validators.required, Validators.email]),
      'foto': new FormControl(this.negocio.foto),
      'detalle': new FormControl(this.negocio.detalle, [Validators.required]),
      'telefono': new FormControl(this.negocio.telefono, [Validators.required]),
      'tipo': new FormControl(this.negocio.tipo, [Validators.required]),
      'latitud': new FormControl(Validators.required),
      'longitud': new FormControl(Validators.required),
      'ubicacion': new FormControl(this.negocio.ubicacion, [Validators.required])
    });
  }
  upload(event) {
    this.servicio_negocio.getUltimoID().subscribe(data => {
      // const id = Math.random().toString(36).substring(2);
      console.log("esta es la data");
      console.log(data);
      this.ref = this.afStorage.ref("negocio"+data);
      this.task = this.ref.put(event.target.files[0]);
      this.task.then(() => {
        this.ref.getDownloadURL().subscribe((url) => {
          this.variable = url;
          console.log(this.variable);
        });
      });

    })

  }
  ngOnInit() {

  }

  guardar(latitud: string, longitud: string) {
    if (this.validar) {
      this.negocio.id = "";
      this.negocio.nombre = this.forma.controls['nombre'].value;
      this.negocio.nit = this.forma.controls['nit'].value;
      this.negocio.correo = this.forma.controls['correo'].value;
      this.negocio.foto = this.variable==""?'https://firebasestorage.googleapis.com/v0/b/imgtuofertapp.appspot.com/o/icons8-archivo-de-imagen-128.png?alt=media&token=199ef34b-347b-41fb-b26e-8605e2d55439':this.variable;
      this.negocio.detalle = this.forma.controls['detalle'].value;
      this.negocio.telefono = this.forma.controls['telefono'].value;
      this.negocio.tipo = this.forma.controls['tipo'].value;
      this.negocio.ubicacion = this.forma.controls['ubicacion'].value;
      this.negocio.latitud = latitud;
      this.negocio.longitud = longitud;
      this.negocio.id_administrador = this.sesion.persona[0].id;
      this.negocio.token = this.sesion.persona[0].token;
      this.body.negocio = [this.negocio];
      console.log(this.body);
      this.servicio_negocio.postRegistrarNegocio(this.body).subscribe(data => {
        console.log(data);
        this.forma.reset();
        this.exito = true;
        this.enrutador.navigate(['Administrador']);
      },
        err => {
          this.error = true;
          this.Mensaje = "NO se logro registrar el negocio " + err;
        })
    }
  }
  validar(): boolean {
    if (!this.forma.controls['nombre'].valid) {
      this.error = true;
      this.Mensaje = "Ingrese el nombre";
      return false;
    }
    if (!this.forma.controls['nit'].valid) {
      this.error = true;
      this.Mensaje = "Ingrese el nit";
      return false;
    }
    if (!this.forma.controls['correo'].valid) {
      if (this.forma.controls['correo'].hasError('email')) {
        this.error = true;
        this.Mensaje = "Correo incorrecto";
        return false;
      }
      this.error = true;
      this.Mensaje = "Ingrese correo";
      return false;
    }
    if (!this.forma.controls['detalle'].valid) {
      this.error = true;
      this.Mensaje = "Ingrese detalle";
      return false;
    }
    if (!this.forma.controls['telefono'].valid) {
      this.error = true;
      this.Mensaje = "Ingrese telefono";
      return false;
    }
    if (!this.forma.controls['tipo'].valid) {
      this.error = true;
      this.Mensaje = "Selecione el tipo de negocio";
      return false;
    }
    if (!this.forma.controls['ubicacion'].valid) {
      this.error = true;
      this.Mensaje = "Ingrese la ubicacion";
      return false;
    }
    if (!this.forma.controls['latitud'].valid) {
      this.error = true;
      this.Mensaje = "Ingrese una ubicacion correcta";
      return false;
    }
    if (!this.forma.controls['logintud'].valid) {
      this.error = true;
      this.Mensaje = "Ingrese una ubicacion correcta";
      return false;
    }
    return true;

  }

}
