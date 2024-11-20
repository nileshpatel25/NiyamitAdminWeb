import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfluencerlistComponent } from '../influencerlist/influencerlist.component';

const routes: Routes = [
  {path:'influencerlist', component:InfluencerlistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfluencerRoutingModule { }
