import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Usuarios } from 'src/app/entidades/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  PATH_BACKEND = "http://localhost:" + "5163"

  URL_GET = this.PATH_BACKEND + "/api/Usuarios/GetAllUsuarios";
  URL_GETBYID = this.PATH_BACKEND + "/api/Usuarios/GetUsuariosById";
  URL_ADD = this.PATH_BACKEND + "/api/Usuarios/AddUsuario";
  URL_UPDATE = this.PATH_BACKEND + "/api/Usuarios/UpdateUsuario";
  URL_DELETE = this.PATH_BACKEND + "/api/Usuarios/DeleteUsuario";
  

  constructor(private httpClient: HttpClient) {
  }

  public GetUsuarios(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.URL_GET,
        { observe: 'response' })
      .pipe();
  }

  public  GetById(id: number): Observable<HttpResponse<any>> {
    const url = `${this.URL_GETBYID}?id=${id}`;
    return this.httpClient
      .post<any>(url,
        { observe: 'response' })
      .pipe();
  }

  public getObtenerById(id: string): Observable<HttpResponse<any>> {
    var parametros = new HttpParams();
    parametros = parametros.set('id', id);

    const url = `${this.URL_GETBYID}`;
    
    return this.httpClient
      .get<any>(url, {params:parametros, observe: 'response' })
      .pipe();
  }

  public AddUsuario(entidad: Usuarios): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.URL_ADD, entidad,
        { observe: 'response' })
      .pipe();
  }

  public Update(entidad: Usuarios): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.URL_UPDATE, entidad,
        { observe: 'response' })
      .pipe();
  }

  public Delete(id: number): Observable<HttpResponse<any>> {
    const url = `${this.URL_DELETE}?id=${id}`;
    return this.httpClient
      .delete<any>(url,
        { observe: 'response' })
      .pipe();
  }


}
