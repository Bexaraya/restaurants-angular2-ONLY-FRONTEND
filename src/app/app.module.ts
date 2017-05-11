import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestaurantesService } from "app/restaurantes.service";
import { AddRestauranteComponent } from './add-restaurante/add-restaurante.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddRestauranteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [RestaurantesService],
  bootstrap: [DashboardComponent]
})
export class AppModule { }
