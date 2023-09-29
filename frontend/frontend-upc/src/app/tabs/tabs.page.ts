import { Component } from '@angular/core';
import { ConfiguracionService } from '../servicios-backend/configuracion/configuracion.service';
import { ModalController } from '@ionic/angular';
import { IniciaSecionPage } from '../loginUser/inicia-secion/inicia-secion.page';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  public loginNombreCopleto = '';
  public nombreCompleto = '';
  public userName = '';
  public password = '';

  public enableLogin = true;

  fuenteSeleccionada: string = 'Arial, sans-serif'; // Fuente predeterminada
  // Método para guardar la preferencia del usuario
  guardarFuente() {
    localStorage.setItem('fuente', this.fuenteSeleccionada);
  }
  constructor(
    private configuracionServie: ConfiguracionService,
    private modalCtrl: ModalController,
    private storage: Storage
  ) {
    this.storage.create();
    this.obtenerFuente();
    this.stadoVentana();
  }
  // Método para llamar a un método de tab2

  obtenerFuente() {
    const savedFontFamily = localStorage.getItem('fuente');
    if (savedFontFamily) {
      this.fuenteSeleccionada = savedFontFamily;
    }
  }

  /* Inicio secion de modo modal */
  public async modalIniciaSecion() {
    const modal = this.modalCtrl.create({
      component: IniciaSecionPage,
      componentProps: {
        // idNinio: id.... Se puede traer un o varios datos de model
      },
    });

    (await modal).present();
    // Llama a la función para obtener los datos actualizados
    const stateWin = (await (await modal).onDidDismiss()).data;
    console.log(stateWin);
    if (stateWin) {
    }
    this.stadoVentana();
    location.reload();
  }

  public async serrarSesion() {
    await this.storage.clear();
    location.reload();
    this.stadoVentana();
  }

  public async stadoVentana() {
    var token = await this.storage.get('token');
    if (token != null) {
      this.enableLogin = false;
      this.loginNombreCopleto = await this.storage.get('nameUserStorage');
    } else {
    }
  }
}
