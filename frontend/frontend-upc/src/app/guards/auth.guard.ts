import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RolUsuarioService } from '../servicios-backend/roles-usuarios/roles-usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private rolUsuarioService: RolUsuarioService
  ){

  }
  async canActivate(): Promise<boolean> {
    try {
      const isAuthorized = await this.rolUsuarioService.isAuth();
  
      if (!isAuthorized) {
        alert('capturado por el guardian');
        return false;
      }
  
      return true;
    } catch (error) {
      console.error('Error al verificar la autorización:', error);
      return false;
    }
  }
  
}
