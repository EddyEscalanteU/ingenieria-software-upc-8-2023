import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ConfiguracionService } from '../servicios-backend/configuracion/configuracion.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab7',
  templateUrl: 'tab7.page.html',
  styleUrls: ['tab7.page.scss']

})
export class Tab7Page {
  fontSize: number = 16;
  fuenteSeleccionada: string = 'Arial, sans-serif'; // Fuente predeterminada
  darkMode = false;
  fuentesDisponibles: string[] = [
    'Arial, sans-serif',
    'Times New Roman, serif',
    'Verdana, sans-serif',
    'Courier New, monospace',
    'Georgia, serif',
  ];

  saveSize() {
    localStorage.setItem('fontSize', this.fontSize.toString());
    // Aplica el tamaño de fuente a toda la aplicación
    document.documentElement.style.setProperty('--app-font-size', this.fontSize + 'px');
  }
  // Método para guardar la preferencia del usuario
  guardarFuente() {
    localStorage.setItem('fuente', this.fuenteSeleccionada);
  }

  constructor() {

    this.checkFontSize();
    this.checkFont();
    this.checkAppMode();
  }

  checkFontSize(){
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      document.documentElement.style.setProperty('--app-font-size', savedFontSize + 'px');
    }
  }
  checkFont() {
    const savedFontFamily = localStorage.getItem('fuente');
    if (savedFontFamily) {
      this.fuenteSeleccionada = savedFontFamily;
    }
  }

  checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivaded');
    checkIsDarkMode == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false)
    document.body.classList.toggle('dark', this.darkMode);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if (this.darkMode) {
      localStorage.setItem('darkModeActivaded', 'true');
    } else {
      localStorage.setItem('darkModeActivaded', 'false');
    }
  }
}
