import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderlistComponent } from '../orderlist/orderlist.component';
import { OrderviewComponent } from '../orderview/orderview.component';

const routes: Routes = [
  {path:'orderlist',component: OrderlistComponent},
  {path:'orderview', component:OrderviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
