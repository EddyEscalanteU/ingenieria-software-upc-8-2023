import { Component } from '@angular/core';
import { Producto } from '../entidades/producto';
import { ProductoService } from '../servicios-backend/producto/producto.service';
import { HttpClient, HttpResponse } from '@angular/common/http'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    public id = 0;
    public nombre = ""
    public idCategoria = 0;

    public listaProducto: Producto[] = []
    public producto: Producto | null = null;

    constructor(private productoService: ProductoService) {

    this.getProductoFromBackend();
    }

    private getProductoFromBackend(){
    this.productoService.GetAll().subscribe({
        next: (response: HttpResponse<any>) => {
            this.listaProducto = response.body;
            console.log(this.listaProducto)
        },
        error: (error: any) => {
            console.log(error);
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


    public  getById(){
        this.getByIDFromBackend(this.id);
    }

    // Metodo para obtener Producto desde la API
    private getByIDFromBackend(id: number) {
        this.productoService.GetById(id).subscribe({
            next: (response: HttpResponse<any>) => {
                // Asignar el Producto obtenido a la propiedadProducto
                this.producto = response.body;
                console.log(this.producto)
                // console.log(response.body);
            },
            error: (error: any) => {
                console.log(error);
            },
            complete: () => {
                //console.log('complete - this.getByIDFromBackend()');
            },
        });
    }

    public addProducto(){
    this.AddProductoFromBackend(this.nombre, this.idCategoria)
    }
   // Este método agrega un nuevo producto a la API.
    private AddProductoFromBackend(nombre: string, idCategoria:number){
        var productoEntidad = new Producto();
        productoEntidad.nombre = nombre;
        productoEntidad.idCategoria = idCategoria;
        this.productoService.Add(productoEntidad).subscribe({
            next: (response: HttpResponse<any>) => {
                console.log(response.body)//1
                if(response.body == 1){
                    alert("Se agrego el PRODUCTO con exito :)");
                    this.getProductoFromBackend();//Se actualize el listado
                    this.nombre = "";
                    this.idCategoria=0;
                }else{
                    alert("Al agregar al PRODUCTO fallo :(");
                }
            },
            error: (error: any) => {
                console.log(error);
            },
            complete: () => {
                //console.log('complete - this.PRODUCTO()');
            },
        });
    }
  // metodo para actualizar un Producto
    public updateProducto(id: number, nombre: string, idCategoria: number){
        this.updateProductoFromBackend(id, nombre, idCategoria)
    } 
// este método actualiza una categoría de producto en la API.   
    private updateProductoFromBackend(id: number, nombre: string, idCategoria: number){
        var productoEntidad = new Producto();
        productoEntidad.id = id;
        productoEntidad.nombre = nombre;
        productoEntidad.idCategoria = idCategoria;

        this.productoService.Update(productoEntidad).subscribe({
        next: (response: HttpResponse<any>) => {
            console.log(response.body)//1
            if(response.body == 1){
                alert("Se Actualizó el PRODUCTO con exito :)");
                this.getProductoFromBackend();//Se actualize el listado
                this.nombre = "";
                this.idCategoria = 0;
            }else{
                alert("Al agregar al PRODUCTO fallo :(");
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

  // Metodo public Eliminar Producto por ID
    public deleteProducto(id: number) {
        this.deleteProductoFromBackend(id);
    }
   // Este método elimina un  producto de la API.
    private deleteProductoFromBackend(id: number) {
        this.productoService.Delete(id).subscribe({
            next: (response: HttpResponse<any>) => {
                if (response.body == 1) {
                alert("Se eliminó el PRODUCTO con éxito :)");
                this.getProductoFromBackend(); // Se actualiza el listado
                
                } else {
                alert("Al eliminar el PRODUCTO falló :(");
                }
            },
            error: (error: any) => {
                console.log(error);
            },
            complete: () => {
                //console.log('complete - this.deleteProducto()');
            },
        });
    }
}