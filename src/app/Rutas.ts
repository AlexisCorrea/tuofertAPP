import {BienvenidaComponent} from '../app/componentes/bienvenida/bienvenida.component';
import { PanelClienteComponent } from "../app/componentes/panel-cliente/panel-cliente.component";

import {Routes, RouterModule} from '@angular/router';

import {PanelAdministradorComponent} from '../app/componentes/panel-administrador/panel-administrador.component';
const rutas: Routes = [
  {path: '', component: BienvenidaComponent, pathMatch: 'full' },
  {
    path: 'Bienvenida',
    component: BienvenidaComponent
  },
  {
    path:'Administrador',
    component: PanelAdministradorComponent
  },
  {
    path:'Cliente',
    component: PanelClienteComponent
  }
  // {
  //   path: 'Registro',
  //   component: RegistrarComponent
  // },
  //  {
  //   path: 'RegistroNegocio',
  //   component: RegistrarNegocioComponent
  // }
];

export const routing = RouterModule.forRoot(rutas);