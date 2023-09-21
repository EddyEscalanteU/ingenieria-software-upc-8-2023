import { HttpResponse } from '@angular/common/http';
import { LoginUsuarioService } from './../../servicios-backend/login-usuario/login-usuario.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Storage} from '@ionic/storage-angular';

@Component({
  selector: 'app-inicia-secion',
  templateUrl: './inicia-secion.page.html',
  styleUrls: ['./inicia-secion.page.scss'],
})
export class IniciaSecionPage implements OnInit {
  public nombre = '';
  public contresenia = '';

  constructor(private loginUser: LoginUsuarioService, private modalCtrl: ModalController, private storage: Storage) {
    this.storage.create();
  }

  public inicoSesion() {
    this.inicionsecionn(this.nombre, this.contresenia);
  }

  private inicionsecionn(nombre: string, pass: string) {
    this.loginUser.inisiarSesion(nombre, pass).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response.body);
        if (response.body.success) {
          alert(JSON.stringify(response.body.result));
          alert('se inicio secion :)');
          this.storage.set("token",JSON.stringify(response.body.result));
          this.storage.set("nameUserComplit",response.body.user.nombreCompleto);

          this.modalCtrl.dismiss(JSON.stringify(response.body.user));
        } else {
          alert('usuario no registrado o datos incorrecto :(');
          console.log(JSON.stringify(response.body.result));
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('Finished...  - this.incio sesion :)');
      },
    });
  }

  ngOnInit() {
    this.storage.create();
  }

  onSubmitTemplete(){
    console.log("submite");
  }
  public botonCancelar(){
    this.modalCtrl.dismiss();
  }
}
