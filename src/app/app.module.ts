import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestaurantesService } from "app/restaurantes.service";
import { AddRestauranteComponent } from './add-restaurante/add-restaurante.component';
import { RestauranteDetailComponent } from './restaurante-detail/restaurante-detail.component';
import { EditRestauranteComponent } from './edit-restaurante/edit-restaurante.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddRestauranteComponent,
    RestauranteDetailComponent,
    EditRestauranteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [RestaurantesService],
  bootstrap: [DashboardComponent]
})
export class AppModule { }
