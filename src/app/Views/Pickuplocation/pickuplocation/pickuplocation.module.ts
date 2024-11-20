import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PickuplocationRoutingModule } from './pickuplocation-routing.module';
import { PickuplocationlistComponent } from '../pickuplocationlist/pickuplocationlist.component';
import { PickuplocationsearchfilterPipe } from 'src/app/Services/Pipe/pickuplocationsearchfilter.pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { AddpickuplocationComponent } from '../addpickuplocation/addpickuplocation.component';

@NgModule({
  declarations: [
    PickuplocationlistComponent,
    AddpickuplocationComponent,
    PickuplocationsearchfilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    PickuplocationRoutingModule
  ]
})
export class PickuplocationModule { }
