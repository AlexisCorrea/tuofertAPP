import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
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
  constructor(private servicio_oferta:ServicioOfertaService,
   private servicio_negocio:ServicioNegocioService,
   private enrutador:Router,
   private afStorage: AngularFireStorage) { 
    this.forma= new FormGroup({
      'producto': new FormControl(""),
      'detalle': new FormControl(""),
      'valor': new FormControl(""),
      'descuento': new FormControl(""),
      'foto': new FormControl(""),
      'tipo': new FormControl(""),
      'fecha_inicio': new FormControl(""),
      'fecha_final': new FormControl("")
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
      console.log(data);
      
      this.enrutador.navigate(['Administrador']);
    })
  
  }
  
}
