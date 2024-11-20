import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WholesellerlistComponent } from '../wholesellerlist/wholesellerlist.component';

const routes: Routes = [
  {path:'wholesellerlist', component: WholesellerlistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WholesellerRoutingModule { }
