import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IniciaSecionPageModule } from '../loginUser/inicia-secion/inicia-secion.module';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    IniciaSecionPageModule
  ],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
