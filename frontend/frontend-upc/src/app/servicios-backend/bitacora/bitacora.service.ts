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
}
