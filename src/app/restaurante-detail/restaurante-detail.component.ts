import { Component, OnInit } from '@angular/core';
import { RestaurantesService } from "app/restaurantes.service";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-restaurante-detail',
  templateUrl: './restaurante-detail.component.html',
  styleUrls: ['./restaurante-detail.component.css'],
  providers: [RestaurantesService]
})
export class RestauranteDetailComponent implements OnInit {

    public parametro;
    public error;
    public restaurante;
    public loading = true;

    constructor(
        private _restaurantesService: RestaurantesService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location
    ) { }


    ngOnInit() {
        this.getRestauranteById();
    }

    getRestauranteById() {
        if (this._route.params["id"])
        {
            this._route.params
            .switchMap((params: Params) => this._restaurantesService.getRestauranteById(+params['id']))
            .subscribe(res => {
                    this.restaurante = res;
                    if (this.restaurante == undefined) {
                        this._router.navigate(['Error']);
                    }
                    this.loading=false;
                },
                error => {
                    this.error = <any>error;
                    this._router.navigate(['Error']);
                    console.error("ERROR: " + error.status);
                    console.info("INFORMACION DEL ERROR");
                    console.info(error._body);
                });
        }
        else {
            this._route.params
            .switchMap((params: Params) => this._restaurantesService.getRestauranteRandom())
            .subscribe(res => {
                    this.restaurante = res;
                    if (this.restaurante == undefined) {
                        this._router.navigate(['Error']);
                    }
                    this.loading=false;
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

}
