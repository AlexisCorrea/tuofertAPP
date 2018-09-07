import { Component, OnInit } from '@angular/core';
import {JsonApiBodyRequestPersona} from '../../../model/jsonApiBodyRequestPersona';
import {ServicioPersonaService} from '../../services/servicio-persona.service';
import { Router } from '@angular/router';
import { SesionesService } from '../../services/sesiones.service';
import {DeleteRequestPersona} from '../../../model/deleteRequestPersona';
import {JsonApiBodyRequestDeletePersona} from '../../../model/jsonApiBodyRequestDeletePersona';

@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrls: ['./listar-persona.component.css']
})
export class ListarPersonaComponent implements OnInit {
  personas = new JsonApiBodyRequestPersona;
  personaEliminar= new DeleteRequestPersona();
  bodyEliminar = new JsonApiBodyRequestDeletePersona();
  respuesta:any;
  constructor(private servicio_persona:ServicioPersonaService,
    private sesion:SesionesService,
    private enrutador:Router) {
    this.llenarTabla();
   }

  ngOnInit() {

  }
  editar(index){
    console.log("estamos en editar");
    this.servicio_persona.perosonaEditar=this.personas.persona[index];
    this.enrutador.navigate(['EditarPersona']);

  }
  eliminar(id){
    this.personaEliminar.id=id;
    this.personaEliminar.token=this.sesion.persona[0].token;
    this.bodyEliminar.persona=[this.personaEliminar];
    console.log(this.bodyEliminar);
    this.servicio_persona.deleteEliminarPersonas(this.bodyEliminar).subscribe(data=>{
      console.log(data);
      this.llenarTabla();
    });
  }
  llenarTabla(){
    this.servicio_persona.getListarPersonas().subscribe(data=>{
      this.respuesta=data;
      this.personas=this.respuesta;
    })
  }

}
