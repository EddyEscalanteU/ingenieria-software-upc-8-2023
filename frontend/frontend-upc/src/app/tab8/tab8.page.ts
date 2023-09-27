import { Component } from '@angular/core';
import { Funcionalidades } from '../entidades/funcionalidades';
import { RolesUsuarios } from '../entidades/roles-usuarios';
import { FuncionalidadService } from '../servicios-backend/funcionalidades/funcionalidades.service';
import { RolUsuarioService } from '../servicios-backend/roles-usuarios/roles-usuarios.service';
import { HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import * as Notiflix from 'notiflix'; // Importar Notiflix
import { AsignacionRoles } from '../entidades/asignacion-roles';
import { Usuarios } from '../entidades/usuarios';
import { AsignacionRolesService } from '../servicios-backend/asignacion-roles/asignacion-roles.service';
import { UsuariosService } from '../servicios-backend/usuarios/usuarios.service';
import { AdministracionPrivilegios } from '../entidades/administracion-privilegio';
import { AdministracionPrivilegiosService } from '../servicios-backend/administracion-privilegios/administracion-privilegios.service';

import { map } from 'rxjs';

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
  public funcionalidadAEliminar: Funcionalidades | null = null;

  mostrarListaFuncionalidades: boolean = false;

  // Propiedades para Roles Usuarios
  public rolUsuarioId = 0;
  public rolUsuarioNombre = "";
  public rolUsuarioDescripcion = "";

  public listaRolesUsuarios: RolesUsuarios[] = [];
  public rolUsuario: RolesUsuarios | null = null;
  public RolAEliminar: RolesUsuarios | null = null;

  mostrarListaRolesUsuario: boolean = false;

  // Propiedades para Asignacion de Roles
  public asignacionRolesId = 0;
  public busquedaUsuario = "";
  public usuarioSeleccionado: number = 0;
  public rolUsuarioSeleccionado: number = 0;
  public nombreUsuarioSeleccionado: string = '';
  public nombreRolUsuarioSeleccionado: string = '';

  public listaAsignacionRoles: AsignacionRoles[] = [];
  public listaUsuarios: Usuarios[] = []; // Lista de Usuarios
  public listaRolesUsuarios2: RolesUsuarios[] = []; // Lista de Roles de Usuario

  public asignacionRol: AsignacionRoles | null = null;
  public asignacionRolAEliminar: AsignacionRoles | null = null;
  usuariosFiltrados: Usuarios[] = []; // Nueva lista para almacenar usuarios filtrados


  mostrarListaAsignacionRoles: boolean = false;

  // Propiedades para Adiministracion de Privilegios
  public privilegiosId = 0;
  public rolUsuarioSeleccionado2: number = 0;
  public funcionalidadSeleccionada: number = 0;
  public nombreRolSeleccionado: string = '';
  public nombreFuncionalidadSeleccionada: string = '';

  public listaPrivilegios: AdministracionPrivilegios[] = [];
  public listaUsuarios2: Usuarios[] = []; // Lista de Usuarios
  public listaRolesUsuarios3: RolesUsuarios[] = []; // Lista de Roles de Usuario
  public privilegioAEliminar: AdministracionPrivilegios | null = null;


  mostrarListaPrivilegios: boolean = false;


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

  toggleAsignacionRoles() {
    this.mostrarListaAsignacionRoles = !this.mostrarListaAsignacionRoles;
    if (this.mostrarListaAsignacionRoles) {
      this.cargarAsignacionRoles();
    }
  }

  togglePrivilegios() {
    this.mostrarListaPrivilegios = !this.mostrarListaPrivilegios;
    if (this.mostrarListaPrivilegios) {
      this.cargarPrivilegios();
    }
  }

  constructor(
    private funcionalidadService: FuncionalidadService,
    private asignacionRolesService: AsignacionRolesService,
    private privilegiosService: AdministracionPrivilegiosService,
    private usuarioService: UsuariosService,
    private rolUsuarioService: RolUsuarioService
  ) {
      this.cargarUsuarios(); // Llama a la función para cargar los usuarios
      this.cargarRolesUsuarios(); // Llama a la función para cargar los usuarios
      this.cargarFuncionalidades();
    
   
  }

  // Métodos para Funcionalidades
  public mostrarFuncionalidades() {
    this.cargarFuncionalidades();
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

  ///AGREGAR
  
  public addFuncionalidad() {
    if (this.funcionalidadNombre.trim() === '' || this.funcionalidadDescripcion.trim() === '') {
      Notiflix.Notify.failure("Los campos Nombre y Descripción son obligatorios");
    } else {
      this.AddFuncionalidad(this.funcionalidadNombre, this.funcionalidadDescripcion);
    }
  }
  
  private AddFuncionalidad(nombre: string, descripcion: string) {
    var funcionalidadEntidad = new Funcionalidades();
    funcionalidadEntidad.nombre = nombre;
    funcionalidadEntidad.descripcion = descripcion;
    this.funcionalidadService.Add(funcionalidadEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response.body);
        if (response.body === 1) {
          Notiflix.Notify.success("Funcionalidad agregada con éxito");
          this.cargarFuncionalidades(); // Se actualiza el listado
          this.funcionalidadNombre = "";
          this.funcionalidadDescripcion = "";
        } else {
          Notiflix.Notify.failure("Fallo al agregar funcionalidad");
        }
      },
      error: (error: any) => {
        console.log(error);
        Notiflix.Notify.failure("Error al agregar funcionalidad");
      },
      complete: () => {
      },
    });
  }

  //EDITAR
  public editarFuncionalidad(funcionalidad: Funcionalidades) {
    this.funcionalidadId = funcionalidad.id;
    this.funcionalidadNombre = funcionalidad.nombre;
    this.funcionalidadDescripcion = funcionalidad.descripcion;
  }

  private editarFuncionalidadExistente() {
    const funcionalidadEditada: Funcionalidades = {
      id: this.funcionalidadId,
      nombre: this.funcionalidadNombre,
      descripcion: this.funcionalidadDescripcion
    };

    this.funcionalidadService.Update(funcionalidadEditada).subscribe({
      next: (response: HttpResponse<any>) => {
        Notiflix.Notify.success("Funcionalidad guardada con exito");
        this.cargarFuncionalidades();
        this.funcionalidadId = 0;
        this.funcionalidadNombre = '';
        this.funcionalidadDescripcion = '';
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  //GUARDAR
  public guardarFuncionalidad() {
    if (this.funcionalidadId === 0) {
      this.addFuncionalidad();
    } else {
      this.editarFuncionalidadExistente();
    }
  }

  //ELIMINAR

  public eliminarFuncionalidad(funcionalidad: Funcionalidades) {
    this.funcionalidadAEliminar = funcionalidad;
  
    Notiflix.Confirm.show(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar esta funcionalidad?',
      'Sí',
      'No',
      () => {
        this.realizarEliminacion();
      }
    );
  }
  
  private realizarEliminacion() {
    if (this.funcionalidadAEliminar && this.funcionalidadAEliminar.id !== 0) {
      this.funcionalidadService.Delete(this.funcionalidadAEliminar.id).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.body === 1) {
            Notiflix.Notify.success("Funcionalidad eliminada con éxito");
            this.cargarFuncionalidades();
            this.funcionalidadId = 0;
            this.funcionalidadNombre = '';
            this.funcionalidadDescripcion = '';
          } else {
            Notiflix.Notify.failure("Fallo al eliminar la funcionalidad");
          }
        },
        error: (error: any) => {
          console.log(error);
          Notiflix.Notify.failure("Error al eliminar la funcionalidad");
        },
        complete: () => {
        },
      });
    }
  }


  ////// Métodos para Roles Usuarios

  public mostrarRolesUsuario() {
    this.cargarRolesUsuarios();
  }

