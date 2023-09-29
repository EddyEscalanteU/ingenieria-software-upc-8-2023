import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../entidades/usuarios';
import { UsuariosService } from '../servicios-backend/usuarios/usuarios.service';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IniciaSecionPage } from '../loginUser/inicia-secion/inicia-secion.page';
import { Storage } from '@ionic/storage-angular';
import { ConfiguracionService } from '../servicios-backend/configuracion/configuracion.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  fuenteSeleccionada: string = 'Arial, sans-serif'; // Fuente predeterminada
  darkMode = false; //Modo oscuro

  public nombreCompleto = '';
  public userName = '';
  public password = '';

  public listaUsuarios: Usuarios[] = [];

  constructor(
    private configuracionServie: ConfiguracionService,

    private usuariosService: UsuariosService,
    private storage: Storage
  ) {
    this.checkFont();

    this.getUsuariosFromBackend();
    this.storage.create();
    this.checkFont();
  }
  checkFont() {
    const savedFontFamily = localStorage.getItem('fuente');
    if (savedFontFamily) {
      this.fuenteSeleccionada = savedFontFamily;
      document.documentElement.style.setProperty('--fuente-seleccionada', this.fuenteSeleccionada);
    }
  }

  //Obtener el tema de preferencia
  checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivaded');
    checkIsDarkMode == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false)
    document.body.classList.toggle('dark', this.darkMode);
  }


  ngOnInit() {
  }

  

  private getUsuariosFromBackend() {
    this.usuariosService.GetUsuarios().subscribe({
      next: (response: HttpResponse<any>) => {
        this.listaUsuarios = response.body;
        console.log(this.listaUsuarios);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.getUsuarios()');
      },
    });
  }

  public addUsuario() {
    this.AddUsuarioFromBackend(
      this.nombreCompleto,
      this.userName,
      this.password
    );
  }

  private async AddUsuarioFromBackend(
    nombreCompleto: string,
    userName: string,
    password: string
  ) {
    var usuarioEntidad = new Usuarios();
    usuarioEntidad.nombreCompleto = nombreCompleto;
    usuarioEntidad.userName = userName;
    usuarioEntidad.password = password;
    usuarioEntidad.usuarioRegistro = (await this.storage.get('idUserStorage')).toString();
    console.log(usuarioEntidad);
    this.usuariosService.AddUsuario(usuarioEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response.body); //1
        if (response.body == 1) {
          alert('Se agrego el USUARIO con exito :)');
          this.getUsuariosFromBackend(); //Se actualize el listado
          this.nombreCompleto = '';
          this.userName = '';
          this.password = '';
        } else {
          alert('Al agregar al USUARIO fallo  :(');
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.AddUsuario()');
      },
    });
  }
}
