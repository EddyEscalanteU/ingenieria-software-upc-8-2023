import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { RolesUsuarios } from 'src/app/entidades/roles-usuarios';
import {Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class RolUsuarioService {

  PATH_BACKEND = "http://localhost:" + "5163"

  URL_GET_ALL = this.PATH_BACKEND + "/api/RolesUsuarios/GetAllRolesUsuarios";
  URL_GET_BY_ID = this.PATH_BACKEND + "/api/RolesUsuarios/GetRolesUsuarioById";
  URL_ADD = this.PATH_BACKEND + "/api/RolesUsuarios/AddRolesUsuario";
  URL_UPDATE = this.PATH_BACKEND + "/api/RolesUsuarios/UpdateRolesUsuario";
  URL_DELETE = this.PATH_BACKEND + "/api/RolesUsuarios/DeleteRolesUsuario";

  constructor(private httpClient: HttpClient, private storage: Storage) {
    this.storage.create();
  }

  public async isAuth():Promise<boolean> {
    let id: string = await this.storage.get('idUserStorage')+'';
    
    if(id === "30, 31, 34"){
      alert(id);
      return true;
    }
    else{
      alert(id);
      return false;
    }
  }

  public GetAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.URL_GET_ALL,
        { observe: 'response' })
      .pipe();
  }

  public GetById(id: number): Observable<HttpResponse<any>> {
    const url = `${this.URL_GET_BY_ID}?id=${id}`;
    return this.httpClient
      .get<any>(url,
        { observe: 'response' })
      .pipe();
  }

  public Add(entidad: RolesUsuarios): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.URL_ADD, entidad,
        { observe: 'response' })
      .pipe();
  }

  public Update(entidad: RolesUsuarios): Observable<HttpResponse<any>> {
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