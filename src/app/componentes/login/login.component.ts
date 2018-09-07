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
      }
    );
  }
  

  logiar(){
    this.persona.correo=this.forma.controls['correo'].value;
    this.persona.contrasena=this.forma.controls['contrasena'].value;
    this.body.persona=[this.persona];
    this.servicioLogin.postLogin(this.body).subscribe(data=>{
      try {
      this.respuesta.persona=[data]
      console.log(this.respuesta.persona[0]);
      this.procesar(this.respuesta.persona[0]);
      } catch (error) {
        this.forma.reset();
      alert("correo o contraseña incorrecta");
      }
    },
    error=>{
      this.forma.reset();
      alert("error interno intente mas tarde");
    }
  )

  }
  procesar(respuesta){
    console.log(respuesta.persona[0].rol);
    
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
