import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WholesellerRoutingModule } from './wholeseller-routing.module';
import { WholesellerlistComponent } from '../wholesellerlist/wholesellerlist.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { WholesellersearchfilterPipe } from 'src/app/Services/Pipe/wholesellersearchfilter.pipe';


@NgModule({
  declarations: [
    WholesellerlistComponent,
    WholesellersearchfilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    WholesellerRoutingModule
  ]
})
export class WholesellerModule { }
