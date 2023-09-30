import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { RolUsuarioService } from '../servicios-backend/roles-usuarios/roles-usuarios.service';
import { LoginUsuarioService } from '../servicios-backend/login-usuario/login-usuario.service'; 

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private authService: LoginUsuarioService, private rolesService: RolUsuarioService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const expectedRoles = route.data['expectedRoles']; // Usar corchetes para acceder a 'expectedRoles'

    if (!expectedRoles || expectedRoles.length === 0) {
      return of(true); // Devuelve un Observable que emite 'true'
    }

    return this.authService.getUserRoles().pipe(
      map((userRoles: string[]) => {
        // Verificar si el usuario tiene al menos uno de los roles esperados
        const hasPermission = expectedRoles.some((role: string) => userRoles.includes(role));
        
        if (hasPermission) {
          return true; // Devuelve un Observable que emite 'true'
        } else {
          // Redirigir o mostrar un mensaje de error de permiso denegado
          return false; // Devuelve un Observable que emite 'false'
        }
      })
    );
  }
}



