import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/component/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './components/signin/component/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/component/admin/admin.component';
import { HomeComponent } from './components/home/component/home/home.component';
import { UserComponent } from './components/users/component/user/user.component';
import { PromocionesComponent } from './components/promociones/components/promociones/promociones.component';
import { ProductosComponent } from './components/productos/components/productos/productos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    AdminComponent,
    HomeComponent,
    UserComponent,
    PromocionesComponent,
    ProductosComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],

})
export class AppModule { }