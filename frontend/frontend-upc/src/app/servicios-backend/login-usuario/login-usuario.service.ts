import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from 'src/app/entidades/usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoginUsuarioService {

  PATH_BACKEND = "http://localhost:" + "5163/";
  URL_LOGIN = this.PATH_BACKEND + "api/UsuarioAuthentication/UserLogin";
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

  // public cambiarContrasenia(entidad: Usuarios, passOld: string, passNew: string): Observable<HttpResponse<any>> {
  //   return this.httpClient
  //     .post<any>(this.ADD, entidad, { observe: 'response'})
  //     .pipe();
  // }

}
