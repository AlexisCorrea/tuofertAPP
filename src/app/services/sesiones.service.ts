import { Injectable } from '@angular/core';
import { RegistrarRequestPersona } from '../../model/registrarRequestPersona';

@Injectable({
  providedIn: 'root'
})
export class SesionesService {
  public persona: Array<RegistrarRequestPersona>;
  validarSesion:boolean=false;
  iniciales:string;
  constructor() { 

  }
}
