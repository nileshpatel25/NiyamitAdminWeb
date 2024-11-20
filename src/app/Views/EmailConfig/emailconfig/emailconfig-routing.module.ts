import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailconfiglistComponent } from '../emailconfiglist/emailconfiglist.component';
import { AddemailconfigComponent } from '../addemailconfig/addemailconfig.component';

const routes: Routes = [
  {path:'emailconfiglist', component:EmailconfiglistComponent},
  {path:'addemailconfig', component:AddemailconfigComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailconfigRoutingModule { }
