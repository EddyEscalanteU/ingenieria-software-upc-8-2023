import { Component, OnInit } from '@angular/core';
import { CarritoCompra } from '../entidades/carrito-compra';
import { DetalleCarrito } from '../entidades/detalle-carrito';
import { CarritoCompraService } from '../servicios-backend/carrito-compra/carrito-compra.service';
import { HttpResponse } from '@angular/common/http';
import { DetalleCarritoService } from '../servicios-backend/detalle-carrito/detalle-carrito.service';
import * as Notiflix from 'notiflix'; // Importar Notiflix
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})

export class Tab4Page {
  fuenteSeleccionada: string = 'Arial, sans-serif'; // Fuente predeterminada
  //Carrito de Compra
  public id = 0;
  public fecha = new Date();
  public idUsuario = 0;
  isUpdating: boolean = false; // Esta variable controla si se está actualizando o agregando un carrito


  public listaCarrito: CarritoCompra[] = []
  public carritoCompra: CarritoCompra | null = null;

  // Detalle de Carrito
  public idDetalle = 1;
  public cantidad = 0;
  public idProducto = 0;
  public idCarritoCompra = 0;

  public listaDetalle: DetalleCarrito[] = []
  public detalleCarrito: DetalleCarrito | null = null;

  constructor(private carritoService: CarritoCompraService, private detalleService: DetalleCarritoService, private storage: Storage) {
    this.obtenerFuente();
    this.getCarritoFromBackend();
    this.getDetalleFromBackend();
    this.storage.create();

  }

  // Método para llamar obterner fuente
  obtenerFuente() {
    const savedFontFamily = localStorage.getItem('fuente');
    if (savedFontFamily) {
      this.fuenteSeleccionada = savedFontFamily;
    }
  }

  // Metodos para Carrito de Compra

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
    this.getCarritoByIDFromBackend(this.id);
  }
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

  // Agregar Carrito de compras
  public addCarrito() {
    this.AddCarritoFromBackend(this.fecha, this.idUsuario)
  }
  private async AddCarritoFromBackend(fecha: Date, idUsuario: number) {
    var carritoEntidad = new CarritoCompra();
    carritoEntidad.fecha = fecha;
    carritoEntidad.idUsuario = idUsuario;
    carritoEntidad.usuarioRegistro = (await this.storage.get('idUserStorage')).toString();
    this.carritoService.Add(carritoEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response.body)//1
        if (response.body == 1) {
          Notiflix.Notify.success("Se agrego el CARRITO con exito :)");
          this.getCarritoFromBackend();//Se actualize el listado
          this.fecha = new Date();
          this.idUsuario = 1;
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

  // Actualizar Carrito de Compra
  public updateCarrito(id: number, fecha: Date, idUsuario: number) {
    this.updateCarritoFromBackend(id, fecha, idUsuario)
  }
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
    this.deleteCarritoFromBackend(id);
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

  // Iniciar la actualizacion 
  startUpdating() {
    // Lógica para iniciar la actualización
    this.isUpdating = true;
    // Puedes agregar más lógica aquí, como cargar los datos del carrito que se va a actualizar
  }

  // Detener la actualizacion 
  stopUpdating() {
    // Lógica para iniciar la actualización
    this.isUpdating = false;
    // Puedes agregar más lógica aquí, como cargar los datos del carrito que se va a actualizar
  }


  // ||| Submit del formualario para actualizar o agregar carrito de compra
  onSubmit() {
    if (this.isUpdating) {
      // Realiza la lógica para actualizar el carrito con el ID proporcionado
      this.updateCarritoFromBackend(this.id, this.fecha, this.idUsuario)
      console.log('Actualizar carrito con ID:', this.id, 'Fecha:', this.fecha, 'ID de Usuario:', this.idUsuario);
    } else {
      // Realiza la lógica para agregar un nuevo carrito
      this.AddCarritoFromBackend(this.fecha, this.idUsuario)
      console.log('Agregar nuevo carrito con Fecha:', this.fecha, 'ID de Usuario:', this.idUsuario);
    }
  }

  ///// METODOS PARA DETALLE DE CARRITO  ||||||||||||||||||||||

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

  //Obtener Detalle Carrito de Compras por ID
  public getDetalleById() {
    this.getDetalleByIDFromBackend(this.idDetalle);
  }
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
    this.AddDetalleFromBackend(this.cantidad, this.idProducto, this.idCarritoCompra)
  }
  private async AddDetalleFromBackend(cantidad: number, idProducto: number, idCarritoCompra: number) {

    var detalleEntidad = new DetalleCarrito();
    detalleEntidad.cantidad = cantidad;
    detalleEntidad.idProducto = idProducto;
    detalleEntidad.idCarritoCompra = idCarritoCompra;
    detalleEntidad.usuarioRegistro = (await this.storage.get('idUserStorage')).toString();

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
    this.updateDetalleFromBackend(this.idDetalle, this.cantidad, this.idProducto, this.idCarritoCompra)
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

  // Metodo public Eliminar Carrito por ID
  public deleteDetalle(id: number) {
    this.deleteDetalleFromBackend(id);
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
