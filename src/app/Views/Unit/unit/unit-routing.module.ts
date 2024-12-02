import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitlistComponent } from '../unitlist/unitlist.component';

const routes: Routes = [
  {path:'unitlist', component:UnitlistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitRoutingModule { }
