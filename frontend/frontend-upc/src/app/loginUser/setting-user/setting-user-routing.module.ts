import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingUserPage } from './setting-user.page';
import { CommonModule } from '@angular/common';
import { ModalChagePasswordPageModule } from '../modal-chage-password/modal-chage-password.module';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: SettingUserPage
  }
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    CommonModule,
    ModalChagePasswordPageModule
  ],
  exports: [RouterModule],
})
export class SettingUserPageRoutingModule {}
