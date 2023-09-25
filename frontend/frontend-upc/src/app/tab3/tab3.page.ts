import { Component, OnInit } from '@angular/core';
import { Producto } from '../entidades/producto';
import { ProductoService } from '../servicios-backend/producto/producto.service';
import { HttpClient, HttpResponse } from '@angular/common/http'
import * as Notiflix from 'notiflix'; // Importar Notiflix
import { Storage } from '@ionic/storage-angular';




@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    fuenteSeleccionada: string = 'Arial, sans-serif'; // Fuente predeterminada

    public id = 0;
    public nombre = "";
    public idCategoria = 0;

    public listaProducto: Producto[] = []
    public producto: Producto | null = null;

    constructor(private productoService: ProductoService, private storage: Storage) {
        this.obtenerFuente();
        this.getProductoFromBackend();
        this.storage.create();
    }

    // Método para llamar obterner fuente
    obtenerFuente() {
        const savedFontFamily = localStorage.getItem('fuente');
        if (savedFontFamily) {
            this.fuenteSeleccionada = savedFontFamily;
        }
    }

    private getProductoFromBackend() {
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
    /*
        public  getById(id: number){
            this.getByIDFromBackend(id);
        }
    */

    public getById() {
        this.getByIDFromBackend(this.id);
    }

    // Metodo para obtener Producto desde la API
    private getByIDFromBackend(id: number) {
        this.productoService.GetById(id).subscribe({
            next: (response: HttpResponse<any>) => {
                if (response.status == 200) {
                    // Asignar el Producto obtenido a la propiedadProducto
                    this.producto = response.body;
                    console.log(this.producto)
                    // console.log(response.body);
                } else {
                    Notiflix.Notify.failure("Fallo al Obtener PRODUCTO :(");
                }
            },
            error: (error: any) => {
                console.log(error);
                // Mostrar un mensaje de error
                Notiflix.Notify.failure('Error al obtener el PRODUCTO');

            },
            complete: () => {
                //console.log('complete - this.getByIDFromBackend()');
            },
        });
    }

    public addProducto() {
        this.AddProductoFromBackend(this.nombre, this.idCategoria)
    }
    // Este método agrega un nuevo producto a la API.
    private async AddProductoFromBackend(nombre: string, idCategoria: number) {
        var productoEntidad = new Producto();
        productoEntidad.nombre = nombre;
        productoEntidad.idCategoria = idCategoria;
        productoEntidad.usuarioRegistro = (await this.storage.get('idUserStorage')).toString();

        this.productoService.Add(productoEntidad).subscribe({
            next: (response: HttpResponse<any>) => {
                console.log(response.body)//1
                if (response.body == 1) {
                    Notiflix.Notify.success("Se agrego el PRODUCTO con exito :)");
                    this.getProductoFromBackend();//Se actualize el listado
                    this.nombre = "";
                    this.idCategoria = 0;
                } else {
                    Notiflix.Notify.failure("Fallo al agregar el PRODUCTO  :(");
                }
            },
            error: (error: any) => {
                console.log(error);
                Notiflix.Notify.failure("Error al agregar Producto");
            },
            complete: () => {
                //console.log('complete - this.PRODUCTO()');
            },
        });
    }
    // metodo para actualizar un Producto
    public updateProducto(id: number, nombre: string, idCategoria: number) {
        this.updateProductoFromBackend(id, nombre, idCategoria)
    }
    // este método actualiza una categoría de producto en la API.   
    private updateProductoFromBackend(id: number, nombre: string, idCategoria: number) {
        var productoEntidad = new Producto();
        productoEntidad.id = id;
        productoEntidad.nombre = nombre;
        productoEntidad.idCategoria = idCategoria;

        this.productoService.Update(productoEntidad).subscribe({
            next: (response: HttpResponse<any>) => {
                console.log(response.body)//1
                if (response.body == 1) {
                    Notiflix.Notify.success("Se Actualizó el PRODUCTO con exito :)");
                    this.getProductoFromBackend();//Se actualize el listado
                    this.nombre = "";
                    this.idCategoria = 0;
                } else {
                    Notiflix.Notify.failure("Fallo al actualizar al PRODUCTO :(");
                }
            },
            error: (error: any) => {
                console.log(error);
                Notiflix.Notify.failure("Error al actualizar Producto")
            },
            complete: () => {
                //console.log('complete - this.AddUsuario()');
            },
        });
    }

    // Metodo public Eliminar Producto por ID
    public deleteProducto(id: number) {
        this.deleteProductoFromBackend(id);
    }
    // Este método elimina un  producto de la API.
    private deleteProductoFromBackend(id: number) {
        this.productoService.Delete(id).subscribe({
            next: (response: HttpResponse<any>) => {
                if (response.body == 1) {
                    Notiflix.Notify.success("Se eliminó el PRODUCTO con éxito :)");
                    this.getProductoFromBackend(); // Se actualiza el listado

                } else {
                    Notiflix.Notify.failure("Fallo al eliminar el PRODUCTO :(");
                }
            },
            error: (error: any) => {
                console.log(error);
                Notiflix.Notify.failure("Error al eliminar Producto");
            },
            complete: () => {
                //console.log('complete - this.deleteProducto()');
            },
        });
    }
}