import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms'
import { ServicioNegocioService } from "../../services/servicio-negocio.service";
import {  SesionesService} from "../../services/sesiones.service";
import { JsonApiBodyRequestNegocio } from "../../../model/jsonApiBodyRequestNegocio";
import { RegistrarRequestNegocio } from "../../../model/registrarRequestNegocio";
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';


@Component({
  selector: 'app-editar-negocio',
  templateUrl: './editar-negocio.component.html',
  styleUrls: ['./editar-negocio.component.css']
})
export class EditarNegocioComponent implements OnInit {
  forma:FormGroup;
  negocio= new RegistrarRequestNegocio();
  body= new JsonApiBodyRequestNegocio();
  foto: any;
  variable="";
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  constructor(private servicio_negocio:ServicioNegocioService,
    private sesion:SesionesService,
    private enrutador:Router,
    private afStorage: AngularFireStorage
    ) { 
    this.forma= new FormGroup({
      
      'nombre': new  FormControl(servicio_negocio.bodynegocio.nombre),
      'nit': new FormControl(servicio_negocio.bodynegocio.nit),
      'correo': new  FormControl(servicio_negocio.bodynegocio.correo),
      'foto': new  FormControl(),
      'detalle': new  FormControl(servicio_negocio.bodynegocio.detalle),
      'telefono': new  FormControl(servicio_negocio.bodynegocio.telefono),
      'tipo': new  FormControl(servicio_negocio.bodynegocio.tipo),
      'latitud': new  FormControl(),
      'longitud': new  FormControl(),
      'ubicacion': new  FormControl(servicio_negocio.bodynegocio.ubicacion)
      });
      try {
        console.log(sesion.persona[0]);
      } catch (error) {
        alert("error logearse primero");
        this.enrutador.navigate(['Bienvenida']);
      }
  }

  ngOnInit() {
  }
  upload(event) {
    
      // const id = Math.random().toString(36).substring(2);
      
      this.ref = this.afStorage.ref("negocio"+this.servicio_negocio.bodynegocio.id);
      this.task = this.ref.put(event.target.files[0]);
      this.task.then(() => {
        this.ref.getDownloadURL().subscribe((url) => {
          this.variable = url;
          console.log(this.variable);
        });
      });

  }
  guardar(valor1:string,valor2:string){
    
    this.negocio.id=this.servicio_negocio.bodynegocio.id
    this.negocio.nombre=this.forma.controls['nombre'].value;
    this.negocio.nit=this.forma.controls['nit'].value;
    this.negocio.correo=this.forma.controls['correo'].value;
    this.negocio.foto=this.variable==""?this.servicio_negocio.bodynegocio.foto:this.variable;
    this.negocio.detalle=this.forma.controls['detalle'].value;
    this.negocio.telefono=this.forma.controls['telefono'].value;
    this.negocio.tipo=this.forma.controls['tipo'].value;
    this.negocio.ubicacion=this.forma.controls['ubicacion'].value;
    this.negocio.id_administrador=this.servicio_negocio.bodynegocio.id_administrador;
    this.negocio.latitud=valor1==""?this.servicio_negocio.bodynegocio.latitud:valor1;
    this.negocio.longitud=valor2==""?this.servicio_negocio.bodynegocio.latitud:valor2;
    this.negocio.token=this.servicio_negocio.bodynegocio.token;
    this.body.negocio=[this.negocio];
    console.log(this.body);
    this.forma.reset();
    this.servicio_negocio.putEditarNegocio(this.body).subscribe(data=>{
      console.log(data);
      this.servicio_negocio.bodynegocio=null;
      if (this.sesion.persona[0].id==="00") {
        this.enrutador.navigate(['Super']);
      }
      this.enrutador.navigate(['Administrador']);
    },
    error=>{
      console.log(error);
    })
  }

}
