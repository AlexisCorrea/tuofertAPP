import { Component, OnInit ,Input} from '@angular/core';
import { SesionesService } from "../../services/sesiones.service";
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-panel-administrador',
  templateUrl: './panel-administrador.component.html',
  styleUrls: ['./panel-administrador.component.css']
})
export class PanelAdministradorComponent implements OnInit {
  panel;
  @Input('texto1') prop:string;

  constructor(private sesion:SesionesService) {
    
    console.log(this.sesion.persona[0]);
   }
 
  ngOnInit() {
    try {
      console.log(this.prop);
    } catch (error) {
      
    }
    
  }

}
