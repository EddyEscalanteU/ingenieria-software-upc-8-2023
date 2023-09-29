import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Bitacora } from 'src/app/entidades/bitacora';
@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  PATH_BACKEND = "http://localhost:" + "5163"

  URL_GET = this.PATH_BACKEND + "/api/Bitacora/GetAllBitacora";
  URL_FILTRO_FECHA = this.PATH_BACKEND + "/api/Bitacora/FiltrarFechaBitacora";
  URL_FILTRO_USUARIO = this.PATH_BACKEND + "/api/Bitacora/FiltrarUsuarioBitacora";
  URL_GET_USUARIO = this.PATH_BACKEND + "/api/Usuarios/GetAllUsuarios";


  constructor(private httpClient: HttpClient) {
  }

  public GetAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.URL_GET,
        { observe: 'response' })
      .pipe();
  }

  public FiltrarFecha(entidad: Bitacora): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.URL_FILTRO_FECHA, entidad,
        { observe: 'response' })
      .pipe();
  }

  public FiltrarFechaRango(entidad: Bitacora): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.URL_FILTRO_FECHA, entidad,
        { observe: 'response' })
      .pipe();
  }

  public FiltrarUsuario(id: any): Observable<HttpResponse<any>> {
    const url = `${this.URL_FILTRO_USUARIO}?id=${id}`;  // Construye la URL con el parámetro
    // Realiza una solicitud GET en lugar de POST, y observa la respuesta
    return this.httpClient.get(url, { observe: 'response' });
  }
  public GetUsuarios(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.URL_GET_USUARIO,
        { observe: 'response' })
      .pipe();
  }
}
