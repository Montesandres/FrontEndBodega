import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodegasComponent } from './bodegas/bodegas.component';

const routes: Routes = [
{
  path: 'bodegas',
  component:BodegasComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
