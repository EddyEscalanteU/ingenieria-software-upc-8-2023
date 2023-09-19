import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { ConfiguracionService } from '../servicios-backend/configuracion/configuracion.service';

@Component({
  selector: 'app-tab7',
  templateUrl: 'tab7.page.html',
  styleUrls: ['tab7.page.scss']

})
export class Tab7Page {
/*   fontSize!: number;

  constructor(private confiuracionService: ConfiguracionService) {}

  ionViewWillEnter() {
    this.confiuracionService.getFontSize().then((fontSize) => {
      this.fontSize = fontSize;
    });
  }

  saveSettings() {
    this.confiuracionService.setFontSize(this.fontSize);
  } */

/*   fontFamily: string = 'Arial, sans-serif'; // Estilo de fuente predeterminado

  constructor(private storage: Storage) {}

// En el método donde el usuario selecciona el estilo de fuente
saveFontFamilyPreference() {
  this.storage.set('fontFamily', this.fontFamily);
} */
}
