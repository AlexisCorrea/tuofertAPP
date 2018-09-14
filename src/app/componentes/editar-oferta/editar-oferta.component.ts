import { Component, OnInit } from '@angular/core';
import {  SesionesService} from "../../services/sesiones.service";
import {FormGroup,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { JsonApiBodyRequestOferta } from "../../../model/jsonApiBodyRequestOferta";
import {RegistrarRequestOferta} from '../../../model/registrarRequestOferta';
import {ServicioOfertaService} from '../../services/servicio-oferta.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
@Component({
  selector: 'app-editar-oferta',
  templateUrl: './editar-oferta.component.html',
  styleUrls: ['./editar-oferta.component.css']
})
export class EditarOfertaComponent implements OnInit {
  forma:FormGroup;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  variable:any;
  foto;
  constructor(private sesion:SesionesService,
    private enrutador:Router,
    private servicio_oferta:ServicioOfertaService,
    private afStorage: AngularFireStorage) {
      console.log(servicio_oferta.oferta.idnegocio);
      this.forma= new FormGroup({
        'producto': new  FormControl(servicio_oferta.oferta.producto),
        'detalle': new FormControl(servicio_oferta.oferta.detalle),
        'valor': new  FormControl(servicio_oferta.oferta.valor),
        'descuento': new  FormControl(servicio_oferta.oferta.descuento),
        'foto': new  FormControl(),
        'tipo': new  FormControl(servicio_oferta.oferta.tipo),
        'fecha_inicio': new  FormControl(servicio_oferta.oferta.fecha_inicio),
        'fecha_final': new  FormControl(servicio_oferta.oferta.fecha_final),
        //  'ubicacion': new  FormControl(servicio_oferta.oferta.ubicacion)
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
      this.ref = this.afStorage.ref("oferta"+this.servicio_oferta.oferta.id);
      this.task = this.ref.put(event.target.files[0]);
      this.task.then(() => {
        this.ref.getDownloadURL().subscribe((url) => {
         this.variable=url
        });
      });
      
  }
  guardar(){
    let descuento = this.forma.controls['descuento'].value;

    var oferta= new RegistrarRequestOferta();
    var body = new JsonApiBodyRequestOferta();
    oferta.id=this.servicio_oferta.oferta.id;
    oferta.producto=this.forma.controls['producto'].value;
    oferta.detalle=this.forma.controls['detalle'].value;
    oferta.valor=this.forma.controls['valor'].value;
    oferta.descuento= descuento == null ? ' ' : descuento;
    oferta.foto=this.variable==""?this.servicio_oferta.oferta.foto:this.variable;
    oferta.idnegocio=this.servicio_oferta.oferta.idnegocio;
    oferta.tipo=this.forma.controls['tipo'].value;
    oferta.fecha_inicio=this.forma.controls['fecha_inicio'].value;
    oferta.fecha_final=this.forma.controls['fecha_final'].value;
    body.oferta=[oferta];
    console.log(this.foto);
    this.servicio_oferta.putEditarOferta(body).subscribe(data=>{
      console.log(data);
      if (this.sesion.persona[0].id==='00') {
        this.servicio_oferta.oferta=null;
        this.enrutador.navigate(['Super']);
      }else{
        this.servicio_oferta.oferta=null;
        this.enrutador.navigate(['Administrador']);
      }
      
    })
  }
 
}
