import {Component, OnInit} from "@angular/core";
import {RestaurantesService} from "../restaurantes.service";
import { Restaurante } from "../restaurante";
import { Router } from "@angular/router";


@Component({
    selector: "add-restaurante",
    templateUrl: "./add-restaurante.component.html",
    providers: [RestaurantesService]
})
export class AddRestauranteComponent implements OnInit {
    public titulo = "Crear un nuevo restaurante";
    public restaurante:Restaurante;
    public error;
    public rutaImagen:string ="/assets/images/imagen-default.jpg";
    public loadingImagen:boolean=false;
    public imagenesParaSubir: Array<File>;

constructor(private _restaurantesService: RestaurantesService,
            private _router: Router){}
    
   subirImagen(fileInput:any){
       this.loadingImagen=true;
       this.imagenesParaSubir = <Array<File>>fileInput.target.files;
       this._restaurantesService.subirImagen(this.imagenesParaSubir[0]).then(
           result =>{
               this.restaurante.imagen = this.imagenesParaSubir[0].name;
               this.rutaImagen = "http://localhost:3000/api/restaurantes/download_file/" + result.toString();
               this.loadingImagen=false;
           },
           error =>{
               this.error = <any>error;
               alert("Error al subir la imagen " + error.status);
               this.error = <any>error;
               console.error("ERROR: " + error.status);
               console.info("INFORMACION DEL ERROR");
               console.info(error._body);
           }
       );
   }

    onSubmit(){
        this._restaurantesService.addRestaurante(this.restaurante)
        .subscribe(
            res => {
                this.restaurante=res;
                this._router.navigate(['Home']);
            },
            error => {
                alert("Error al añadir restaurante " + error.status);
                this.error = <any>error;
                console.error("ERROR: " + error.status);
                console.info("INFORMACION DEL ERROR");
                console.info(error._body);
            }
        );
    }

    ngOnInit() {
        this.restaurante=new Restaurante(null,null,null,null,null,null);
    }
}