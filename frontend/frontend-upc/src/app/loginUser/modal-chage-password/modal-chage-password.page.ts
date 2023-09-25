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

  public async changePassword2(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // Obtener el token del almacenamiento
    const token = await this.storage.get('token'); 
    console.log(token);
  
    // Agregar el token al encabezado de la solicitud
    headers.set('authorization', 'Bearer '+ token);
    console.log(headers);

    return this.loginUser.changePassword2(this.passOld, this.passNew, { headers: headers }); // Reemplaza 'post' con el método adecuado para realizar una solicitud POST en tu servicio de conexión a la API
  }

  ngOnInit() {
  }

}
