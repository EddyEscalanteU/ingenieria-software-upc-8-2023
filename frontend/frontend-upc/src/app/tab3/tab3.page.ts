import { Component, OnInit } from '@angular/core';
import { Producto } from '../entidades/producto';
import { ProductoService } from '../servicios-backend/producto/producto.service';
import { HttpClient, HttpResponse } from '@angular/common/http'
import * as Notiflix from 'notiflix'; // Importar Notiflix
import { Storage } from '@ionic/storage-angular';
import { CategoriaProducto } from '../entidades/categoria-producto';
import { CategoriaProductoService } from '../servicios-backend/categoria-producto/categoria-producto.service';



@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    fuenteSeleccionada: string = 'Arial, sans-serif'; // Fuente predeterminada

    // Propiedades para Producto
    public id = 0;
    public nombre = "";
    public idCategoria = 0;
    public listaProducto: Producto[] = []
    public producto: Producto | null = null;

    // Propiedades para CategoriaProducto
    public categoriaProductoId = 0;
    public categoriaProductoNombre = ""
    public listaCategoria: CategoriaProducto[] = []
    public categoriaProducto: CategoriaProducto | null = null;



    constructor(
        private productoService: ProductoService, 
        private categoriaProductoService: CategoriaProductoService,
        private storage: Storage
    ) {
        this.obtenerFuente();
        this.getProductoFromBackend();
        this.cargarCategoriaProducto();
        this.storage.create();
    }

    // Método para llamar obterner fuente
    obtenerFuente() {
        const savedFontFamily = localStorage.getItem('fuente');
        if (savedFontFamily) {
            this.fuenteSeleccionada = savedFontFamily;
            document.documentElement.style.setProperty('--fuente-seleccionada', this.fuenteSeleccionada);
        }
    }

    // Este método obtiene todas las categorías de producto de la API.
    private cargarCategoriaProducto(){    
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

    // Metodo para obtener todos producto desde la API
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

    //Metodo para obtener producto por ID 
    public getById() {        
        if (this.id !== 0 || this.id) {
            this.getByIDFromBackend(this.id);      
        } else {
            // El campo Id no puede ser cero, muestra una notificación de error
            Notiflix.Notify.failure("El campo Id es obligatorio y distinto de cero");
        } 

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

    // Método para verificar si un nombre de producto ya existe en la lista
    public verificarNombreProducto(nombreProducto: string): boolean {
        return this.listaProducto.some((producto) => producto.nombre === nombreProducto);
    }

    // Método para verificar si id de categoria existe
    public verificarIdCategoria(idCategoria: number): boolean {
        return this.listaCategoria.some((categoriaProducto) => categoriaProducto.id === idCategoria);
    }

 /*   //Agregar un producto 
    public addProducto() {        

        if (this.nombre == '' || this.nombre.length<=4) {
            // El campo nombre debe tener almenos 4 caracteres, muestra una notificación de error
            Notiflix.Notify.failure("El campo nombre debe terner al menos 4 caracteres");
      
          } else if ( this.verificarNombreProducto(this.nombre)) {
            // El nombre de producto ya existe, muestra una notificación de error
            Notiflix.Notify.failure("El nombre de categoria ingresado ya existe");
      
          }else if ( !this.verificarIdCategoria(this.idCategoria)) {
            // El nombre de categoria no existe, muestra una notificación de error
            Notiflix.Notify.failure("El nombre de categoria ingresado no existe");
      
          }else{
            // Muestra un mensaje de confirmación utilizando Notiflix
            Notiflix.Confirm.show(      
              'Confirmar',
              '¿Estás seguro de que deseas agregar est Producto?',
              'Sí',
              'No',
              () => {
                this.AddProductoFromBackend(this.nombre, this.idCategoria)
              }       
            );
        }
    }
*/
    // Método para agregar un producto
    public addProducto() {
        const validacionNombre = this.validarNombreProducto();
        const validacionCategoria = this.validarIdCategoria();
    
        if (validacionNombre && validacionCategoria) {
        Notiflix.Confirm.show(
            'Confirmar',
            '¿Estás seguro de que deseas agregar este Producto?',
            'Sí',
            'No',
            () => {
            this.AddProductoFromBackend(this.nombre, this.idCategoria);
            }
        );
        }
    }
    
    // Método para validar el nombre de producto
    private validarNombreProducto(): boolean {
        if (this.nombre.length < 4) {
            Notiflix.Notify.failure("El campo nombre debe tener al menos 4 caracteres");
            return false;
        }
    
        if (this.verificarNombreProducto(this.nombre)) {
        Notiflix.Notify.failure("El nombre de producto ingresado ya existe");
            return false;
        }     
        
        return true;
    }
    
    // Método para validar el ID de la categoría
    private validarIdCategoria(): boolean {
        if (!this.verificarIdCategoria(this.idCategoria)) {
            Notiflix.Notify.failure("El ID de categoría ingresado no existe");
            return false;
        }
            return true;
    }
  

    // Este método agrega un nuevo producto a la API.
    private async AddProductoFromBackend(nombre: string, idCategoria: number) {
        var productoEntidad = new Producto();
        productoEntidad.nombre = nombre;
        productoEntidad.idCategoria = idCategoria;
        //productoEntidad.usuarioRegistro = (await this.storage.get('idUserStorage')).toString();

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

     // Método para verificar si existe el ID de producto
    public existeIdProducto(idProducto: number): boolean {
        return this.listaProducto.some((producto) => producto.id === idProducto);
    }

    // Método para validar el ID de Producto
    private validarIdProducto(): boolean {
        if (!this.existeIdProducto(this.id)) {
        Notiflix.Notify.failure(`El ID de Producto ${this.id} ingresado no existe`);
        return false;
        }
        return true;
    }

    // metodo para actualizar un Producto
    public updateProducto(id: number, nombre: string, idCategoria: number) {
        
        const validacionIdProducto = this.validarIdProducto();
        const validacionNombre = this.validarNombreProducto();
        const validacionIdCategoria = this.validarIdCategoria();
    
        if (validacionIdProducto && !validacionNombre && validacionIdCategoria) {
        Notiflix.Confirm.show(
            'Confirmar',
            '¿Estás seguro de que deseas agregar este Producto?',
            'Sí',
            'No',
            () => {
                this.updateProductoFromBackend(id, nombre, idCategoria);
            }
        );
        }

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
        if (id !== 0 || id) {
            // Muestra un mensaje de confirmación utilizando Notiflix
            Notiflix.Confirm.show(      
              'Confirmar Eliminación',
              '¿Estás seguro de que deseas eliminar este Producto?',
              'Sí',
              'No',
              () => {
                this.deleteProductoFromBackend(id);
              }       
            );
        } else {
            // El campo Id no puede ser cero, muestra una notificación de error
            Notiflix.Notify.failure("El campo Id de Carrito es obligatorio y distinto de cero");
        }
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