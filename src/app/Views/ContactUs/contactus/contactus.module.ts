import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactusRoutingModule } from './contactus-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ContactussearchfilterPipe } from 'src/app/Services/Pipe/contactussearchfilter.pipe';
import { ContactuslistComponent } from '../contactuslist/contactuslist.component';


@NgModule({
  declarations: [
    ContactuslistComponent,
    ContactussearchfilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ContactusRoutingModule
  ]
})
export class ContactusModule { }
