import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RolUsuarioService } from '../servicios-backend/roles-usuarios/roles-usuarios.service';
import { AuthGuard } from './auth.guard';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private authService: AuthGuard) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
//    const expectedRoles = route.data.expectedRoles;

 //   if (!expectedRoles || expectedRoles.length === 0) {
      return true;
    }

  //  const userRoles = this.authService.getUserRoles();

   // const hasPermission = expectedRoles.some((role: string) => userRoles.includes(role));

   // if (hasPermission) {
   //   return true;
    //} else {
   //   return false;
    }
 // }
//}





