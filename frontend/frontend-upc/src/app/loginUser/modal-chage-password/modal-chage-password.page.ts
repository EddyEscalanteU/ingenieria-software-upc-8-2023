import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { LoginUsuarioService } from 'src/app/servicios-backend/login-usuario/login-usuario.service';

@Component({
  selector: 'app-modal-chage-password',
  templateUrl: './modal-chage-password.page.html',
  styleUrls: ['./modal-chage-password.page.scss'],
})
export class ModalChagePasswordPage implements OnInit {

  public passOld = '';
  public passNew = '';
  public repidPassNew = '';

  constructor(private loginUser: LoginUsuarioService, private modalCtrl: ModalController, private storage: Storage) {
    this.storage.create();
  }

  public botonCancelar(){
    this.modalCtrl.dismiss();
  }

  public async changePassword() {
    (await this.loginUser.changePassword(this.passOld, this.passNew)).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response.body);
        if (response.body.success) {
          alert(response.body.message);
          this.modalCtrl.dismiss();
        } else {
          console.log(JSON.stringify(response.body.message));
          alert(response.body.message);
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('Corrio...  - cambio de contresenia');
      },
    });
  }





  ngOnInit() {
  }

}
