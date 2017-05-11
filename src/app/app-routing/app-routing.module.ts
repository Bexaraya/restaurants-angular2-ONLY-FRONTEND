import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }   from '../app.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AddRestauranteComponent } from "app/add-restaurante/add-restaurante.component";

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home',  component: AppComponent },
  { path: 'CrearRestaurante',  component: AddRestauranteComponent },
  { path: '**', redirectTo: '/Home' },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
