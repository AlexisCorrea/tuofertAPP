import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms'
import {JsonApiBodyLogin} from '../../../model/jsonApiBodyLogin';
import{LoginRequest}from '../../../model/loginRequest';
import {LoginService} from '../../services/login.service';
import{JsonApiBodyRequestPersona}from '../../../model/jsonApiBodyRequestPersona';
import {RegistrarRequestPersona} from '../../../model/registrarRequestPersona';
import { Router } from '@angular/router';
import { SesionesService } from "../../services/sesiones.service";
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  respuesta= new JsonApiBodyRequestPersona;
  forma:FormGroup;
  persona=new LoginRequest;
  body= new JsonApiBodyLogin;
  error:boolean=false;
  Mensaje:any;
  
  constructor(private servicioLogin: LoginService,private socialAuthService: AuthService, private enrutador: Router,private sesion:SesionesService ) {
    console.log("login");
    this.forma= new FormGroup({
    'correo': new FormControl(this.persona.correo),
      'contrasena': new FormControl(this.persona.contrasena)
    });
   }

  ngOnInit() {
  }
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        this.enrutador.navigate(['Cliente']);
      },
      err=>{
        console.log(err);
      }
    );
  }
  

  logear(){
    this.persona.correo=this.forma.controls['correo'].value;
    this.persona.contrasena=this.forma.controls['contrasena'].value;
    this.body.persona=[this.persona];
    this.servicioLogin.postLogin(this.body).subscribe(data=>{
      try {

      this.respuesta.persona=[data]
      
      this.procesar(this.respuesta.persona[0]);
      } catch (error) {
        this.error=true;
        this.Mensaje="Correo o contraseña no validos";
        this.forma.reset();
        
      }
    },
    error=>{
      error=true;
      this.Mensaje="Error al momento de logearse";
    }
  )

  }
  procesar(respuesta){
    console.log(respuesta.persona[0].rol);
    if (respuesta.persona[0].estado==="INACTIVO") {
      this.error=true;
      this.Mensaje="Correo o contraseña incorrecta";
    }
    if (respuesta.persona[0].rol  ==="administrador" || respuesta.persona[0].rol==="Administrador") {
      this.sesion.persona=[respuesta.persona[0]];
      this.enrutador.navigate(['Administrador']);
    }else if (respuesta.persona[0].rol==="Cliente" || respuesta.persona[0].rol==="cliente") {
      this.sesion.persona=[respuesta.persona[0]];
      this.enrutador.navigate(['Cliente']);
    } else{
      this.sesion.persona=[respuesta.persona[0]];
      this.enrutador.navigate(['Super']);
     
      // this.enrutador.navigate(['Super']);
    }

  }
}