// Método para cargar Roles de Usuarios
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

 // AGREGAR ROL DE USUARIO
public agregarRolUsuario() {
  if (this.rolUsuarioNombre.trim() === '' || this.rolUsuarioDescripcion.trim() === '') {
    // Los campos no pueden estar vacíos, muestra una notificación de error
    Notiflix.Notify.failure("Los campos Nombre y Descripción son obligatorios");
  } else {
    this.agregarNuevoRolUsuario(this.rolUsuarioNombre, this.rolUsuarioDescripcion);
  }
}

private agregarNuevoRolUsuario(nombre: string, descripcion: string) {
  const nuevoRolUsuario: RolesUsuarios = {
    id: 0, // El servidor debe asignar un ID
    nombrE_ROL: nombre,
    descripcion: descripcion
  };

  this.rolUsuarioService.Add(nuevoRolUsuario).subscribe({
    next: (response: HttpResponse<any>) => {
      console.log(response.body);
      if (response.body === 1) {
        Notiflix.Notify.success("Rol de Usuario agregado con éxito");
        this.cargarRolesUsuarios(); // Actualiza el listado
        this.rolUsuarioNombre = "";
        this.rolUsuarioDescripcion = "";
      } else {
        Notiflix.Notify.failure("Fallo al agregar Rol de Usuario");
      }
    },
    error: (error: any) => {
      console.log(error);
      Notiflix.Notify.failure("Error al agregar Rol de Usuario");
    },
  });
}

