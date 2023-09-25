import { Usuarios } from './../../entidades/usuarios';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UsuariosService } from 'src/app/servicios-backend/usuarios/usuarios.service';
import { IniciaSecionPage } from '../inicia-secion/inicia-secion.page';
import { ModalController } from '@ionic/angular';
import { ModalChagePasswordPage } from '../modal-chage-password/modal-chage-password.page';

@Component({
  selector: 'app-setting-user',
  templateUrl: './setting-user.page.html',
  styleUrls: ['./setting-user.page.scss'],
})
export class SettingUserPage implements OnInit {
  public nombreCompleto = '';
  public userName = '';

  public usuario: Usuarios = new Usuarios();

  constructor(private usuarioService: UsuariosService, private storage: Storage, private modalCtrl: ModalController) { 
    this.storage.create();
  }

  public async darDatos(){
    this.storage.get("idUserStorage"); //saca del storage el id usuario
    
    let id: string = await this.storage.get('idUserStorage');+'';
    console.log(id);
    this.usuarioService.getObtenerById(id).subscribe({
      next: (response: HttpResponse<any>) => {
        // alert(JSON.stringify(response.body));
        this.usuario = response.body;
        this.nombreCompleto = this.usuario.nombreCompleto;
        this.userName = this.usuario.userName;
        
        console.log(this.usuario)
      },
      error: (error: any) => {
        // falla
        console.log(error);
      },
      complete: () => {
        // termino todo
        console.log('Finished... - this.darDatos()');
      },
    });

  }
  
  public actualizarDatos(){

    this.usuario.nombreCompleto = this.nombreCompleto;
    this.usuario.userName = this.userName;

    this.usuarioService.Update(this.usuario).subscribe({
      next: (response: HttpResponse<any>)=> {
        // console.log(response.body);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: ()=> {
        console.log('Finished...  - this.Atualizado :)');
      },
    });
  }

  /* Inicio secion de modo modal */
  public async modalChangePassword() {
    const modal = this.modalCtrl.create({
      component: ModalChagePasswordPage,
      componentProps: {
        // idNinio: id
      },
    });

    (await modal).present();
    // Llama a la función para obtener los datos actualizados
    const stateWin = (await (await modal).onDidDismiss());
    // console.log(stateWin);
    // if (stateWin) {
    // }
  }

  ngOnInit() {
    this.darDatos();
  }

}
