import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactuslistComponent } from '../contactuslist/contactuslist.component';

const routes: Routes = [
  {path:'contactlist', component:ContactuslistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactusRoutingModule { }
