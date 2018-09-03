import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { RegistrarNegocioComponent } from './componentes/registrar-negocio/registrar-negocio.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

//servicios
import { ServicioOfertaService } from "../app/services/servicio-oferta.service";
import {LoginService} from './services/login.service';
import {ServicioPersonaService} from './services/servicio-persona.service';
import {ServicioNegocioService} from './services/servicio-negocio.service';
import { SesionesService } from "../app/services/sesiones.service";
//rutas
import {routing} from './Rutas';

//api redes sociales
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";
import { PanelAdministradorComponent } from './componentes/panel-administrador/panel-administrador.component';
import { PanelClienteComponent } from './componentes/panel-cliente/panel-cliente.component';
import { RegistrarOfertaComponent } from './componentes/registrar-oferta/registrar-oferta.component';
import { ListarOfertaComponent } from './componentes/listar-oferta/listar-oferta.component';
import { ListarNegociosComponent } from './componentes/listar-negocios/listar-negocios.component';
import { ListarPersonaComponent } from './componentes/listar-persona/listar-persona.component';
import { EditarNegocioComponent } from './componentes/editar-negocio/editar-negocio.component';
import { EditarPerfilAdministradorComponent } from './componentes/editar-perfil-administrador/editar-perfil-administrador.component';
import { EditarOfertaComponent } from './componentes/editar-oferta/editar-oferta.component';


// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('1741130925956511')
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('601849367140-6k319jsmtut4oqk3ihdbeolanof3d56m.apps.googleusercontent.com')
        }
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    LoginComponent,
    RegistrarComponent,
    RegistrarNegocioComponent,
    PanelAdministradorComponent,
    PanelClienteComponent,
    RegistrarOfertaComponent,
    ListarOfertaComponent,
    ListarNegociosComponent,
    ListarPersonaComponent,
    EditarNegocioComponent,
    EditarPerfilAdministradorComponent,
    EditarOfertaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
    SocialLoginModule
  ],
  providers: [
    ServicioNegocioService,
    LoginService,
    ServicioPersonaService,
    ServicioOfertaService,
    SesionesService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
