import {BienvenidaComponent} from '../app/componentes/bienvenida/bienvenida.component';
import {RegistrarComponent} from '../app/componentes/registrar/registrar.component';
import {LoginComponent} from '../app/componentes/login/login.component';
import {RegistrarNegocioComponent} from '../app/componentes/registrar-negocio/registrar-negocio.component';
import {Routes, RouterModule} from '@angular/router';
import {ListarPersonaComponent} from '../app/componentes/listar-persona/listar-persona.component';
import {PanelAdministradorComponent} from '../app/componentes/panel-administrador/panel-administrador.component';
const rutas: Routes = [
  {path: '', component: PanelAdministradorComponent, pathMatch: 'full' },
  {
    path: 'Bienvenida',
    component: BienvenidaComponent
  },

  {
    path: 'Registro',
    component: RegistrarComponent
  },
   {
    path: 'RegistroNegocio',
    component: RegistrarNegocioComponent
  }
];

export const routing = RouterModule.forRoot(rutas);