import { Component, OnInit } from '@angular/core';
import { CarritoCompra } from '../entidades/carrito-compra';
import { DetalleCarrito } from '../entidades/detalle-carrito';
import { CarritoCompraService } from '../servicios-backend/carrito-compra/carrito-compra.service';
import { HttpResponse } from '@angular/common/http';
import { DetalleCarritoService } from '../servicios-backend/detalle-carrito/detalle-carrito.service';
import * as Notiflix from 'notiflix'; // Importar Notiflix
import { Storage } from '@ionic/storage-angular';
import { CategoriaProducto } from '../entidades/categoria-producto';
import { CategoriaProductoService } from '../servicios-backend/categoria-producto/categoria-producto.service';
import { Producto } from '../entidades/producto';
import { ProductoService } from '../servicios-backend/producto/producto.service';
import { Usuarios } from '../entidades/usuarios';
import { UsuariosService } from '../servicios-backend/usuarios/usuarios.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})

export class Tab4Page {
  selectedFontSize: string = '';
  fontSize: number = 16; // Tamaño Fuente predeterminada
  fuenteSeleccionada: string = 'Arial, sans-serif'; // Fuente predeterminada
  darkMode = false; //Modo oscuro

  //Propiedades Carrito de Compra
  public id = 0;
  public fecha = new Date();
  public idUsuario = 0;
  isUpdating: boolean = false; // Esta variable controla si se está actualizando o agregando un carrito
  public listaCarrito: CarritoCompra[] = []
  public carritoCompra: CarritoCompra | null = null;

  // Propiedades para Detalle de Carrito
  public idDetalle = 0;
  public cantidad = 0;
  public idProducto = 0;
  public idCarritoCompra = 0;
  public listaDetalle: DetalleCarrito[] = []
  public detalleCarrito: DetalleCarrito | null = null;

  // Propiedades para CategoriaProducto
  public categoriaProductoId = 0;
  public categoriaProductoNombre = ""
  public listaCategoria: CategoriaProducto[] = []
  public categoriaProducto: CategoriaProducto | null = null;

  // Propiedades para Producto
  public productoId = 0;
  public productoNombre = "";
  public productoIdCategoria = 0;
  public listaProducto: Producto[] = []
  public producto: Producto | null = null;

  //Prpiedades  referentes a usuarios
  public usuarioId = 0;
  public nombreCompleto = "";
  public listaUsuarios: Usuarios[] = [];
  public usuarios: Usuarios | null = null;

  constructor(
    private carritoService: CarritoCompraService,
    private detalleService: DetalleCarritoService,
    private categoriaProductoService: CategoriaProductoService,
    private productoService: ProductoService,
    private usuariosService: UsuariosService,
    private storage: Storage
  ) {
    this.obtenerTamanoFuente();
    this.obtenerFuente();
    this.obtenerTema();
    this.getCarritoFromBackend();
    this.getDetalleFromBackend();
    this.cargarCategoriaProducto();
    this.cargarProducto();
    this.cargarUsuarios();
    this.storage.create();

  }

  obtenerTamanoFuente() {
    // Inicializar el tamaño de fuente desde el localStorage al cargar la página.
    const storedFontSize = localStorage.getItem('fontSize');
    this.selectedFontSize = storedFontSize || 'medium';
    if (storedFontSize) {
      document.documentElement.style.setProperty('--app-font-size', this.selectedFontSize);
    } // Tamaño de fuente predeterminado si no hay preferencia almacenada.
  }
  // Método para llamar obterner fuente
  obtenerFuente() {
    const savedFontFamily = localStorage.getItem('fuente');
    if (savedFontFamily) {
      this.fuenteSeleccionada = savedFontFamily;
      document.documentElement.style.setProperty('--fuente-seleccionada', this.fuenteSeleccionada);
    }
  }