// EDITAR ROL DE USUARIO
public editarRolUsuario(rol: RolesUsuarios) {
  this.rolUsuarioId = rol.id;
  this.rolUsuarioNombre = rol.nombrE_ROL;
  this.rolUsuarioDescripcion = rol.descripcion;
}

private editarRolUsuarioExistente() {
  const rolEditado: RolesUsuarios = {
    id: this.rolUsuarioId,
    nombrE_ROL: this.rolUsuarioNombre,
    descripcion: this.rolUsuarioDescripcion
  };

  this.rolUsuarioService.Update(rolEditado).subscribe({
    next: (response: HttpResponse<any>) => {
      Notiflix.Notify.success("Funcionalidad guardada con exito");
      this.cargarRolesUsuarios();
      this.rolUsuarioId = 0;
      this.rolUsuarioNombre = '';
      this.rolUsuarioDescripcion = '';
    },
    error: (error: any) => {
      console.log(error);
    },
  });
}

// GUARDAR ROL DE USUARIO
public guardarRolUsuario() {
  if (this.rolUsuarioId === 0) {
    this.agregarRolUsuario();
  } else {
    this.editarRolUsuarioExistente();
  }
}

// ELIMINAR ROL DE USUARIO
public eliminarRolUsuario(rol: RolesUsuarios) {
  this.RolAEliminar = rol;

  // Muestra un mensaje de confirmación utilizando Notiflix
  Notiflix.Confirm.show(
    'Confirmar Eliminación',
    '¿Estás seguro de que deseas eliminar este rol de usuario?',
    'Sí',
    'No',
    () => {
      this.realizarEliminacionRolUsuario();
    }
  );
}

private realizarEliminacionRolUsuario() {
  if (this.RolAEliminar && this.RolAEliminar.id !== 0) {
    this.rolUsuarioService.Delete(this.RolAEliminar.id).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.body === 1) {
          Notiflix.Notify.success("Rol de Usuario eliminado con éxito");
          this.cargarRolesUsuarios();
          this.rolUsuarioId = 0;
          this.rolUsuarioNombre = '';
          this.rolUsuarioDescripcion = '';
        } else {
          Notiflix.Notify.failure("Fallo al eliminar el Rol de Usuario");
        }
      },
      error: (error: any) => {
        console.log(error);
        Notiflix.Notify.failure("Error al eliminar el Rol de Usuario");
      },
      complete: () => {
      },
    });
  }
}


