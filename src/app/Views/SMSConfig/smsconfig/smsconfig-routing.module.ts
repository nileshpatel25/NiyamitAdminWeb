import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmsconfiglistComponent } from '../smsconfiglist/smsconfiglist.component';
import { AddsmsconfigComponent } from '../addsmsconfig/addsmsconfig.component';

const routes: Routes = [
  {path:'smsconfiglist',component:SmsconfiglistComponent},
  {path:'addsmsconfig', component:AddsmsconfigComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsconfigRoutingModule { }
