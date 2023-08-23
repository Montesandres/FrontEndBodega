import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodegasComponent } from './bodegas/bodegas.component';
import { PermisosUsuarioComponent } from './permisos-usuario/permisos-usuario.component';

const routes: Routes = [
{
  path: 'bodegas',
  component:BodegasComponent
},
{
  path:'',
  component:PermisosUsuarioComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
