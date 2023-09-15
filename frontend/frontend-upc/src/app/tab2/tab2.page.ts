import { Component } from '@angular/core';
import { CategoriaProducto } from '../entidades/categoria-producto';
import { CategoriaProductoService } from '../servicios-backend/categoria-producto/categoria-producto.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public id = 0;
  public nombre = ""

  public listaCategoria: CategoriaProducto[] = []
  public categoriaProducto: CategoriaProducto | null = null;

  constructor(private categoriaProductoService: CategoriaProductoService) {
    this.getCategoriaFromBackend();
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
        // Asignar la categoriaProducto obtenido a la propiedad categoriaProducto
        this.categoriaProducto = response.body;
        console.log(this.categoriaProducto)
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


  public addCategoria(){
    this.AddUsuarioFromBackend(this.nombre)
  }
  
  // Este método agrega una nueva categoría de producto a la API.
  private AddUsuarioFromBackend(nombre: string){
    var categoriaEntidad = new CategoriaProducto();
    categoriaEntidad.nombre = nombre;

    this.categoriaProductoService.Add(categoriaEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
          console.log(response.body)//1
          if(response.body == 1){
              alert("Se agrego el CATEGORIA con exito :)");
              this.getCategoriaFromBackend();//Se actualize el listado
              this.nombre = "";
          }else{
              alert("Al agregar al CATEGORIA fallo :(");
          }
      },
      error: (error: any) => {
          console.log(error);
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
               alert("se actualizó el categoria producto con exito :)");
               this.getCategoriaFromBackend();//se actualize el listado
               this.nombre = "";

           }else{
               alert("fallo al agregar al categoria producto :(");
           }
       },
       error: (error: any) => {
           console.log(error);
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
          alert("Se eliminó el Producto con éxito :)");
          this.getCategoriaFromBackend(); // Se actualiza el listado
        } else {
          alert("Al eliminar el Producto falló :(");
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
