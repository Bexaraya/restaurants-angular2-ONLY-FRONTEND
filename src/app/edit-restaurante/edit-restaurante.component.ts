import { Component, OnInit } from '@angular/core';
import { Restaurante } from "app/restaurante";
import { RestaurantesService } from "app/restaurantes.service";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-edit-restaurante',
  templateUrl: './edit-restaurante.component.html',
  styleUrls: ['./edit-restaurante.component.css']
})
export class EditRestauranteComponent implements OnInit {

    public titulo = "Editar restaurante " + this._route.params["id"];
    public restaurante: Restaurante;
    public error;
    public loadingImagen: boolean = false;
    public imagenesParaSubir: Array<File>;
    public rutaImagen: string;

    constructor(
        private _restaurantesService: RestaurantesService,
        private _router: Router,
        private _route: ActivatedRoute) { }

    subirImagen(fileInput: any) {
        this.loadingImagen = true;
        this.imagenesParaSubir = <Array<File>>fileInput.target.files;
        this._restaurantesService.subirImagen(this.imagenesParaSubir[0]).then(
            result => {
                this.loadingImagen = false;
                this.restaurante.imagen = result.toString();
                this.rutaImagen = result.toString();
                console.log(result);
            },
            error => {
                this.error = <any>error;
                alert("Error al subir la imagen " + error.status);
                this.error = <any>error;
                console.error("ERROR: " + error.status);
                console.info("INFORMACION DEL ERROR");
                console.info(error._body);
            }
        );
    }

    onSubmit() {
        console.log(this.restaurante);
        this._restaurantesService.updateRestaurante(this.restaurante).subscribe(
            res => {
                this.restaurante = res;
                this._router.navigate(['Restaurante', { id: res.id }]);
            },
            error => {
                this.error = <any>error;
                this._router.navigate(['Home']);
                console.error("ERROR: " + error.status);
                console.info("INFORMACION DEL ERROR");
                console.info(error._body);
            }
        );
    }

    ngOnInit() {
      this.getRestauranteById();

    }

    getRestauranteById() {
        this.restaurante = new Restaurante(this._route.params["id"], null, null, null, null, null);
        this._route.params
        .switchMap((params: Params) => this._restaurantesService.getRestauranteById(+params['id']))
        .subscribe(res => {
                this.restaurante = res;
                if (this.restaurante == undefined) {
                    this._router.navigate(['Error']);
                }
                
                if (this.restaurante.imagen != null) {
                    this.rutaImagen = this.restaurante.imagen;
                } else {
                    this.rutaImagen = "/assets/images/imagen-default.jpg";
                }
            },
            error => {
                this.error = <any>error;
                this._router.navigate(['Error']);
                console.error("ERROR: " + error.status);
                console.info("INFORMACION DEL ERROR");
                console.info(error._body);
            });
    }
}
