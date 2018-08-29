import { Component, OnInit } from '@angular/core';
import {JsonApiBodyRequestPersona} from '../../../model/jsonApiBodyRequestPersona';
import {ServicioPersonaService} from '../../services/servicio-persona.service';
@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrls: ['./listar-persona.component.css']
})
export class ListarPersonaComponent implements OnInit {
  personas = new JsonApiBodyRequestPersona;
  respuesta:any;
  constructor(private servicio_persona:ServicioPersonaService) {
    this.llenarTabla();
   }

  ngOnInit() {

  }
  llenarTabla(){
    this.servicio_persona.getListarPersonas().subscribe(data=>{
      this.respuesta=data;
      this.personas=this.respuesta;
    })
  }

}
