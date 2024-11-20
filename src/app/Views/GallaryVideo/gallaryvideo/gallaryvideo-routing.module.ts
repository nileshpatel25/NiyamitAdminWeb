import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GallaryvideolistComponent } from '../gallaryvideolist/gallaryvideolist.component';

const routes: Routes = [
  {path:'gallaryvideolist', component:GallaryvideolistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GallaryvideoRoutingModule { }
