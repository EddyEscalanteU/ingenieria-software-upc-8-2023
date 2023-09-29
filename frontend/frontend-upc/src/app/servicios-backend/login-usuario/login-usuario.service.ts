import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Usuarios } from 'src/app/entidades/usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoginUsuarioService {

  PATH_BACKEND = "http://localhost:" + "5163/";
  URL_LOGIN = this.PATH_BACKEND + "api/UsuarioAuthentication/UserLogin";
  URL_CHANGE_PASS = this.PATH_BACKEND + "api/UsuarioAuthentication/CambiarContrasenia";
  URL_AUTENTICACIONI= this.PATH_BACKEND +"api/UsuarioAuthentication/atenticacionToken";

  constructor(private httpClient: HttpClient) { 

  }

  public inisiarSesion(inUser: string, inPass: string):Observable<HttpResponse<any>>{
    var parametros = new HttpParams();
    parametros = parametros.set('inUser', inUser);
    parametros = parametros.set('inPass', inPass);

    const url = `${this.URL_LOGIN}`;
    
    return this.httpClient
      .get<any>(url, {params:parametros, observe: 'response' })
      .pipe();
  }

  public changePassword(oldPass: string, newPass: string):Observable<HttpResponse<any>>{
    var parametros = new HttpParams();
    parametros = parametros.set('oldPass', oldPass);
    parametros = parametros.set('newPass', newPass);
    const url = `${this.URL_CHANGE_PASS}`;
    // alert({params:parametros, observe: 'response' });
    
    return this.httpClient
      .get<any>(url, {params:parametros, observe: 'response'})
      .pipe();
  }

  public autenticarToken():Observable<HttpResponse<any>>{
    var parametros = new HttpParams();
    const url = `${this.URL_AUTENTICACIONI}`;
    
    return this.httpClient
      .get<any>(url, {params:parametros, observe: 'response'})
      .pipe();
  }


}

