import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab9',
  templateUrl: 'tab9.page.html',
  styleUrls: ['tab9.page.scss']
})
export class Tab9Page {

  fuenteSeleccionada: string = 'Arial, sans-serif'; // Fuente predeterminada
  constructor(
   
  ) {
    this.obtenerFuente();
  }

   // Método para llamar obterner fuente
   obtenerFuente() {
    const savedFontFamily = localStorage.getItem('fuente');
    if (savedFontFamily) {
      this.fuenteSeleccionada = savedFontFamily;
      document.documentElement.style.setProperty('--fuente-seleccionada', this.fuenteSeleccionada);
    }
  }
  
 

 
}