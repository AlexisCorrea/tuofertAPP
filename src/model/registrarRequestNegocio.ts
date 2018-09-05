/**
 * Microservicio orquestador
 * microservicio orquestador para conectar los microservicios de persona, oferta y negocio
 *
 * OpenAPI spec version: 1.0.0
 * Contact: alexis.correa@accenture.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export class RegistrarRequestNegocio {
    id: string;
    nombre: string;
    nit: string;
    correo:string;
    foto: string;
    detalle:string;
    tipo: string;
    telefono:string;
    ubicacion: string;
    id_administrador: string;
    token:string;
    latitud:string;
    longitud:string;
    constructor(){
        
    }
    valor(){
        return this.nombre;
    }
}