  //Obtener el tema de preferencia
  obtenerTema() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivaded');
    checkIsDarkMode == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false)
    document.body.classList.toggle('dark', this.darkMode);
  }
  //Metodos referentes a CATEGORIA PRODUCTO
  // Este método obtiene todas las categorías de producto de la API.
  private cargarCategoriaProducto() {
    this.categoriaProductoService.GetAll().subscribe({
      next: (response: HttpResponse<any>) => {
        this.listaCategoria = response.body;
        console.log(this.listaCategoria)
      },
      error: (error: any) => {
        console.log(error);
        Notiflix.Notify.failure("Error al obtener CATEGORIA PRODUCTO")
      },
      complete: () => {
        //console.log('complete - this.getCategoria()');
      },
    });
  }

  // Método para verificar si existe el ID de Categoria de producto
  public verificarIdCategoriaProducto(idCategoria: number): boolean {
    return this.listaProducto.some((categoriaProducto) => categoriaProducto.id === idCategoria);
  }

  // Metodos referentes a PRODUCTOS
  // Metodo para obtener todos producto desde la API
  private cargarProducto() {
    this.productoService.GetAll().subscribe({
      next: (response: HttpResponse<any>) => {
        this.listaProducto = response.body;
        console.log(this.listaProducto)
      },
      error: (error: any) => {
        console.log(error);
        Notiflix.Notify.failure("Error al obtener Productos  :(");
      },
      complete: () => {
        //console.log('complete - this.getProducto()');
      },
    });
  }

  // Método para verificar si un nombre de producto ya existe en la lista
  public verificarNombreProducto(nombreProducto: string): boolean {
    return this.listaProducto.some((producto) => producto.nombre === nombreProducto);
  }

  // Método para verificar si existe el ID de producto
  public existeIdProducto(idProducto: number): boolean {
    return this.listaProducto.some((producto) => producto.id === idProducto);
  }

  // Método para validar el ID de Producto
  private validarIdProducto(): boolean {
    if (!this.existeIdProducto(this.idProducto)) {
      Notiflix.Notify.failure(`El ID de Producto ${this.idProducto} ingresado no existe`);
      return false;
    }
    return true;
  }


  //Metodos referentes a USUARIOS
  private cargarUsuarios() {
    this.usuariosService.GetUsuarios().subscribe({
      next: (response: HttpResponse<any>) => {
        this.listaUsuarios = response.body;
        console.log(this.listaUsuarios);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.getUsuarios()');
      },
    });
  }

  // Método para verificar si existe el ID de Usuario
  public existeIdUsuario(idUsuario: number): boolean {
    console.log(idUsuario);
    console.log(this.listaUsuarios);
    
    return this.listaUsuarios.some((usuarios) => usuarios.id == idUsuario);
    

  }

  // Método para validar el ID de Usuario
  private validarIdUsuario(): boolean {
    if (!this.existeIdUsuario(this.idUsuario)) {
      Notiflix.Notify.failure(`El ID de Usuario ${this.idUsuario} ingresado no existe`);
      return false;
    }
    return true;
  }

  //  Metodos para CARRITO DE COMPRAS

  //Metodo para obtener todos los carritos de compras
  private getCarritoFromBackend() {
    this.carritoService.GetAll().subscribe({
      next: (response: HttpResponse<any>) => {
        this.listaCarrito = response.body;
        console.log(this.listaCarrito)
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.getCarrito()');
      },
    });
  }

  //Obtener Carrito de Compras por ID
  public getCarritoById() {
    if (this.id !== 0 || this.id) {
      this.getCarritoByIDFromBackend(this.id);
    } else {
      // El campo Id no puede ser cero, muestra una notificación de error
      Notiflix.Notify.failure("El campo Id de Carrito es obligatorio y distinto de cero");
    }
  }

  //Metodo para obtener un carrito de compras por ID desde la API
  private getCarritoByIDFromBackend(id: number) {
    this.carritoService.GetById(id).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status == 200) {
          // Asignar el Carrito obtenido a la propiedad carrito
          this.carritoCompra = response.body;
          console.log(this.carritoCompra)
          // console.log(response.body);
        } else {
          Notiflix.Notify.failure("Fallo al Obtener DETALLE :(");
        }
      },
      error: (error: any) => {
        console.log(error);
        Notiflix.Notify.failure("Error al obtener Carrito");
      },
      complete: () => {
        //console.log('complete - this.getByIDFromBackend()');
      },
    });
  }

  // Método para verificar si existe el ID de CARRITO
  public existeIdCarrito(idCarritoCompra: number): boolean {
    console.log(this.listaCarrito);
    return this.listaCarrito.some((carritoCompra) => carritoCompra.id === idCarritoCompra);
  }

  // Método para validar el ID de Carrito
  private validarIdCarrito(): boolean {
    if (!this.existeIdCarrito(this.id)) {
      Notiflix.Notify.failure(`El ID de Carrito ${this.id} ingresado no existe`);
      return false;
    }
    return true;
  }

  // Metodo para Agregar Carrito de Compra
  public addCarrito() {
    //this.AddCarritoFromBackend(this.fecha, this.idUsuario)
    const validacionIdUsuario = this.validarIdUsuario();
    console.log(validacionIdUsuario);
    if (validacionIdUsuario) {
      Notiflix.Confirm.show(
        'Confirmar',
        '¿Estás seguro de que deseas agregar este Carrito?',
        'Sí',
        'No',
        () => {
          this.AddCarritoFromBackend(this.fecha, this.idUsuario);
        }
      );
    }
  }

  //Metodo para Agregar carrito de compras al backend
  private async AddCarritoFromBackend(fecha: Date, idUsuario: number) {
    var carritoEntidad = new CarritoCompra();
    carritoEntidad.fecha = fecha;
    carritoEntidad.idUsuario = idUsuario;
    //carritoEntidad.usuarioRegistro = (await this.storage.get('idUserStorage')).toString();
    this.carritoService.Add(carritoEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response.body)//1
        if (response.body == 1) {
          Notiflix.Notify.success("Se agrego el CARRITO con exito :)");
          this.getCarritoFromBackend();//Se actualize el listado
          this.fecha = new Date();
          this.idUsuario = 0;
        } else {
          Notiflix.Notify.failure("Fallo al agregar CARRITO  :(");
        }
      },
      error: (error: any) => {
        console.log(error);
        Notiflix.Notify.failure("Error al agregar carrito  :(");
      },
      complete: () => {
        //console.log('complete - this.Add()');
      },
    });
  }

  // Método para verificar si existe el ID de Detalle
  public existeIdDetalle(idDetalle: number): boolean {
    return this.listaDetalle.some((detalleCarrito) => detalleCarrito.id === idDetalle);
  }
    
  // Método para validar el ID de Detalle
  private validarIdDetalle(): boolean {
    if (!this.existeIdDetalle(this.idDetalle)) {
      Notiflix.Notify.failure(`El ID de Detalle Carrito ${this.idDetalle} ingresado no existe`);
      return false;
    }
      return true;
  }



  // Actualizar Carrito de Compra
  public updateCarrito(id: number, fecha: Date, idUsuario: number) {
   // this.updateCarritoFromBackend(id, fecha, idUsuario)
   const validacionIdCarrito = this.validarIdCarrito(); 
    const validacionIdUsuario = this.validarIdUsuario();  
    if (validacionIdUsuario && validacionIdCarrito ) {
      Notiflix.Confirm.show(
        'Confirmar',
        '¿Estás seguro de que deseas actualizar este Carrito?',
        'Sí',
        'No',
        () => {
          this.updateCarritoFromBackend(id, fecha, idUsuario);
        }
      );
    }
  }

  //Metodo para actualizar el carrito de compras desde la API
  private updateCarritoFromBackend(id: number, fecha: Date, idUsuario: number) {
    var carritoEntidad = new CarritoCompra();
    carritoEntidad.id = id;
    carritoEntidad.fecha = fecha;
    carritoEntidad.idUsuario = idUsuario;

    this.carritoService.Update(carritoEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response.body)//1
        if (response.body == 1) {
          Notiflix.Notify.success("Se Actualizó el CARRITO con exito :)");
          this.getCarritoFromBackend();//Se actualize el listado
          this.id = 0;
          this.fecha = new Date();
          this.idUsuario = 0;
        } else {
          Notiflix.Notify.failure("Fallo Al actualizar al CARRITO:(");
        }
      },
      error: (error: any) => {
        console.log(error);
        Notiflix.Notify.failure("Error al actualizar al carrito:(");
      },
      complete: () => {
        //console.log('complete - this.AddUsuario()');
      },
    });
  }

  // Metodo public Eliminar Carrito por ID
  public deleteCarrito(id: number) {
    if (id !== 0 || id) {
      // Muestra un mensaje de confirmación utilizando Notiflix
      Notiflix.Confirm.show(
        'Confirmar Eliminación',
        '¿Estás seguro de que deseas eliminar este Carrito de Compras?',
        'Sí',
        'No',
        () => {
          this.deleteCarritoFromBackend(id);
        }
      );
    } else {
      // El campo Id no puede ser cero, muestra una notificación de error
      Notiflix.Notify.failure("El campo Id de Carrito es obligatorio y distinto de cero");
    }
  }

  // Eliminar Carrito por ID
  private deleteCarritoFromBackend(id: number) {
    this.carritoService.Delete(id).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.body == 1) {
          Notiflix.Notify.success("Se eliminó el CARRITO con éxito :)");
          this.getCarritoFromBackend(); // Se actualiza el listado            
        } else {
          Notiflix.Notify.failure("Fallo al eliminar el CARRITO  :(");
        }
      },
      error: (error: any) => {
        console.log(error);
        Notiflix.Notify.failure("Error al eliminar el carrito  :(");
      },
      complete: () => {
        //console.log('complete - this.deleteCarrito()');
      },
    });
  }





  // ||||||||||| METODOS PARA DETALLE DE CARRITO  |||||||||||

  // Metodo para obtener los detalles de carrito desde la API
  private getDetalleFromBackend() {
    this.detalleService.GetAll().subscribe({
      next: (response: HttpResponse<any>) => {
        this.listaDetalle = response.body;
        console.log(this.listaDetalle)
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.getCarrito()');
      },
    });
  }

  //Metodo para obtener Detalle Carrito por ID
  public getDetalleById() {
    if (this.idDetalle !== 0 || this.idDetalle) {
      this.getDetalleByIDFromBackend(this.idDetalle);
    } else {
      // El campo Id no puede ser cero, muestra una notificación de error
      Notiflix.Notify.failure("El campo Id de Detalle es obligatorio y distinto de cero");
    }
  }

  //Metodo para obtener Detalle de Carrito por Id desde la API
  private getDetalleByIDFromBackend(idDetalle: number) {
    this.detalleService.GetById(idDetalle).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status == 200) {
          // Asignar el Carrito obtenido a la propiedad carrito
          this.detalleCarrito = response.body;
          console.log(this.detalleCarrito)
          // console.log(response.body);
        } else {
          Notiflix.Notify.failure("Fallo al Obtener DETALLE :(");
        }
      },
      error: (error: any) => {
        console.log(error);
        Notiflix.Notify.failure("Error al obtener detalle  :(");
      },
      complete: () => {
        //console.log('complete - this.getByIDFromBackend()');
      },
    });
  }


  //Agregar Detalle de Carrito
  public addDetalleCarrito() {
    const validacionIdCarrito = this.validarIdCarrito();
    const validacionIdProducto = this.validarIdProducto();
    console.log(validacionIdCarrito);
    console.log(validacionIdProducto);
    if (validacionIdCarrito && validacionIdProducto) {
      Notiflix.Confirm.show(
        'Confirmar',
        '¿Estás seguro de que deseas agregar este Detalle?',
        'Sí',
        'No',
        () => {
          this.AddDetalleFromBackend(this.cantidad, this.idProducto, this.idCarritoCompra);
        }
      );
    }
  }


  //Metodo para agregar detalle de carrito en la API
  private async AddDetalleFromBackend(cantidad: number, idProducto: number, idCarritoCompra: number) {
    var detalleEntidad = new DetalleCarrito();
    detalleEntidad.cantidad = cantidad;
    detalleEntidad.idProducto = idProducto;
    detalleEntidad.idCarritoCompra = idCarritoCompra;
    // detalleEntidad.usuarioRegistro = (await this.storage.get('idUserStorage')).toString();

    this.detalleService.Add(detalleEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response.body)//1
        if (response.body == 1) {
          Notiflix.Notify.success("Se agrego el DETALLE con exito :)");
          this.getDetalleFromBackend();//Se actualize el listado
          this.cantidad = 0;
          this.idProducto = 0;
          this.idCarritoCompra = 0;
        } else {
          Notiflix.Notify.failure("Fallo al Agregar DETALLE :(");
        }
      },
      error: (error: any) => {
        console.log(error);
        Notiflix.Notify.failure("Error al Eliminar Detalle");
      },
      complete: () => {
        //console.log('complete - this.AddUsuario()');
      },
    });
  }


  // Actualizar Detalle de Carrito de Compra
  public updateDetalle() {
    //this.updateDetalleFromBackend(this.idDetalle, this.cantidad, this.idProducto, this.idCarritoCompra)
    const validacionIdDetalle = this.validarIdDetalle();  
    const validacionIdCarrito = this.validarIdCarrito(); 
    const validacionIdProducto = this.validarIdProducto(); 
    if (validacionIdCarrito && validacionIdProducto && validacionIdDetalle) {
      Notiflix.Confirm.show(
        'Confirmar',
        '¿Estás seguro de que deseas agregar este Detalle?',
        'Sí',
        'No',
        () => {
          this.updateDetalleFromBackend(this.idDetalle, this.cantidad, this.idProducto, this.idCarritoCompra);
        }
      );
    }
  }
  private updateDetalleFromBackend(idDetalle: number, cantidad: number, idProducto: number, idCarritoCompra: number) {
    var detalleEntidad = new DetalleCarrito();
    detalleEntidad.id = idDetalle;
    detalleEntidad.cantidad = cantidad;
    detalleEntidad.idProducto = idProducto;
    detalleEntidad.idCarritoCompra = idCarritoCompra;

    this.detalleService.Update(detalleEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response.body)//1
        if (response.body == 1) {
          Notiflix.Notify.success("Se actualizó el Detalle de Carrito con exito :)");
          this.getDetalleFromBackend();//Se actualize el listado
          this.cantidad = 0;
          this.idProducto = 0;
          this.idCarritoCompra = 0;
        } else {
          Notiflix.Notify.failure("Fallo al actualizar el Detalle de Carrito:(");
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.AddUsuario()');
      },
    });
  }

  // Metodo public Eliminar Detalle Carrito por ID
  public deleteDetalle(idDetalle: number) {
    if (idDetalle !== 0 || idDetalle) {
      // Muestra un mensaje de confirmación utilizando Notiflix
      Notiflix.Confirm.show(
        'Confirmar Eliminación',
        '¿Estás seguro de que deseas eliminar este Detalle de Carrito?',
        'Sí',
        'No',
        () => {
          this.deleteDetalleFromBackend(idDetalle);
        }
      );
    } else {
      // El campo Id no puede ser cero, muestra una notificación de error
      Notiflix.Notify.failure("El campo Id de Carrito es obligatorio y distinto de cero");
    }
  }

  // Eliminar Detalle por ID
  private deleteDetalleFromBackend(id: number) {
    this.detalleService.Delete(id).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.body == 1) {
          Notiflix.Notify.success("Se eliminó el DETALLE con éxito :)");
          this.getDetalleFromBackend(); // Se actualiza el listado            
        } else {
          Notiflix.Notify.failure("Fallo al eliminar el DETALLE :(");
        }
      },
      error: (error: any) => {
        console.log(error);
        Notiflix.Notify.failure("Error al eliminar el DETALLE :(");
      },
      complete: () => {
        //console.log('complete - this.deleteDetalle()');
      },
    });
  }



}
