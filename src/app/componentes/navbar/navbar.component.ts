import { Component, OnInit } from '@angular/core';
import { SesionesService } from '../../services/sesiones.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  constructor(private sesion:SesionesService,private enrutador:Router) {
   
   }

  ngOnInit() {
  }
  salir(){

  }
  editar(){
    this.enrutador.navigate(['EditarPerfil']);
  }
}
