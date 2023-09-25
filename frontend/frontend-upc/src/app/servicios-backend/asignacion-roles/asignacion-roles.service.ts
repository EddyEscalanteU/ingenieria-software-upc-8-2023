import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AsignacionRoles } from 'src/app/entidades/asignacion-roles';

@Injectable({
  providedIn: 'root'
})
export class AsignacionRolesService {

  PATH_BACKEND = "http://localhost:" + "5163"

  URL_GET_ALL = this.PATH_BACKEND + "/api/AsignacionRoles/GetAllAsignaciones";
  URL_GET_BY_ID = this.PATH_BACKEND + "/api/AsignacionRoles/GetAsignacionById";
  URL_ADD = this.PATH_BACKEND + "/api/AsignacionRoles/AddAsignacion";
  URL_UPDATE = this.PATH_BACKEND + "/api/AsignacionRoles/UpdateAsignacion";
  URL_DELETE = this.PATH_BACKEND + "/api/AsignacionRoles/DeleteAsignacion";

  constructor(private httpClient: HttpClient) {
  }

  public GetAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.URL_GET_ALL, { observe: 'response' })
      .pipe();
  }

  public GetById(id: number): Observable<HttpResponse<any>> {
    const url = `${this.URL_GET_BY_ID}?id=${id}`;
    return this.httpClient
      .get<any>(url, { observe: 'response' })
      .pipe();
  }

  public Add(entidad: AsignacionRoles): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.URL_ADD, entidad, { observe: 'response' })
      .pipe();
  }

  public Update(entidad: AsignacionRoles): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.URL_UPDATE, entidad, { observe: 'response' })
      .pipe();
  }

  public Delete(id: number): Observable<HttpResponse<any>> {
    const url = `${this.URL_DELETE}?id=${id}`;
    return this.httpClient
      .delete<any>(url, { observe: 'response' })
      .pipe();
  }
}