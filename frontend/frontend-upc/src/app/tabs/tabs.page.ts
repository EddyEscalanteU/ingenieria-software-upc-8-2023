import { Component } from '@angular/core';
import { ConfiguracionService } from '../servicios-backend/configuracion/configuracion.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  fuenteSeleccionada: string = 'Arial, sans-serif'; // Fuente predeterminada
    // Método para guardar la preferencia del usuario
    guardarFuente() {
      localStorage.setItem('fuente', this.fuenteSeleccionada);
    }
  constructor(private configuracionServie: ConfiguracionService) {
    this.obtenerFuente();
   }
  // Método para llamar a un método de tab2
  
  obtenerFuente() {
    const savedFontFamily = localStorage.getItem('fuente');
    if (savedFontFamily) {
      this.fuenteSeleccionada = savedFontFamily;
    }
  }
}
