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
 
  fuenteSeleccionada: string = 'Arial, sans-serif'; // Fuente predeterminada
  darkMode = false;
  fuentesDisponibles: string[] = [
    'Arial, sans-serif',
    'Times New Roman, serif',
    'Verdana, sans-serif',
    'Courier New, monospace',
    'Georgia, serif',
  ];


  // Método para guardar la preferencia del usuario
  guardarFuente() {
    localStorage.setItem('fuente', this.fuenteSeleccionada);
    window.location.reload();
  }

  constructor() {
    this.checkFont();
    this.checkAppMode();
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
