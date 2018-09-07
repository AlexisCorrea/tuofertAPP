import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SesionesService} from "../../services/sesiones.service";

@Component({
  selector: 'app-panel-cliente',
  templateUrl: './panel-cliente.component.html',
  styleUrls: ['./panel-cliente.component.css']
})
export class PanelClienteComponent implements OnInit {
  panel=1;
  constructor(private sesion:SesionesService,
    private enrutador:Router) { }

  ngOnInit() {
  }
  salir(){
    this.sesion.persona=null;
    this.enrutador.navigate(['Bienvenida']);
  }

}
