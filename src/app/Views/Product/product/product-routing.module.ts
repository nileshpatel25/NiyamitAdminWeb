import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductlistComponent } from '../productlist/productlist.component';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { ProductimageComponent } from '../productimage/productimage.component';

const routes: Routes = [
  {path:'productlist',component:ProductlistComponent},
  {path:'addnewproduct',component:AddproductComponent},
  {path:'addproductimage', component:ProductimageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
