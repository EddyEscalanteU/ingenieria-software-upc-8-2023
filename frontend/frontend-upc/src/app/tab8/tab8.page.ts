import { Component } from '@angular/core';
import { Funcionalidades } from '../entidades/funcionalidades';
import { RolesUsuarios } from '../entidades/roles-usuarios';
import { FuncionalidadService } from '../servicios-backend/funcionalidades/funcionalidades.service';
import { RolUsuarioService } from '../servicios-backend/roles-usuarios/roles-usuarios.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab8',
  templateUrl: 'tab8.page.html',
  styleUrls: ['tab8.page.scss']
})
export class Tab8Page {

  // Propiedades para Funcionalidades
  public funcionalidadId = 0;
  public funcionalidadNombre = "";
  public funcionalidadDescripcion = "";

  public listaFuncionalidades: Funcionalidades[] = [];
  public funcionalidad: Funcionalidades | null = null;

  mostrarListaFuncionalidades: boolean = false;
  mostrarListaRolesUsuario: boolean = false;



  // Propiedades para Roles Usuarios
  public rolUsuarioId = 0;
  public rolUsuarioNombre = "";
  public rolUsuarioDescripcion = "";

  public listaRolesUsuarios: RolesUsuarios[] = [];
  public rolUsuario: RolesUsuarios | null = null;

  constructor(
    private funcionalidadService: FuncionalidadService,
    private rolUsuarioService: RolUsuarioService
  ) {}

  toggleFuncionalidades() {
    this.mostrarListaFuncionalidades = !this.mostrarListaFuncionalidades;
    if (this.mostrarListaFuncionalidades) {
      this.cargarFuncionalidades();
    }
  }
  toggleRolesUsuario() {
    this.mostrarListaRolesUsuario = !this.mostrarListaRolesUsuario;
    if (this.mostrarListaRolesUsuario) {
      this.cargarRolesUsuarios();
    }
  }

  // Métodos para Funcionalidades

  public mostrarFuncionalidades() {
    this.cargarFuncionalidades();
  }
  public agregarFuncionalidad() {
    const nuevaFuncionalidad: Funcionalidades = {
      id: 0, // El ID deberá establecerse en el servidor, generalmente se autogenera.
      nombre: this.funcionalidadNombre,
      descripcion: this.funcionalidadDescripcion
    };

    this.funcionalidadService.Add(nuevaFuncionalidad).subscribe({
      next: (response: HttpResponse<any>) => {
        // Manejar la respuesta del servidor, por ejemplo, actualizar la lista de funcionalidades.
        this.cargarFuncionalidades();
        // Limpiar los campos de entrada
        this.funcionalidadNombre = '';
        this.funcionalidadDescripcion = '';
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  } 
  
  public editarFuncionalidad(funcionalidad: Funcionalidades) {
    this.funcionalidadId = funcionalidad.id;
    this.funcionalidadNombre = funcionalidad.nombre;
    this.funcionalidadDescripcion = funcionalidad.descripcion;
  }

  public guardarFuncionalidad() {
    if (this.funcionalidadId === 0) {
      this.agregarFuncionalidad();
    } else {
      this.editarFuncionalidadExistente();
    }
  }

  public eliminarFuncionalidad() {
    if (this.funcionalidadId !== 0) {
      this.funcionalidadService.Delete(this.funcionalidadId).subscribe({
        next: (response: HttpResponse<any>) => {
          // Manejar la respuesta del servidor, por ejemplo, actualizar la lista de funcionalidades.
          this.cargarFuncionalidades();
          // Limpiar los campos de entrada
          this.funcionalidadId = 0;
          this.funcionalidadNombre = '';
          this.funcionalidadDescripcion = '';
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  private cargarFuncionalidades() {
    this.funcionalidadService.GetAll().subscribe({
      next: (response: HttpResponse<any>) => {
        this.listaFuncionalidades = response.body;
        console.log(this.listaFuncionalidades);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  private editarFuncionalidadExistente() {
    const funcionalidadEditada: Funcionalidades = {
      id: this.funcionalidadId,
      nombre: this.funcionalidadNombre,
      descripcion: this.funcionalidadDescripcion
    };

    this.funcionalidadService.Update(funcionalidadEditada).subscribe({
      next: (response: HttpResponse<any>) => {
        // Manejar la respuesta del servidor, por ejemplo, actualizar la lista de funcionalidades.
        this.cargarFuncionalidades();
        // Limpiar los campos de entrada
        this.funcionalidadId = 0;
        this.funcionalidadNombre = '';
        this.funcionalidadDescripcion = '';
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  // Métodos para Roles Usuarios

  public mostrarRolesUsuario() {
    this.cargarRolesUsuarios();
  }

  public agregarRolUsuario() {
  }

  public guardarRolUsuario() {
    if (this.rolUsuarioId === 0) {
      this.agregarRolUsuario();
    } else {
      this.editarRolUsuarioExistente();
    }
  }

  public editarRolUsuario(rolUsuario: RolesUsuarios) {
    this.rolUsuarioId = rolUsuario.id;
    this.rolUsuarioNombre = rolUsuario.nombrE_ROL;
    this.rolUsuarioDescripcion = rolUsuario.descripcion;
  }

  public eliminarRolUsuario() {
  }

  private cargarRolesUsuarios() {
    this.rolUsuarioService.GetAll().subscribe({
      next: (response: HttpResponse<any>) => {
        this.listaRolesUsuarios = response.body;
        console.log(this.listaRolesUsuarios);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  private editarRolUsuarioExistente() {
  }
}