// Métodos para Asignacion de Roles

// Método para cargar la lista de usuarios
private cargarUsuarios() {
  this.usuarioService.GetUsuarios().subscribe({
    next: (response: HttpResponse<any>) => {
      this.listaUsuarios = response.body;
    },
    error: (error: any) => {
      console.log(error);
    },
  });
}

// Método para cargar la lista de Asignación de Roles
  private cargarAsignacionRoles() {
    this.asignacionRolesService.GetAll().subscribe({
      next: (response: HttpResponse<any>) => {
        this.listaAsignacionRoles = response.body;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }


// Método para buscar usuarios por ID
public buscarUsuario() {
  if (this.busquedaUsuario.trim() === '') {
    Notiflix.Notify.failure("Ingresa un ID de usuario válido");
  } else {
    const userId = parseInt(this.busquedaUsuario, 10); // Convierte la cadena a número
    if (!isNaN(userId)) {
      const usuarioEncontrado = this.listaUsuarios.find(usuario => usuario.id === userId);
      if (usuarioEncontrado) {
        this.usuarioSeleccionado = usuarioEncontrado.id;
      } else {
        Notiflix.Notify.failure("Usuario no encontrado");
        this.usuarioSeleccionado = 0; // Limpia la selección si no se encontró el usuario
      }
    } else {
      Notiflix.Notify.failure("Ingresa un ID de usuario válido");
      this.usuarioSeleccionado = 0; // Limpia la selección si la conversión falla
    }
  }
}

obtenerNombreUsuario(idUsuario: number): string {
  const usuario = this.listaUsuarios.find(usuario => usuario.id === idUsuario);
  return usuario ? usuario.nombreCompleto : 'Usuario no encontrado';
}

obtenerNombreRol(idRol: number): string {
  const rol = this.listaRolesUsuarios.find(rol => rol.id === idRol);
  return rol ? rol.nombrE_ROL : 'Rol no encontrado';
}

  // Método para agregar una asignación de rol
  public agregarAsignacionRol() {
    if (this.usuarioSeleccionado === 0 || this.rolUsuarioSeleccionado === 0) {
      // Los campos de usuario y rol no pueden estar vacíos, muestra una notificación de error
      Notiflix.Notify.failure("Selecciona un Usuario y un Rol de Usuario");
    } else {
      const nombreUsuario = this.obtenerNombreUsuario(this.usuarioSeleccionado);
      const nombreRol = this.obtenerNombreRol(this.rolUsuarioSeleccionado);
      this.nombreUsuarioSeleccionado = nombreUsuario;
      this.nombreRolUsuarioSeleccionado = nombreRol;
      this.AddAsignacionRol(this.usuarioSeleccionado, this.rolUsuarioSeleccionado);
    }
  }

  private AddAsignacionRol(idUsuario: number, idRol: number) {
    var asignacionRolEntidad = new AsignacionRoles();
    asignacionRolEntidad.idUsuario = idUsuario;
    asignacionRolEntidad.idRol = idRol;
    this.asignacionRolesService.Add(asignacionRolEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.body === 1) {
          Notiflix.Notify.success("Asignación de rol agregada con éxito");
          this.cargarAsignacionRoles(); // Se actualiza el listado
          this.usuarioSeleccionado = 0;
          this.rolUsuarioSeleccionado = 0;
        } else {
          Notiflix.Notify.failure("Fallo al agregar la asignación de rol");
        }
      },
      error: (error: any) => {
        console.log(error);
        Notiflix.Notify.failure("Error al agregar la asignación de rol");
      },
      complete: () => {
      },
    });
  }

