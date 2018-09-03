import {BienvenidaComponent} from '../app/componentes/bienvenida/bienvenida.component';
import { PanelClienteComponent } from "../app/componentes/panel-cliente/panel-cliente.component";
import {EditarNegocioComponent} from '../app/componentes/editar-negocio/editar-negocio.component';
import {Routes, RouterModule} from '@angular/router';
import {EditarOfertaComponent} from "../app/componentes/editar-oferta/editar-oferta.component";

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
  },
  {
    path:'EditarNegocio',
    component: EditarNegocioComponent
  },
  {
    path:'EditarOferta',
    component: EditarOfertaComponent
  }
  
];

export const routing = RouterModule.forRoot(rutas);