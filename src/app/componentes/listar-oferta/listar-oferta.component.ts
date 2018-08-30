import { Component, OnInit } from '@angular/core';
import { ServicioOfertaService } from "../../services/servicio-oferta.service";

@Component({
  selector: 'app-listar-oferta',
  templateUrl: './listar-oferta.component.html',
  styleUrls: ['./listar-oferta.component.css']
})
export class ListarOfertaComponent implements OnInit {

  constructor(private servicio_oferta:ServicioOfertaService) {
      this.llegarTabla();
   }

  ngOnInit() {
  }
  llegarTabla(){

  }
}
