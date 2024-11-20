import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PickuplocationlistComponent } from '../pickuplocationlist/pickuplocationlist.component';
import { AddpickuplocationComponent } from '../addpickuplocation/addpickuplocation.component';

const routes: Routes = [
  {path:'pickuplocationlist', component:PickuplocationlistComponent},
  {path:'addpickuplocation', component:AddpickuplocationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PickuplocationRoutingModule { }
