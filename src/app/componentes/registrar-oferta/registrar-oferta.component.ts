import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { JsonApiBodyRequestOferta } from "../../../model/jsonApiBodyRequestOferta";
import {RegistrarRequestOferta  } from "../.././../model/registrarRequestOferta";
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import {ServicioOfertaService} from '../../services/servicio-oferta.service';
import {ServicioNegocioService} from '../../services/servicio-negocio.service';
import { RegistrarRequestNegocio} from '../../../model/registrarRequestNegocio';
import {JsonApiBodyRequestNegocio} from '../../../model/jsonApiBodyRequestNegocio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-oferta',
  templateUrl: './registrar-oferta.component.html',
  styleUrls: ['./registrar-oferta.component.css']
})
export class RegistrarOfertaComponent implements OnInit {
  oferta = new RegistrarRequestOferta();
  bodyOferta = new JsonApiBodyRequestOferta();
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  forma:FormGroup;
  variable:any;
  error:boolean=true;
  Mensaje:any;
  exito:boolean=false;
  constructor(private servicio_oferta:ServicioOfertaService,
   private servicio_negocio:ServicioNegocioService,
   private enrutador:Router,
   private afStorage: AngularFireStorage) { 
    this.forma= new FormGroup({
      'producto': new FormControl("",[Validators.required]),
      'detalle': new FormControl("",[Validators.required]),
      'valor': new FormControl("",[Validators.required]),
      'descuento': new FormControl(""),
      'foto': new FormControl(""),
      'tipo': new FormControl("",[Validators.required]),
      'fecha_inicio': new FormControl("",[Validators.required]),
      'fecha_final': new FormControl("",[Validators.required])
    })
   }

  ngOnInit() {
  }
  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.task.then(() => {
      this.ref.getDownloadURL().subscribe((url) => {
       this.variable=url
      });
    });
  }
  guardar(){
    if (this.validar()) {
      this.oferta.id="";
      this.oferta.producto=this.forma.controls['producto'].value;
      this.oferta.detalle=this.forma.controls['detalle'].value;
      this.oferta.valor=this.forma.controls['valor'].value;
      this.oferta.descuento=this.forma.controls['descuento'].value;
      this.oferta.foto=this.variable;
      this.oferta.fecha_inicio=this.forma.controls['fecha_inicio'].value;
      this.oferta.fecha_final=this.forma.controls['fecha_final'].value;
      this.oferta.tipo=this.forma.controls['tipo'].value;
      this.oferta.idnegocio=this.servicio_negocio.bodynegocio.id;
      this.bodyOferta.oferta=[this.oferta];
      console.log("este el body que se envia");
      console.log(this.bodyOferta);
      
      this.servicio_oferta.postRegistrarOferta(this.bodyOferta).subscribe(data=>{
       this.exito=true;
        this.enrutador.navigate(['Administrador']);
      },err=>{
        this.error=true;
        this.Mensaje="No se logro registra la oferta "+err;
      })
    }
  }
  validar():boolean{
    if (!this.forma.controls['producto'].value) {
      this.error=true;
      this.Mensaje="Ingrese el producto de oferta";
      return false;
    }
    if (!this.forma.controls['detalle'].value) {
      this.error=true;
      this.Mensaje="Ingrese el detalle";
      return false;
    }
    if (!this.forma.controls['valor'].value) {
      this.error=true;
      this.Mensaje="Ingrese el valor";
      return false;
    }
    if (!this.forma.controls['tipo'].value) {
      this.error=true;
      this.Mensaje="Ingrese el tipo";
      return false;
    }
    if (!this.forma.controls['fecha_inicio'].value) {
      this.error=true;
      this.Mensaje="Ingrese la fecha de inicio";
      return false;
    }
    if (!this.forma.controls['fecha_final'].value) {
      this.error=true;
      this.Mensaje="Ingrese la fecha de fin";
      return false;
    }
    return true;
  }
  
}
