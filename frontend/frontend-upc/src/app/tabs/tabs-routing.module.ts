
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';
import { PermissionGuard } from '../guards/permisoauth.guard';
import { RolesService } from '../servicios-backend/roles/roles.service';

const routes: Routes = [
  { 
    path: 'tabs',
    component: TabsPage,

    // path: 'admin',
    // component: RolesService,
    
    canActivate: [PermissionGuard],
    data: { expectedRoles: ['admin'] }, // Define los roles esperados para esta ruta
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule),
        canActivate: [PermissionGuard], // Usar el guardia de permisos
        data: { expectedRoles: ['admin', 'user'] }, // Roles permitidos para esta pestaña
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule),
        canActivate: [PermissionGuard],
        data: { expectedRoles: ['admin', 'user'] },
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule),
        canActivate: [PermissionGuard],
        data: { expectedRoles: ['admin', 'user'] },
      },
      {
        path: 'tab4',
        loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule),
        canActivate: [PermissionGuard],
        data: { expectedRoles: ['admin', 'user'] },
      },
      {
        path: 'tab7',
        loadChildren: () => import('../tab7/tab7.module').then(m => m.Tab7PageModule),
        canActivate: [PermissionGuard],
        data: { expectedRoles: ['admin', 'user'] },
      },
      {
        path: 'tab8',
        loadChildren: () => import('../tab8/tab8.module').then(m => m.Tab8PageModule),
        canActivate: [PermissionGuard],
        data: { expectedRoles: ['admin', 'user'] },
      },
      {
        path: 'tab9',
        loadChildren: () => import('../tab9/tab9.module').then(m => m.Tab9PageModule),
        canActivate: [PermissionGuard],
        data: { expectedRoles: ['admin', 'user'] },
      },
      {
        path: 'tab10',
        loadChildren: () => import('../tab10/tab10.module').then(m => m.Tab10PageModule),
        canActivate: [PermissionGuard],
        data: { expectedRoles: ['admin', 'user'] },
      },
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioPageModule),
        canActivate: [PermissionGuard],
        data: { expectedRoles: ['admin', 'user'] },
      },
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
