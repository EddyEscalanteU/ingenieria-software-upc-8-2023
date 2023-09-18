import { HttpResponse } from '@angular/common/http';
import { LoginUsuarioService } from './../../servicios-backend/login-usuario/login-usuario.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inicia-secion',
  templateUrl: './inicia-secion.page.html',
  styleUrls: ['./inicia-secion.page.scss'],
})
export class IniciaSecionPage implements OnInit {
  public nombre = '';
  public contresenia = '';

  constructor(private loginUser: LoginUsuarioService, private modalCtrl: ModalController) {
    //
  }

  public inicoSesion() {
    this.inicionsecionn(this.nombre, this.contresenia);
  }

  private inicionsecionn(nombre: string, pass: string) {
    this.loginUser.inisiarSesion(nombre, pass).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response.body);
        if (response.body == 1) {
          alert(JSON.stringify(response.body));
          alert('se inicio secion :)');
          //quiero crear un retraso de 1 segundo en esta parte del codigo
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

  ngOnInit() {}
}
