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

  public changePasswordx(oldPass: string, newPass: string): Observable<HttpResponse<any>> {
    const url = `${this.URL_CHANGE_PASS}`;
    const body = { oldPass: oldPass, newPass: newPass };
  
    return this.httpClient.post<any>(url, body, { observe: 'response' });
  }

  // public async changePassword(oldPass: string, newPass: string, tt:any): Promise<Observable<HttpResponse<any>>>{
  //   const url = `${this.URL_CHANGE_PASS}`;
  //   let params = new HttpParams();
  //   params = params.set('oldPass', oldPass);
  //   params = params.set('newPass', newPass);
  //   let headers = new HttpHeaders();
  //   headers = headers.set("Token", tt);
  //   alert(headers);

  //   const body = { oldPass: oldPass, newPass: newPass };
    
  //   return this.httpClient
  //     .post<any>(url, body, {headers: headers, observe: 'response'})
  //     .pipe();
  // }

  public changePasswordxxx(oldPass: string, newPass: string, tt: string): Observable<HttpResponse<any>> {
    const url = `${this.URL_CHANGE_PASS}`;
    const headers = new HttpHeaders().set("Token", tt);
    const body = {
      oldPass: oldPass,
      newPass: newPass
    };
  
    return this.httpClient
      .post<any>(url, body, { headers: headers, observe: 'response' })
      .pipe();
  }

  // public async changePasswordxx(oldPass: string, newPass: string): Promise<any> {
  //   const url = `${this.URL_CHANGE_PASS}`;
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   const token = await this.storage.get('token');
  //   headers = headers.set('Authorization', `Bearer ${token}`);
  
  //   const body = { oldPass: oldPass, newPass: newPass };
  
  //   return this.httpClient.post<any>(url, body, { headers: headers });
  // }
}

