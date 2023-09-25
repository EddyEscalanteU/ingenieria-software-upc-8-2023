import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from 'src/app/entidades/usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoginUsuarioService {

  PATH_BACKEND = "http://localhost:" + "5163/";
  URL_LOGIN = this.PATH_BACKEND + "api/UsuarioAuthentication/UserLogin";
  URL_CHANGE_PASS = this.PATH_BACKEND + "api/UsuarioAuthentication/CambiarContrasenia";

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
    parametros = parametros.set('newPas', newPass);

    const url = `${this.URL_CHANGE_PASS}`;
    
    return this.httpClient
      .post<any>(url, {params:parametros, observe: 'response' })
      .pipe();
  }


  public changePassword2(oldPass: string, newPass: string, options?: any): Observable<any> {
    const url = this.URL_CHANGE_PASS;
    const body = { oldPass: oldPass, newPass: newPass };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(url, body, options);
  }
}

