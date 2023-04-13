import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/component/login/login.component';
import { SigninComponent } from './components/signin/component/signin/signin.component';
import { AdminComponent } from './components/admin/component/admin/admin.component';
import { HomeComponent } from './components/home/component/home/home.component';
import { UserComponent } from './components/users/component/user/user.component';
import { PromocionesComponent } from './components/promociones/components/promociones/promociones.component';
import { ProductosComponent } from './components/productos/components/productos/productos.component';
import { RegistroComponent } from './components/registro/components/registro/registro.component';
import { EventosUserComponent } from './components/eventos-user/components/eventos-user/eventos-user.component';
import { EventosvipUserComponent } from './components/eventosvip-user/components/eventosvip-user/eventosvip-user.component';

const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'eventos', component:SigninComponent },
  { path: 'sign-in', component:RegistroComponent },
  { path: 'home', component:HomeComponent },
  { path: 'admin', component:AdminComponent },
  { path: 'user', component:UserComponent },
  { path: 'promociones', component:PromocionesComponent },
  { path: 'productos', component:ProductosComponent },
  { path: 'eventos-user', component:EventosUserComponent },
  { path: 'eventosvip-user', component:EventosvipUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing: false, useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
