import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private roles: { [key: string]: string[] } = {
    admin: ['tab1', 'tab2', 'tab3', 'tab4', 'tab7', 'tab8', 'tab9', 'tab10'],
    user: ['tab1', 'tab2', 'tab3'],
  };

  constructor() {}

  // Función para obtener los permisos asociados a un rol
  getPermissionsForRole(role: string): string[] {
    return this.roles[role] || [];
  }
}