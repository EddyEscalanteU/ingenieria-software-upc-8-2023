import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciaSecionPageRoutingModule } from './inicia-secion-routing.module';

import { IniciaSecionPage } from './inicia-secion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciaSecionPageRoutingModule
  ],
  declarations: [IniciaSecionPage]
})
export class IniciaSecionPageModule {}
