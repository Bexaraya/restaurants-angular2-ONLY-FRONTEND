import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Service} from "./service";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from "rxjs/Observable";
import {Restaurante} from "./restaurante";

@Injectable()
export class RestaurantesService extends Service{
    private baseURL: string = "http://localhost:3000/api";

    public constructor(private _http: Http) { 
        super();
    }
    
    /*
    * Modelo de datos:
    *      [
    *       {
                "id":1,
                "nombre":"Burger King",
                "direccion":"Calle tal y cual",
                "descripcion":"tal y cual",
                "precio":"100000"}
            }
           ]
    */
    public getRestaurantes(): Observable<Restaurante[]> {
        let options = this.configurarCabeceras();
        return this._http.get(this.baseURL + "/restaurantes", options).map(this.obtenerDatos)
            .catch(this.tratarErrores);
    }

  /*
     Modelo de datos:
           {
                "id":1,
                "nombre":"Burger King",
                "direccion":"Calle tal y cual",
                "descripcion":"tal y cual",
                "precio":"100000"}
            }
    */
    public getRestauranteById(id: number){
        let options = this.configurarCabeceras();
        return this._http.get(this.baseURL + "/restaurantes/" + id, options).map(this.obtenerDatos)
        .catch(this.tratarErrores);
    }

    public getRestauranteRandom() {
        let options = this.configurarCabeceras();
        return this._http.get(this.baseURL + "/restaurantes/random/comer_hoy", options).map(this.obtenerDatos)
        .catch(this.tratarErrores);
    }

    public addRestaurante(restaurante:Restaurante){
        let json = JSON.stringify(restaurante);
        let options = this.configurarCabeceras();
        return this._http.post(
            this.baseURL + "/restaurantes/",
             json,
             options).map(this.obtenerDatos).catch(this.tratarErrores);
    }

    public updateRestaurante(restaurante:Restaurante){
         let json = JSON.stringify(restaurante);
        let options = this.configurarCabeceras();
        return this._http.put(
            this.baseURL + "/restaurantes/" + restaurante.id,
             json,
             options).map(this.obtenerDatos).catch(this.tratarErrores);
    }

    public removeRestaurante(id:number){
        return this._http.delete(this.baseURL + '/restaurantes/' + id)
        .catch(this.tratarErrores);
    }

    public subirImagen(file:File){
        return new Promise((resolve, reject) => {
            let formData: any = new FormData();
            let xhr = new XMLHttpRequest();
            formData.append("file", file, file.name);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", this.baseURL + "/restaurantes/upload_file", true);
            xhr.send(formData);
        });
    }

     private obtenerDatos(r: Response) { return r.json() } 

}
