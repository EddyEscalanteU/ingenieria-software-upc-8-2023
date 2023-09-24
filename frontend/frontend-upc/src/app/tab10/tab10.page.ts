import { Component, OnInit } from '@angular/core';
import { BitacoraService } from '../servicios-backend/bitacora/bitacora.service';
import { UsuariosService } from '../servicios-backend/usuarios/usuarios.service';
import { HttpResponse } from '@angular/common/http';
import { Bitacora } from '../entidades/bitacora';
import { Usuarios } from '../entidades/usuarios';
@Component({
  selector: 'app-tab10',
  templateUrl: './tab10.page.html',
  styleUrls: ['./tab10.page.scss'],
})
export class Tab10Page  implements OnInit {

  public fechaHora = "";
  public idUsuario : any;
  public listaBitacora: Bitacora[] = [];
  public listaUsuario: Usuarios[] = [];
  // public fecha = "";
  constructor(private bitacoraService: BitacoraService, private usuariosService: UsuariosService) {
    this.getAllBitacoraFromBackend();
    this.getAllUsuarioFromBackend();
  }

  private getAllUsuarioFromBackend(){
    this.usuariosService.GetUsuarios().subscribe({
        next: (response: HttpResponse<any>) => {
            this.listaUsuario = response.body;
        },
        error: (error: any) => {
            // console.log(error);
        },
        complete: () => {
            //console.log('complete - this.getCategoria()');
        },
    });
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
            this.listaBitacora = [];
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

  filtrarUsuario(event: any) {
    // Accede al valor seleccionado directamente desde idUsuario
    const selectedUserId = this.idUsuario;
    this.bitacoraService.FiltrarUsuario(selectedUserId).subscribe({
      next: (response: HttpResponse<any>) => {
        this.listaBitacora = response.body;
        console.log(this.listaBitacora);
      },
      error: (error: any) => {
        console.error('Error al filtrar por usuario:', error);
      },
      complete: () => {
        console.log('Filtrado de bitácora por usuario completado.');
      },
    });
  }
  

  ngOnInit() {}

}
