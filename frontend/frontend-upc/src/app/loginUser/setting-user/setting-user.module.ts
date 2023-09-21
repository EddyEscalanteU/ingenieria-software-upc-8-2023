import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingUserPageRoutingModule } from './setting-user-routing.module';

import { SettingUserPage } from './setting-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingUserPageRoutingModule
  ],
  declarations: [SettingUserPage]
})
export class SettingUserPageModule {}
