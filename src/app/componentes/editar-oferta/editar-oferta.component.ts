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


  constructor(private sesiones:SesionesService,
    private enrutador:Router,
    private servicio_oferta:ServicioOfertaService) {
      console.log(servicio_oferta.oferta.idnegocio);
      this.forma= new FormGroup({
        'producto': new  FormControl(servicio_oferta.oferta.producto),
        'detalle': new FormControl(servicio_oferta.oferta.detalle),
        'valor': new  FormControl(servicio_oferta.oferta.valor),
        'descuento': new  FormControl(servicio_oferta.oferta.descuento),
        'foto': new  FormControl(servicio_oferta.oferta.foto),
        'fecha_inicio': new  FormControl(servicio_oferta.oferta.fecha_inicio),
        'fecha_final': new  FormControl(servicio_oferta.oferta.fecha_final),
        // 'ubicacion': new  FormControl(servicio_oferta.oferta.ubicacion)
        });
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
    oferta.foto=this.forma.controls['foto'].value;
    oferta.idnegocio=this.servicio_oferta.oferta.idnegocio;
    oferta.fecha_inicio=this.forma.controls['fecha_inicio'].value;
    oferta.fecha_final=this.forma.controls['fecha_final'].value;
    body.oferta=[oferta];
    this.servicio_oferta.putEditarOferta(body).subscribe(data=>{
      console.log(data);
      this.enrutador.navigate(['Administrador']);
    })
  }

}
