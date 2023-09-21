import { Component } from '@angular/core';
import { CategoriaProducto } from '../entidades/categoria-producto';
import { CategoriaProductoService } from '../servicios-backend/categoria-producto/categoria-producto.service';
import { HttpResponse } from '@angular/common/http';
import * as Notiflix from 'notiflix'; // Importar Notiflix
import { ConfiguracionService } from '../servicios-backend/configuracion/configuracion.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  fuenteSeleccionada: string = 'Arial, sans-serif'; // Fuente predeterminada
  public id = 0;
  public nombre = ""

  public listaCategoria: CategoriaProducto[] = []
  public categoriaProducto: CategoriaProducto | null = null;

  constructor(private configuracionServie: ConfiguracionService,private categoriaProductoService: CategoriaProductoService) {
    this.getCategoriaFromBackend();
    this.callMethod();
  }
    // Método para llamar a un método de tab2
    callMethod() {
      const savedFontFamily = localStorage.getItem('fuente');
      if (savedFontFamily) {
        this.fuenteSeleccionada = savedFontFamily;
      }
    }

  // Este método obtiene todas las categorías de producto de la API.
  private getCategoriaFromBackend(){
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


  // public  getById(id: number){
  //   this.getByIDFromBackend(id);
  // }

  public  getById(){
    this.getByIDFromBackend(this.id);
  }

  // Este método obtiene una categoría de producto por su ID de la API.
  private getByIDFromBackend(id: number) {
    this.categoriaProductoService.GetById(id).subscribe({
      next: (response: HttpResponse<any>) => {
        if(response.status == 200){
          // Asignar la categoriaProducto obtenido a la propiedad categoriaProducto
          this.categoriaProducto = response.body;
          console.log(this.categoriaProducto);
        }else{
          Notiflix.Notify.failure("Fallo al Obtener PRODUCTO :(");
        }
      },
      error: (error: any) => {
        console.log(error);
        Notiflix.Notify.failure("Error al obtener Categoría de Producto");
      },
      complete: () => {
        //console.log('complete - this.getByIDFromBackend()');
      },
    });
  }


  public addCategoria(){
    this.AddCategoriaFromBackend(this.nombre)
  }
  
  // Este método agrega una nueva categoría de producto a la API.
  private AddCategoriaFromBackend(nombre: string){
    var categoriaEntidad = new CategoriaProducto();
    categoriaEntidad.nombre = nombre;

    this.categoriaProductoService.Add(categoriaEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
          console.log(response.body)//1
          if(response.body == 1){
            Notiflix.Notify.success("Se agrego el CATEGORIA con exito :)");
              this.getCategoriaFromBackend();//Se actualize el listado
              this.nombre = "";
          }else{
            Notiflix.Notify.failure("Fallo al agregar al CATEGORIA  :(");
          }
      },
      error: (error: any) => {
          console.log(error);
          Notiflix.Notify.failure("Error al agregar Catergoria Pruducto")
      },
      complete: () => {
          //console.log('complete - this.addCategoria()');
      },
  });
  }

  // metodo para actualizar una categoria
  //  public updatecategoriaproducto(id: number,nombre :string){
  //    this.updatecategoriaproductofrombackend(id, nombre)
  //  }

  // metodo para actualizar una categoria
    public updateCategoriaProducto(){
      this.updateCategoriaProductoFromBackend(this.id, this.nombre)
    }
  
   // este método actualiza una categoría de producto en la api.
   private updateCategoriaProductoFromBackend(id: number, nombre: string){
     var categoriaproductoentidad = new CategoriaProducto();
     categoriaproductoentidad.id = id;
     categoriaproductoentidad.nombre = nombre;

     this.categoriaProductoService.Update(categoriaproductoentidad).subscribe({
       next: (response:  HttpResponse<any>) => {
           console.log(response.body)//1
           if(response.body == 1){
            Notiflix.Notify.success("Se actualizó el categoria producto con exito :)");
               this.getCategoriaFromBackend();//se actualize el listado
               this.nombre = "";

           }else{
            Notiflix.Notify.failure("Fallo al agregar al CATEGORIA PRODUCTO :(");
           }
       },
       error: (error: any) => {
           console.log(error);
           Notiflix.Notify.failure("Error al actualizar Categoria Producto")
       },
       complete: () => {
           //console.log('complete - this.addusuario()');
       },
     });
   }

  // Metodo public Eliminar Producto por ID
  public deleteCategoriaProducto() {
    this.deleteCategoriaProductoFromBackend(this.id);
  }

  // Este método elimina una categoría de producto de la API.
  private deleteCategoriaProductoFromBackend(id: number) {
    this.categoriaProductoService.Delete(id).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.body == 1) {
          Notiflix.Notify.success("Se eliminó el Categoria Producto con éxito :)");
          this.getCategoriaFromBackend(); // Se actualiza el listado
        } else {
          Notiflix.Notify.failure("Fallo al eliminar el Categoria Producto:(");
        }
      },
      error: (error: any) => {
        console.log(error);
        Notiflix.Notify.failure("Error al eliminar Categoria Producto");
      },
      complete: () => {
        //console.log('complete - this.deleteProducto()');
      },
    });
  }
  

 

   

}
