import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab9',
  templateUrl: 'tab9.page.html',
  styleUrls: ['tab9.page.scss']
})
export class Tab9Page {
  selectedFontSize: string = '';
  fontSize: number = 16; // Tamaño Fuente predeterminada
  fuenteSeleccionada: string = 'Arial, sans-serif'; // Fuente predeterminada
  darkMode = false; //Modo oscuro
  constructor(
   
  ) {
    this.obtenerFuente();
    this.obtenerTamanoFuente();
    this.obtenerTema();
  }
  obtenerTamanoFuente(){
    // Inicializar el tamaño de fuente desde el localStorage al cargar la página.
        const storedFontSize = localStorage.getItem('fontSize');
        this.selectedFontSize = storedFontSize || 'medium';
        if (storedFontSize) {
         document.documentElement.style.setProperty('--app-font-size', this.selectedFontSize);
        } // Tamaño de fuente predeterminado si no hay preferencia almacenada.
     }
   // Método para llamar obterner fuente
   obtenerFuente() {
    const savedFontFamily = localStorage.getItem('fuente');
    if (savedFontFamily) {
      this.fuenteSeleccionada = savedFontFamily;
      document.documentElement.style.setProperty('--fuente-seleccionada', this.fuenteSeleccionada);
    }
  }
  //Obtener el tema de preferencia
obtenerTema() {
  const checkIsDarkMode = localStorage.getItem('darkModeActivaded');
  checkIsDarkMode == 'true'
    ? (this.darkMode = true)
    : (this.darkMode = false)
  document.body.classList.toggle('dark', this.darkMode);
}
 

 
}