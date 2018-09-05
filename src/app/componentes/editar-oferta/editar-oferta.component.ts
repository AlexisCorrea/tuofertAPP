import { Component, OnInit } from '@angular/core';
import {  SesionesService} from "../../services/sesiones.service";
import {FormGroup,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { JsonApiBodyRequestOferta } from "../../../model/jsonApiBodyRequestOferta";
import {RegistrarRequestOferta} from '../../../model/registrarRequestOferta';
import {ServicioOfertaService} from '../../services/servicio-oferta.service';
@Component({
  selector: 'app-editar-oferta',
  templateUrl: './editar-oferta.component.html',
  styleUrls: ['./editar-oferta.component.css']
})
export class EditarOfertaComponent implements OnInit {
  forma:FormGroup;

  foto;
  constructor(private sesion:SesionesService,
    private enrutador:Router,
    private servicio_oferta:ServicioOfertaService) {
      console.log(servicio_oferta.oferta.idnegocio);
      this.forma= new FormGroup({
        'producto': new  FormControl(servicio_oferta.oferta.producto),
        'detalle': new FormControl(servicio_oferta.oferta.detalle),
        'valor': new  FormControl(servicio_oferta.oferta.valor),
        'descuento': new  FormControl(servicio_oferta.oferta.descuento),
        'foto': new  FormControl(),
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
  guardar(){
    let descuento = this.forma.controls['descuento'].value;

    var oferta= new RegistrarRequestOferta();
    var body = new JsonApiBodyRequestOferta();
    oferta.id=this.servicio_oferta.oferta.id;
    oferta.producto=this.forma.controls['producto'].value;
    oferta.detalle=this.forma.controls['detalle'].value;
    oferta.valor=this.forma.controls['valor'].value;
    oferta.descuento= descuento == null ? ' ' : descuento;
    oferta.foto=this.servicio_oferta.oferta.foto;
    oferta.idnegocio=this.servicio_oferta.oferta.idnegocio;
    oferta.fecha_inicio=this.forma.controls['fecha_inicio'].value;
    oferta.fecha_final=this.forma.controls['fecha_final'].value;
    body.oferta=[oferta];
    console.log(this.foto);
    this.servicio_oferta.putEditarOferta(body).subscribe(data=>{
      console.log(data);
      if (this.sesion.persona[0].id==='00') {
        this.enrutador.navigate(['Super']);
      }else{
        this.enrutador.navigate(['Administrador']);
      }
      
    })
  }
  upload(event) {
  //  this.foto=event.target.files[0];  
  this.readThis(event.target);
 
  }
  readThis(valor:any){
    var file:File=valor.files[0];
    var myReader:FileReader= new FileReader();
    myReader.onload=(e)=>{
      this.foto=myReader.result;

    }
    myReader.readAsDataURL(file);
    
  }
  
}
