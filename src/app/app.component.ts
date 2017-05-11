import { Component } from '@angular/core';
import { Restaurante } from "app/restaurante";
import { RestaurantesService } from "app/restaurantes.service"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public titulo: string = "Listado de restaurantes";
    public restaurantes: Restaurante[];
    public error: string;
    public mensajeDeError: string
    public loading: boolean = true;
    public confirmado;

    constructor(private _servicioRestaurantes: RestaurantesService) { }



    ngOnInit() {
        this.getRestaurantes();
    }

    onBorrarRestaurante(id: number) {
        this.confirmado = id;
    }

    confirmedBorrarRestaurante() {
        this.loading = true;
        this._servicioRestaurantes.removeRestaurante(this.confirmado).subscribe(
            res => {
                this.getRestaurantes();
            }, error => {
                alert("Ocurrio un error al borrar el restaurante");
            }
        );
        this.confirmado = null;
    }

    getRestaurantes() {
        this._servicioRestaurantes.getRestaurantes()
            .subscribe(
            res => {
                this.restaurantes = res;
                if (res == undefined) {

                }
                this.loading = false;
            },
            error => {
                this.error = <any>error;
                if (error.status == 200) {
                    error.status = 401;
                }
                console.error("ERROR: " + error.status);
                console.info("INFORMACION DEL ERROR");
                console.info(error._body);
            }
            );
    }
}