// Método para editar una asignación de rol existente
  public editarAsignacion(asignacionRol: AsignacionRoles) {
    this.asignacionRolesId = asignacionRol.id;
    this.usuarioSeleccionado = asignacionRol.idUsuario;
    this.rolUsuarioSeleccionado = asignacionRol.idRol;
  
// Cargar el nombre del usuario y el nombre del rol
    const nombreUsuario = this.obtenerNombreUsuario(this.usuarioSeleccionado);
    const nombreRol = this.obtenerNombreRol(this.rolUsuarioSeleccionado);
    this.nombreUsuarioSeleccionado = nombreUsuario;
    this.nombreRolUsuarioSeleccionado = nombreRol;
  }

// Método para guardar una asignación de rol (tanto agregar como editar)
  public guardarAsignacion() {
    if (this.asignacionRolesId === 0) {
      this.agregarAsignacionRol();
    } else {
      this.editarAsignacionExistente();
    }
  }
// Método para editar una asignación de rol existente
  private editarAsignacionExistente() {
    const asignacionRolEditada: AsignacionRoles = {
      id: this.asignacionRolesId,
      idUsuario: this.usuarioSeleccionado,
      idRol: this.rolUsuarioSeleccionado
    };

    this.asignacionRolesService.Update(asignacionRolEditada).subscribe({
      next: (response: HttpResponse<any>) => {
        Notiflix.Notify.success("Asignación de rol guardada con éxito");
        this.cargarAsignacionRoles();
        this.asignacionRolesId = 0;
        this.usuarioSeleccionado = 0;
        this.rolUsuarioSeleccionado = 0;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
// Método para eliminar una asignación de rol
  public eliminarAsignacion(asignacionRol: AsignacionRoles) {
    this.asignacionRolAEliminar = asignacionRol;
    Notiflix.Confirm.show(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar esta asignación de rol?',
      'Sí',
      'No',
      () => {
        this.realizarEliminacion2();
      }
    );
  }
  // Método para realizar la eliminación de una asignación de rol
  private realizarEliminacion2() {
    if (this.asignacionRolAEliminar && this.asignacionRolAEliminar.id !== 0) {
      this.asignacionRolesService.Delete(this.asignacionRolAEliminar.id).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.body === 1) {
            Notiflix.Notify.success("Asignación de rol eliminada con éxito");
            this.cargarAsignacionRoles();
            this.asignacionRolesId = 0;
            this.usuarioSeleccionado = 0;
            this.rolUsuarioSeleccionado = 0;
          } else {
            Notiflix.Notify.failure("Fallo al eliminar la asignación de rol");
          }
        },
        error: (error: any) => {
          console.log(error);
          Notiflix.Notify.failure("Error al eliminar la asignación de rol");
        },
        complete: () => {
        },
      });
    }
  }

// Métodos para Administracion Privilegios

// Método para cargar la lista de Administracion de privilegios
private cargarPrivilegios() {
  this.privilegiosService.GetAll().subscribe({
    next: (response: HttpResponse<any>) => {
      this.listaPrivilegios = response.body;
    },
    error: (error: any) => {
      console.log(error);
    },
  });
}

