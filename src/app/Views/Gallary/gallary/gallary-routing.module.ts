import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GallarylistComponent } from '../gallarylist/gallarylist.component';
import { GallaryimageComponent } from '../gallaryimage/gallaryimage.component';

const routes: Routes = [
  {path:'gallarylist',component:GallarylistComponent},
  {path:'addgallaryimage',component:GallaryimageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GallaryRoutingModule { }
