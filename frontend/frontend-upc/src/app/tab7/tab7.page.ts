import { Component,  Renderer2 } from '@angular/core';
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
  selectedFontSize: string;
  textoDePrueba: string;
  fontSize: number;



  //fontSize: number = 16;
  fuenteSeleccionada: string = ''; // Fuente predeterminada
  darkMode = false; //Modo oscuro
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
    document.documentElement.style.setProperty('--fuente-seleccionada', this.fuenteSeleccionada);
  }

  constructor(private renderer: Renderer2) {

     // Inicializar el tamaño de fuente desde el localStorage al cargar la página.
     const storedFontSize = localStorage.getItem('fontSize');
     this.selectedFontSize = storedFontSize || 'medium'; // Tamaño de fuente predeterminado si no hay preferencia almacenada.
 
     // Inicializar el texto de prueba.
     this.textoDePrueba = 'Este es un texto de prueba.';
     this.fontSize = this.calcularTamanioFuente(this.selectedFontSize);

    this.checkFontSize();
    this.checkFont();
    this.checkAppMode();
  }

  guardarPreferencia() {
    // Guardar el tamaño de fuente seleccionado en el localStorage.
    localStorage.setItem('fontSize', this.selectedFontSize);
    // Actualizar el tamaño de fuente aplicado al texto de prueba.
    this.fontSize = this.calcularTamanioFuente(this.selectedFontSize);
  }

  calcularTamanioFuente(tamaño: string): number {
    switch (tamaño) {
      case 'small':
        return 14;
      case 'medium':
        return 16;
      case 'large':
        return 20;
      default:
        return 16; // Tamaño de fuente predeterminado si no coincide con las opciones.
    }
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