obtenerNombreFuncionalidad(idFuncionalidad: number): string {
  const funcionalidad = this.listaFuncionalidades.find(funcionalidad => funcionalidad.id === idFuncionalidad);
  return funcionalidad ? funcionalidad.nombre : 'Usuario no encontrado';
}

  // Método para agregar
  public agregarPrivilegio() {
    if (this.rolUsuarioSeleccionado === 0 || this.funcionalidadSeleccionada === 0) {
      Notiflix.Notify.failure("Selecciona un Usuario y un Rol de Usuario");
    } else {
      const nombreRol = this.obtenerNombreRol(this.rolUsuarioSeleccionado);
      const nombreFuncionalidad = this.obtenerNombreFuncionalidad(this.funcionalidadSeleccionada);
      this.nombreRolUsuarioSeleccionado = nombreRol;
      this.nombreFuncionalidadSeleccionada = nombreFuncionalidad;
      this.AddPrivilegio(this.rolUsuarioSeleccionado, this.funcionalidadSeleccionada);
    }
  }

  private AddPrivilegio(idRol: number, idFuncionalidad: number) {
    var privilegioEntidad = new AdministracionPrivilegios();
    privilegioEntidad.idRol = idRol;
    privilegioEntidad.idFuncionalidad = idFuncionalidad;
    this.privilegiosService.Add(privilegioEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.body === 1) {
          Notiflix.Notify.success("Asignación de rol agregada con éxito");
          this.cargarPrivilegios(); // Se actualiza el listado
          this.rolUsuarioSeleccionado = 0;
          this.funcionalidadSeleccionada = 0;
        } else {
          Notiflix.Notify.failure("Fallo al agregar la asignación de rol");
        }
      },
      error: (error: any) => {
        console.log(error);
        Notiflix.Notify.failure("Error al agregar la asignación de rol");
      },
      complete: () => {
      },
    });
  }
// Método para editar
public editarPrivilegio(privilegio: AdministracionPrivilegios) {
  this.privilegiosId = privilegio.id;
  this.rolUsuarioSeleccionado = privilegio.idRol;
  this.funcionalidadSeleccionada = privilegio.idFuncionalidad;

// Cargar el nombre del rol y el nombre de la funcionalidad
  const nombreRol = this.obtenerNombreRol(this.rolUsuarioSeleccionado);
  const nombreFuncionalidad = this.obtenerNombreFuncionalidad(this.funcionalidadSeleccionada);
  this.nombreRolUsuarioSeleccionado = nombreRol;
  this.nombreFuncionalidadSeleccionada = nombreFuncionalidad;
}
// Método para guardar una asignación de rol (tanto agregar como editar)
public guardarPrivilegio() {
  if (this.privilegiosId === 0) {
    this.agregarPrivilegio();
  } else {
    this.editarPrivilegioExistente();
  }
}
// Método para editar una asignación de rol existente
private editarPrivilegioExistente() {
  const privilegioEditada: AdministracionPrivilegios = {
    id: this.privilegiosId,
    idRol: this.rolUsuarioSeleccionado,
    idFuncionalidad: this.funcionalidadSeleccionada
  };

  this.privilegiosService.Update(privilegioEditada).subscribe({
    next: (response: HttpResponse<any>) => {
      Notiflix.Notify.success("Asignación de rol guardada con éxito");
      this.cargarPrivilegios();
      this.privilegiosId = 0;
      this.rolUsuarioSeleccionado = 0;
      this.funcionalidadSeleccionada = 0;
    },
    error: (error: any) => {
      console.log(error);
    },
  });
}
// Método para eliminar un privilegio
public eliminarPrivilegio(privilegio: AdministracionPrivilegios) {
  this.privilegioAEliminar = privilegio;
  Notiflix.Confirm.show(
    'Confirmar Eliminación',
    '¿Estás seguro de que deseas eliminar esta asignación de rol?',
    'Sí',
    'No',
    () => {
      this.realizarEliminacion3();
    }
  );
}
// Método para realizar la eliminación de un privilegio
private realizarEliminacion3() {
  if (this.privilegioAEliminar && this.privilegioAEliminar.id !== 0) {
    this.privilegiosService.Delete(this.privilegioAEliminar.id).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.body === 1) {
          Notiflix.Notify.success("Asignación de rol eliminada con éxito");
          this.cargarPrivilegios();
          this.privilegiosId = 0;
          this.rolUsuarioSeleccionado = 0;
          this.funcionalidadSeleccionada = 0;
        } else {
          Notiflix.Notify.failure("Fallo al eliminar la asignación de rol");
        }
      },
      error: (error: any) => {
        console.log(error);
        Notiflix.Notify.failure("Error al eliminar la asignación de rol");
      },
      complete: () => {
      },
    });
  }
}





}