import { Component, OnInit } from '@angular/core';
import {ServicioNegocioService} from '../../services/servicio-negocio.service';
import {JsonApiBodyRequestNegocio} from '../../../model/jsonApiBodyRequestNegocio';
import {SesionesService} from '../../services/sesiones.service';

import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

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
  foto:any;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  variable

  constructor(private servicio_negocio: ServicioNegocioService,
    private sesion:SesionesService ,private afStorage: AngularFireStorage) {
    this.forma= new FormGroup({
      'id': new FormControl(this.negocio.id),
      'nombre': new FormControl(this.negocio.nombre),
      'nit': new FormControl(this.negocio.nit),
      'correo': new FormControl(this.negocio.correo),
      'foto': new FormControl(this.negocio.foto),
      'detalle': new FormControl(this.negocio.detalle),
      'telefono': new FormControl(this.negocio.telefono),
      'tipo': new FormControl(this.negocio.tipo),
      'latitud': new FormControl(),
      'longitud': new FormControl(),
      'ubicacion': new FormControl(this.negocio.ubicacion)
      });
   }
   upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.task.then(() => {
      this.ref.getDownloadURL().subscribe((url) => {
        this.variable= url;
        console.log(this.variable);
      });
    });
   
  }
  ngOnInit() {

  }
 
  guardar(latitud: string, longitud: string){
    this.negocio.id="";
    this.negocio.nombre= this.forma.controls['nombre'].value;
    this.negocio.nit= this.forma.controls['nit'].value;
    this.negocio.correo= this.forma.controls['correo'].value;
    this.negocio.foto=this.variable;
    this.negocio.detalle= this.forma.controls['detalle'].value;
    this.negocio.telefono= this.forma.controls['telefono'].value;
    this.negocio.tipo= this.forma.controls['tipo'].value;
    this.negocio.ubicacion= this.forma.controls['ubicacion'].value;
    this.negocio.latitud=latitud;
    this.negocio.longitud=longitud;
    this.negocio.id_administrador= this.sesion.persona[0].id;
    this.negocio.token=this.sesion.persona[0].token;
    this.body.negocio=[this.negocio];
   console.log(this.body);
    this.servicio_negocio.postRegistrarNegocio(this.body).subscribe(data=>{
      console.log(data);
      this.forma.reset();
      
    })
  }

}
