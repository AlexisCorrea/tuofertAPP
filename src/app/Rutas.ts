import {BienvenidaComponent} from '../app/componentes/bienvenida/bienvenida.component';
import { PanelClienteComponent } from "../app/componentes/panel-cliente/panel-cliente.component";
import {EditarNegocioComponent} from '../app/componentes/editar-negocio/editar-negocio.component';
import {Routes, RouterModule} from '@angular/router';
import {EditarOfertaComponent} from "../app/componentes/editar-oferta/editar-oferta.component";
import { RegistrarComponent } from "../app/componentes/registrar/registrar.component";
import { PanelSuperAdministradorComponent } from "../app/componentes/panel-super-administrador/panel-super-administrador.component";
import { ListarPersonaComponent } from "../app/componentes/listar-persona/listar-persona.component";
import {PanelAdministradorComponent} from '../app/componentes/panel-administrador/panel-administrador.component';
import {RegistrarOfertaComponent} from '../app/componentes/registrar-oferta/registrar-oferta.component';

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
  },
  {
    path:'Registro',
    component: RegistrarComponent
  },
  {
    path:'Super',
    component: PanelSuperAdministradorComponent
  },
  {
    path:'RegistrarOferta',
    component: RegistrarOfertaComponent
  },
];

export const routing = RouterModule.forRoot(rutas);