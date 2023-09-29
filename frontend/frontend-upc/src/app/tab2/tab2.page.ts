import { Component } from '@angular/core';
import { CategoriaProducto } from '../entidades/categoria-producto';
import { CategoriaProductoService } from '../servicios-backend/categoria-producto/categoria-producto.service';
import { HttpResponse } from '@angular/common/http';
import * as Notiflix from 'notiflix'; // Importar Notiflix
import { ConfiguracionService } from '../servicios-backend/configuracion/configuracion.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  fuenteSeleccionada: string = 'Arial, sans-serif'; // Fuente predeterminada
 
  // Propiedades para CategoriaProducto
  public id = 0;
  public nombre = ""
  public listaCategoria: CategoriaProducto[] = []
  public categoriaProducto: CategoriaProducto | null = null;

// Constructor
  constructor(
    private configuracionServie: ConfiguracionService,
    private categoriaProductoService: CategoriaProductoService, 
    private storage: Storage
  ) {
    this.getCategoriaFromBackend();
    this.obtenerFuente();
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

  //Metodo para obtener una Categoria de producto por ID
  public  getById(){
    if (this.id !== 0 || this.id) {
      this.getByIDFromBackend(this.id);

    } else {
      // El campo Id no puede ser cero, muestra una notificación de error
      Notiflix.Notify.failure("El campo Id Categoria es obligatorio");
    }      
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
          Notiflix.Notify.failure("Fallo al obtener Categorio de Producto :(");
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

 /* // Metodo para agregar una categoria de producto
  public addCategoria(){
    if (this.nombre == '' || this.nombre.length<=4) {
      // El campo nombre debe tener almenos 5 caracteres, muestra una notificación de error
      Notiflix.Notify.failure("El campo nombre debe terner al menos 4 caracteres");

    } else if ( this.existeNombreCategoria(this.nombre)) {
      // El nombre de categoria ya existe, muestra una notificación de error
      Notiflix.Notify.failure("El nombre de categoria ingresado ya existe");

    }else{
      // Muestra un mensaje de confirmación utilizando Notiflix
      Notiflix.Confirm.show(      
        'Confirmar',
        '¿Estás seguro de que deseas agregar esta Categoria?',
        'Sí',
        'No',
        () => {
          this.AddCategoriaFromBackend(this.nombre);
        }       
      );
    }
  }
  */
 
  // Método para agregar una categoria de producto
  public addCategoria() {
    const nombreValido = this.validarNombreCategoria();

    if (nombreValido) {
      Notiflix.Confirm.show(
        'Confirmar',
        '¿Estás seguro de que deseas agregar esta Categoria?',
        'Sí',
        'No',
        () => {
          this.AddCategoriaFromBackend(this.nombre);
        }
      );
    }
  }

  // Método para validar el nombre de categoría
  private validarNombreCategoria(): boolean {
    if (this.nombre.length < 5) {
      Notiflix.Notify.failure("El campo nombre debe tener al menos 5 caracteres");
      return false;
    }
    if (this.existeNombreCategoria(this.nombre)) {
      Notiflix.Notify.failure("El nombre de categoría ingresado ya existe");
      return false;
    }

    return true;
  }

  // Este método agrega una nueva categoría de producto a la API.
  private async AddCategoriaFromBackend(nombre: string){
    var categoriaEntidad = new CategoriaProducto();
    categoriaEntidad.nombre = nombre;
    //categoriaEntidad.usuarioRegistro = (await this.storage.get('idUserStorage')).toString();

    this.categoriaProductoService.Add(categoriaEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
          console.log(response.body)//1
          if(response.body == 1){
            Notiflix.Notify.success("Se agrego el CATEGORIA con exito :)");
              this.getCategoriaFromBackend();//Se actualize el listado
              this.id = 0;
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

  // Método para verificar si id de categoria existe
  public verificarIdCategoria(idCategoria: number): boolean {
    return this.listaCategoria.some((categoriaProducto) => categoriaProducto.id === idCategoria);
  }

  // Método para validar el ID de la categoría
  private validarIdCategoria(): boolean {
    if (!this.verificarIdCategoria(this.id)) {
      Notiflix.Notify.failure("El ID de categoría ingresado no existe");
      return false;
    }
      return true;
  }


  // Método para verificar si un nombre de categoría ya existe en la lista
  public existeNombreCategoria(nombreCategoria: string): boolean {
    return this.listaCategoria.some((categoria) => categoria.nombre === nombreCategoria);
  }

  // Método para validar el nombre de Categoria
  private validarNombreProducto(): boolean {
    if (this.nombre.length < 4) {
        Notiflix.Notify.failure("El campo nombre debe tener al menos 4 caracteres");
        return false;
    }
    
    if (this.existeNombreCategoria(this.nombre)) {
      Notiflix.Notify.failure("El nombre de categoria ingresado ya existe");
      return false;
    }            
      return true;
    }



  // Metodo para actualizar una categoria
  public updateCategoriaProducto(){   
    const validacionIdCategoria = this.validarIdCategoria();  
    const validacionNombreCategoria = this.validarNombreProducto();
    console.log(validacionIdCategoria) ;
    if (validacionIdCategoria && !validacionNombreCategoria ) {
      Notiflix.Confirm.show(
        'Confirmar',
        '¿Estás seguro de que deseas actualizar este Categoria de Producto?',
        'Sí',
        'No',
        () => {
          this.updateCategoriaProductoFromBackend(this.id, this.nombre);
        }
      );
    }   
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
               this.getCategoriaFromBackend(); //se actualize el listado
               this.nombre = "";

           }else{
            Notiflix.Notify.failure("Fallo al actualizar categoria producto :(");
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
    if (this.id !== 0 || this.id) {
      // Muestra un mensaje de confirmación utilizando Notiflix
      Notiflix.Confirm.show(      
        'Confirmar Eliminación',
        '¿Estás seguro de que deseas eliminar este Producto?',
        'Sí',
        'No',
        () => {
          this.deleteCategoriaProductoFromBackend(this.id);
        }       
      );
    } else {
        // El campo Id no puede ser cero, muestra una notificación de error
        Notiflix.Notify.failure("El campo Id de Categoria es obligatorio y distinto de cero");
    }
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
