import { Component, OnInit } from '@angular/core';
import { SesionesService } from "../../services/sesiones.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-panel-super-administrador',
  templateUrl: './panel-super-administrador.component.html',
  styleUrls: ['./panel-super-administrador.component.css']
})
export class PanelSuperAdministradorComponent implements OnInit {

  constructor(private sesion:SesionesService,
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
  salir(){
    this.sesion.persona=[];
    this.enrutador.navigate(['Bienvenida']);
  }

}
