import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ModalChagePasswordPage } from './modal-chage-password.page';
import { ModalChagePasswordPageRoutingModule } from './modal-chage-password-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalChagePasswordPageRoutingModule
  ],
  declarations: [ModalChagePasswordPage]
})
export class ModalChagePasswordPageModule {}
