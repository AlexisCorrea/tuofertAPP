import { Component, OnInit } from '@angular/core';
import { SesionesService } from "../../services/sesiones.service";
import { Router } from '@angular/router';
import {ServicioNegocioService} from '../../services/servicio-negocio.service';
@Component({
  selector: 'app-panel-administrador',
  templateUrl: './panel-administrador.component.html',
  styleUrls: ['./panel-administrador.component.css']
})
export class PanelAdministradorComponent implements OnInit{
  panel;
  

  constructor(private sesion:SesionesService,private servicio_negocio:ServicioNegocioService,
  private enrutador:Router) {
    try {
      console.log(sesion.persona[0]);
    } catch (error) {
      alert("error logearse primero");
      this.enrutador.navigate(['Bienvenida']);
    }
   }
   
  ngOnInit() {
  }

  public asignarpanel(numero){
    this.panel=numero;
    console.log(this.panel);
  }
  salir(){
    this.sesion.persona=[];
    this.enrutador.navigate(['Bienvenida']);
  }
}
