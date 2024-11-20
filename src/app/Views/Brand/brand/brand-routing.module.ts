import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandlistComponent } from '../brandlist/brandlist.component';

const routes: Routes = [
  {path:'brandlist', component:BrandlistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
