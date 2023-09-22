import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  fuenteSeleccionada: string = 'Arial, sans-serif'; // Fuente predeterminada
  constructor() {
    
  }
  checkFont() {
    const savedFontFamily = localStorage.getItem('fuente');
    if (savedFontFamily) {
      this.fuenteSeleccionada = savedFontFamily;
    }
  }


}
