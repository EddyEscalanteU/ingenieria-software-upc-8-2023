import { Component} from '@angular/core';
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
  selectedFontSize: string= '';
  fontSize: number=16;


  fuenteSeleccionada: string = ''; // Fuente predeterminada
  darkMode = false; //Modo oscuro
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
    document.documentElement.style.setProperty('--fuente-seleccionada', this.fuenteSeleccionada);
  }

  constructor() {
    this.checkFontSize();
    this.checkFont();
    this.checkAppMode();
  }

  guardarPreferencia() {
    // Guardar el tamaño de fuente seleccionado en el localStorage.
    localStorage.setItem('fontSize', this.selectedFontSize);
    document.documentElement.style.setProperty('--app-font-size', this.selectedFontSize);
    this.fontSize = this.calcularTamanioFuente(this.selectedFontSize);
  }

  calcularTamanioFuente(tamaño: string): number {
    switch (tamaño) {
      case 'small':
        return 14;
      case 'medium':
        return 18;
      case 'large':
        return 22;
      default:
        return 16; // Tamaño de fuente predeterminado si no coincide con las opciones.
    }
  }


  checkFontSize(){
 // Inicializar el tamaño de fuente desde el localStorage al cargar la página.
     const storedFontSize = localStorage.getItem('fontSize');
     this.selectedFontSize = storedFontSize || 'medium';
     if (storedFontSize) {
      document.documentElement.style.setProperty('--app-font-size', this.selectedFontSize);
     } // Tamaño de fuente predeterminado si no hay preferencia almacenada.
     this.fontSize = this.calcularTamanioFuente(this.selectedFontSize);
  }
  checkFont() {
    const savedFontFamily = localStorage.getItem('fuente');
    if (savedFontFamily) {
      this.fuenteSeleccionada = savedFontFamily;
      document.documentElement.style.setProperty('--fuente-seleccionada', this.fuenteSeleccionada);
    }
  }
//Obtener el tema de preferencia
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
