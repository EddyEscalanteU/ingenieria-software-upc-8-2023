import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ConfiguracionService } from '../servicios-backend/configuracion/configuracion.service';

@Component({
  selector: 'app-tab7',
  templateUrl: 'tab7.page.html',
  styleUrls: ['tab7.page.scss']

})
export class Tab7Page {
  
  darkMode= false;
  fontFamily: string = 'Arial, sans-serif';
  constructor() {

    const savedFontFamily = localStorage.getItem('fontFamily');
    if (savedFontFamily) {
      this.fontFamily = savedFontFamily;
    }
  }

  // Método para guardar la preferencia del usuario
  saveFontFamilyPreference() {
    localStorage.setItem('fontFamily', this.fontFamily);
  }
  ngOnInit():void{
    this.checkAppMode();
  }

  checkAppMode(){
    const checkIsDarkMode= localStorage.getItem('darkMOdeActivaded');
    checkIsDarkMode=='true'
      ?(this.darkMode = true)
      :(this.darkMode=false)
      document.body.classList.toggle('dark', this.darkMode);
  }

  toggleDarkMode(){
    this.darkMode= !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if (this.darkMode) {
      localStorage.setItem('darkModeActivaded', 'true');
    }else{
      localStorage.setItem('darkModeActivaded', 'false');
    }
  }
}
