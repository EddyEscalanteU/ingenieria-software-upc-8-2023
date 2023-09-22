import { Component, OnInit } from '@angular/core';
import { BitacoraService } from '../servicios-backend/bitacora/bitacora.service';
import { HttpResponse } from '@angular/common/http';
import { Bitacora } from '../entidades/bitacora';
@Component({
  selector: 'app-tab10',
  templateUrl: './tab10.page.html',
  styleUrls: ['./tab10.page.scss'],
})
export class Tab10Page  implements OnInit {

  public fechaHora = "";
  public listaBitacora: Bitacora[] = []
  // public fecha = "";
  constructor(private bitacoraService: BitacoraService) {
    this.getAllBitacoraFromBackend();
  }
  private getAllBitacoraFromBackend(){
    this.bitacoraService.GetAll().subscribe({
        next: (response: HttpResponse<any>) => {
            this.listaBitacora = response.body;
        },
        error: (error: any) => {
            // console.log(error);
            // Notiflix.Notify.failure("Error al obtener CATEGORIA PRODUCTO")
        },
        complete: () => {
            //console.log('complete - this.getCategoria()');
        },
    });
  }
  // private filtrarFecha(event: any){

  // }

  filtrarFecha(event: Event) {
    var bitacora = new Bitacora();
    const input = event.target as HTMLInputElement;
    bitacora.fechaHora = input.value;
    this.bitacoraService.FiltrarFecha(bitacora).subscribe({
      next: (response: HttpResponse<any>) => {
          this.listaBitacora = response.body;
          console.log(this.listaBitacora);
      },
      error: (error: any) => {
          // console.log(error);
          // Notiflix.Notify.failure("Error al obtener CATEGORIA PRODUCTO")
      },
      complete: () => {
          //console.log('complete - this.getCategoria()');
      },
  });
  }
  ngOnInit() {}

}
